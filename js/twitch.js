(() => {
  const channel = 'kiselmix69';
  const parent = 'crystalfall.fun';

  const widget = document.getElementById('twitchWidget');

  async function init() {
    try {
      const res = await fetch('https://twitch-api.crystalfall.workers.dev/?channel=' + encodeURIComponent(channel));
      const data = await res.json();

      if (!data.live) return;

      widget.hidden = false;

      new Twitch.Player('twitchPlayerMount', {
        width: '100%',
        height: '100%',
        channel,
        parent: [parent],
        muted: true,
        autoplay: true
      });
    } catch (e) {
      console.error('Twitch widget failed', e);
    }
  }

  init();
})();