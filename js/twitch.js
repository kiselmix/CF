(() => {
  const channel = 'kiselmix69';
  const parent = 'crystalfall.fun';

  const STORAGE_KEY = 'twitch_widget_closed_until';
  const HIDE_FOR_MS = 60 * 60 * 1000; // 1 hour

  let player = null;

  function isTemporarilyClosed() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    const closedUntil = Number(raw);
    if (!Number.isFinite(closedUntil)) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }

    if (Date.now() >= closedUntil) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }

    return true;
  }

  function closeForOneHour() {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + HIDE_FOR_MS));
  }

  async function init() {
    const widget = document.getElementById('twitchWidget');
    const mount = document.getElementById('twitchPlayerMount');
    const closeBtn = document.getElementById('twitchCloseBtn');

    if (!widget || !mount || !closeBtn) return;

    if (isTemporarilyClosed()) {
      widget.hidden = true;
      return;
    }

    closeBtn.addEventListener('click', () => {
      closeForOneHour();
      widget.hidden = true;

      if (player) {
        try {
          player.pause();
        } catch (e) {
          console.error('Pause on close failed', e);
        }
      }

      mount.innerHTML = '';
      player = null;
    });

    try {
      const res = await fetch(
        'https://twitch-api.crystalfall.workers.dev/?channel=' + encodeURIComponent(channel),
        { method: 'GET' }
      );

      if (!res.ok) {
        console.error('Twitch status request failed:', res.status);
        return;
      }

      const data = { live: true };
      console.log('Twitch live check:', data);

      if (data.live !== true) {
        widget.hidden = true;
        return;
      }

      widget.hidden = false;

      requestAnimationFrame(() => {
        player = new Twitch.Player('twitchPlayerMount', {
          width: '100%',
          height: '100%',
          channel,
          parent: [parent],
          muted: true,
          autoplay: true
        });
      });
    } catch (e) {
      console.error('Twitch widget failed', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();