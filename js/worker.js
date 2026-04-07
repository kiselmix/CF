export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const channel = (url.searchParams.get('channel') || '').trim().toLowerCase();

    if (!channel) {
      return json({ live: false, error: 'channel is required' }, 400);
    }

    const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: env.TWITCH_CLIENT_ID,
        client_secret: env.TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
      })
    });

    if (!tokenRes.ok) {
      return json({ live: false, error: 'token request failed' }, 502);
    }

    const tokenData = await tokenRes.json();

    const streamRes = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(channel)}`,
      {
        headers: {
          'Client-Id': env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      }
    );

    if (!streamRes.ok) {
      return json({ live: false, error: 'stream request failed' }, 502);
    }

    const streamData = await streamRes.json();
    const stream = Array.isArray(streamData.data) ? streamData.data[0] : null;

    return json({
      live: !!stream,
      title: stream?.title || null,
      game_name: stream?.game_name || null,
      viewer_count: stream?.viewer_count || 0
    });
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=30'
    }
  });
}