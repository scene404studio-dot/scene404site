(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  if (header) {
    const nav = header.querySelector('.nav-links');
    if (nav && !header.querySelector('.mobile-menu-toggle')) {
      const toggle = document.createElement('button');
      toggle.className = 'mobile-menu-toggle'; toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Open navigation'); toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<span></span><span></span><span></span>';
      header.appendChild(toggle);
      const backdrop = document.createElement('button');
      backdrop.className = 'mobile-menu-backdrop'; backdrop.type = 'button';
      backdrop.setAttribute('aria-label', 'Close navigation');
      const drawer = document.createElement('nav'); drawer.className = 'mobile-menu-drawer';
      drawer.setAttribute('aria-label', 'Mobile navigation');
      nav.querySelectorAll('a').forEach(link => drawer.appendChild(link.cloneNode(true)));
      document.body.append(backdrop, drawer);
      const close = () => { drawer.classList.remove('is-visible'); backdrop.classList.remove('is-visible'); document.body.classList.remove('mobile-menu-open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open navigation'); };
      const open = () => { drawer.classList.add('is-visible'); backdrop.classList.add('is-visible'); document.body.classList.add('mobile-menu-open'); toggle.setAttribute('aria-expanded','true'); toggle.setAttribute('aria-label','Close navigation'); };
      toggle.addEventListener('click', () => drawer.classList.contains('is-visible') ? close() : open());
      backdrop.addEventListener('click', close);
      drawer.addEventListener('click', event => { if (event.target.closest('a')) close(); });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
      window.addEventListener('resize', () => { if (window.innerWidth > 680) close(); });
    }
    const updateHeader = () => header.classList.toggle('is-compact', window.scrollY > 30);
    window.addEventListener('scroll', updateHeader, {passive:true}); updateHeader();
  }
  /* Scroll-linked image scale: subtle enough to feel alive, not distracting. */
  const motionImages = document.querySelectorAll('.motion-media, .big-image, .studio-point-image, .about-rare-image, .world-feature-image-frame, .personality-board-frame');
  if (motionImages.length) {
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
        if (entry.isIntersecting) entry.target.style.setProperty('--scroll-image-scale', '1');
        else entry.target.style.setProperty('--scroll-image-scale', '.985');
      }), {threshold:0.12, rootMargin:'-6% 0px -6% 0px'});
      motionImages.forEach(el => imageObserver.observe(el));
    } else {
      motionImages.forEach(el => { el.classList.add('is-in-view'); el.style.setProperty('--scroll-image-scale','1'); });
    }
  }
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('main > section, .character-card, .footer-newsletter');
    targets.forEach(el => el.classList.add('js-reveal'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    }), {threshold:0.08, rootMargin:'0px 0px -24px 0px'});
    targets.forEach(el => observer.observe(el));
  }
  /* Studio editorial carousel: arrows, dots, keyboard, and touch swipe. */
  document.querySelectorAll('[data-studio-carousel]').forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.studio-carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.studio-carousel-dots button'));
    const prev = carousel.querySelector('.studio-carousel-prev');
    const next = carousel.querySelector('.studio-carousel-next');
    const stage = carousel.querySelector('.studio-carousel-stage');
    if (slides.length !== 4 || dots.length !== slides.length || !prev || !next || !stage) return;
    let active = 0;
    const show = index => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === active);
        slide.setAttribute('aria-hidden', String(i !== active));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === active);
        if (i === active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };
    prev.addEventListener('click', () => show(active - 1));
    next.addEventListener('click', () => show(active + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    let startX = null;
    stage.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; }, {passive:true});
    stage.addEventListener('touchend', event => {
      if (startX === null) return;
      const delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 45) show(active + (delta < 0 ? 1 : -1));
      startX = null;
    }, {passive:true});
    carousel.tabIndex = 0;
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') show(active - 1);
      if (event.key === 'ArrowRight') show(active + 1);
    });
    show(0);
  });
  document.querySelectorAll('[data-character-carousel]').forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-character'));
    const dots = carousel.querySelector('.carousel-dots');
    const prev = carousel.querySelector('.carousel-prev'); const next = carousel.querySelector('.carousel-next');
    if (!slides.length || !dots || !prev || !next) return;
    let active = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    slides.forEach((slide, index) => {
      const dot = document.createElement('button'); dot.type = 'button'; dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show character ${index + 1}`); dot.addEventListener('click', () => show(index)); dots.appendChild(dot);
    });
    const dotButtons = Array.from(dots.querySelectorAll('button'));
    function show(index) {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.classList.toggle('is-active', i === active); slide.setAttribute('aria-hidden', String(i !== active)); });
      dotButtons.forEach((dot, i) => { if (i === active) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current'); });
    }
    prev.addEventListener('click', () => show(active - 1)); next.addEventListener('click', () => show(active + 1));
    let startX = null;
    const stage = carousel.querySelector('.carousel-stage');
    stage.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; }, {passive:true});
    stage.addEventListener('touchend', e => { if (startX === null) return; const delta = e.changedTouches[0].clientX - startX; if (Math.abs(delta) > 45) show(active + (delta < 0 ? 1 : -1)); startX = null; }, {passive:true});
    carousel.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(active - 1); if (e.key === 'ArrowRight') show(active + 1); });
    show(active);
  });
})();
