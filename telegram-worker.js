export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/submit') {
      return json({ ok: false, error: 'not_found' }, 404, env);
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405, env);
    }

    try {
      const payload = await request.json();
      validatePayload(payload);

      const formatted = formatTelegramMessage(payload);
      const threadId = optionalNumber(env.TELEGRAM_MESSAGE_THREAD_ID);

      const sentMessage = await telegramApi(env, 'sendMessage', {
        chat_id: env.TELEGRAM_CHAT_ID,
        text: formatted,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        ...(threadId ? { message_thread_id: threadId } : {})
      });

      const replyToMessageId = sentMessage?.result?.message_id;
      const uploaded = await sendAllImages(payload, env, replyToMessageId, threadId);

      return json({
        ok: true,
        message: uploaded
          ? 'The request has been sent to the moderator along with the images.'
          : 'The request has been sent to the moderator.'
      }, 200, env);
    } catch (error) {
      return json(
        {
          ok: false,
          error: 'submit_failed',
          message: error?.message || 'Unknown error'
        },
        500,
        env
      );
    }
  }
};

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Payload is empty.');
  if (!String(payload.title || '').trim()) throw new Error('Title is required.');
  if (!String(payload.author?.name || '').trim()) throw new Error('Author name is required.');
  if (!String(payload.description || '').trim()) throw new Error('Description is required.');
  if (!Array.isArray(payload.skills) || payload.skills.length < 1) throw new Error('At least one skill is required.');
  if (!payload.talentTree || !Array.isArray(payload.talentTree.unlocked) || payload.talentTree.unlocked.length < 1) {
    throw new Error('Talent tree is required.');
  }
}

function formatTelegramMessage(payload) {
  const skills = payload.skills.map((s, i) => `${i + 1}. ${s?.name || s?.id || '—'}`).join('\n');
  const treeCount = payload.talentTree?.unlocked?.length || 0;
  const weaponCount = Array.isArray(payload.gearImages?.weapon) ? payload.gearImages.weapon.length : 0;
  const armorCount = Array.isArray(payload.gearImages?.armor) ? payload.gearImages.armor.length : 0;

  return [
    '<b>Новая заявка Build &amp; Guide</b>',
    '',
    `<b>Название:</b> ${escapeHtml(payload.title || '—')}`,
    `<b>Тип:</b> ${escapeHtml(payload.type || '—')}`,
    `<b>Автор:</b> ${escapeHtml(payload.author?.name || '—')}`,
    `<b>Контакт:</b> ${escapeHtml(payload.author?.contact || '—')}`,
    `<b>Нод в дереве:</b> ${treeCount}`,
    `<b>Картинок оружия:</b> ${weaponCount}`,
    `<b>Картинок брони:</b> ${armorCount}`,
    '',
    '<b>Скиллы:</b>',
    escapeHtml(skills || '—'),
    '',
    '<b>Описание:</b>',
    escapeHtml(payload.description || '—'),
    '',
    '<b>Guide text:</b>',
    escapeHtml(payload.guideText || '—')
  ].join('\n');
}

async function sendAllImages(payload, env, replyToMessageId, threadId) {
  const collections = [
    ['weapon', Array.isArray(payload.gearImages?.weapon) ? payload.gearImages.weapon : []],
    ['armor', Array.isArray(payload.gearImages?.armor) ? payload.gearImages.armor : []]
  ];

  let sentAny = false;
  for (const [kind, items] of collections) {
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      if (!item?.dataUrl) continue;
      await sendSingleDocument(kind, item, index, env, replyToMessageId, threadId);
      sentAny = true;
    }
  }
  return sentAny;
}

async function sendSingleDocument(kind, item, index, env, replyToMessageId, threadId) {
  const { mime, bytes } = parseDataUrl(item.dataUrl);
  const filename = sanitizeFilename(item.name || `${kind}-${index + 1}.${mimeToExt(mime)}`);
  const blob = new Blob([bytes], { type: mime || item.type || 'application/octet-stream' });

  const form = new FormData();
  form.set('chat_id', env.TELEGRAM_CHAT_ID);
  form.set('caption', `${kind === 'weapon' ? 'Оружие' : 'Броня'} #${index + 1}`);
  if (replyToMessageId) {
    form.set('reply_parameters', JSON.stringify({ message_id: replyToMessageId }));
  }
  if (threadId) {
    form.set('message_thread_id', String(threadId));
  }
  form.set('document', blob, filename);

  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`, {
    method: 'POST',
    body: form
  });

  const data = await response.json();
  if (!response.ok || !data?.ok) {
    throw new Error(`Telegram sendDocument failed: ${data?.description || response.status}`);
  }
}

async function telegramApi(env, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok || !data?.ok) {
    throw new Error(`Telegram ${method} failed: ${data?.description || response.status}`);
  }
  return data;
}

function parseDataUrl(dataUrl) {
  const match = /^data:([^;]+);base64,(.*)$/s.exec(String(dataUrl || ''));
  if (!match) throw new Error('Invalid dataUrl in image payload.');
  const mime = match[1] || 'application/octet-stream';
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return { mime, bytes };
}

function mimeToExt(mime) {
  const map = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif'
  };
  return map[mime] || 'bin';
}

function sanitizeFilename(value) {
  return String(value || 'file')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'file';
}

function optionalNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : null;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function corsHeaders(env) {
  const origin = env.ALLOWED_ORIGIN || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

function json(data, status, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(env)
    }
  });
}
