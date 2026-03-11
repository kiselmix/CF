(() => {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (!burgerBtn || !mobileNav || !mobileOverlay) return;

  function isMobileViewport() {
    return window.innerWidth <= 820;
  }

  function openMobileMenu() {
    burgerBtn.classList.add('is-open');
    burgerBtn.setAttribute('aria-expanded', 'true');

    mobileNav.classList.add('open');

    mobileOverlay.hidden = false;
    requestAnimationFrame(() => {
      mobileOverlay.classList.add('is-open');
    });

    document.documentElement.classList.add('header-lock');
  }

  function closeMobileMenu() {
    burgerBtn.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');

    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('is-open');

    window.setTimeout(() => {
      if (!mobileOverlay.classList.contains('is-open')) {
        mobileOverlay.hidden = true;
      }
    }, 240);

    document.documentElement.classList.remove('header-lock');
  }

  function toggleMobileMenu() {
    if (mobileNav.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  burgerBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMobileMenu();
  });

  mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!isMobileViewport()) return;
    if (!mobileNav.classList.contains('open')) return;

    const clickedInsideMenu = mobileNav.contains(event.target);
    const clickedBurger = burgerBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedBurger) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (!isMobileViewport()) {
      closeMobileMenu();
    }
  });
})();