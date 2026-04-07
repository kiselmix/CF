(() => {
  const channel = 'kiselmix69';
  const parent = 'crystalfall.fun';

  let player = null;
  let isClosed = false;

  async function init() {
    const widget = document.getElementById('twitchWidget');
    const mount = document.getElementById('twitchPlayerMount');
    const muteBtn = document.getElementById('twitchMuteBtn');
    const pauseBtn = document.getElementById('twitchPauseBtn');
    const closeBtn = document.getElementById('twitchCloseBtn');

    if (!widget || !mount || !muteBtn || !pauseBtn || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
      isClosed = true;
      widget.hidden = true;

      if (player) {
        try {
          player.pause();
        } catch (e) {
          console.error('Pause on close failed', e);
        }
      }
    });

    muteBtn.addEventListener('click', () => {
      if (!player) return;

      try {
        const muted = player.getMuted();
        player.setMuted(!muted);
        muteBtn.textContent = muted ? '🔊 Sound' : '🔇 Sound';
      } catch (e) {
        console.error('Mute toggle failed', e);
      }
    });

    pauseBtn.addEventListener('click', () => {
      if (!player) return;

      try {
        const paused = player.isPaused();
        if (paused) {
          player.play();
          pauseBtn.textContent = '⏸ Pause';
        } else {
          player.pause();
          pauseBtn.textContent = '▶ Play';
        }
      } catch (e) {
        console.error('Pause toggle failed', e);
      }
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

      if (data.live !== true || isClosed) {
        widget.hidden = true;
        mount.innerHTML = '';
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

        player.addEventListener(Twitch.Player.READY, () => {
          try {
            player.setMuted(true);
            muteBtn.textContent = '🔇 Sound';
            pauseBtn.textContent = '⏸ Pause';
          } catch (e) {
            console.error('Player ready init failed', e);
          }
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