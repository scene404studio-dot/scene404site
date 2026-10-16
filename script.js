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


/* SCENE404 English / Russian language switch. Translation is local and works offline. */
(() => {
  const translations = {
    "Studio":"Студия", "The World":"Мир", "About":"О студии",
    "INDEPENDENT DIGITAL STUDIO":"НЕЗАВИСИМАЯ DIGITAL-СТУДИЯ",
    "Small studio. Distant ideas.":"Небольшая студия. Идеи без границ.",
    "We make digital products, characters, and worlds worth keeping around.":"Мы создаём цифровые продукты, персонажей и миры, к которым хочется возвращаться.",
    "About the studio":"О студии", "THE IDEA":"ИДЕЯ",
    "Useful isn't enough.":"Одной пользы недостаточно.",
    "The things we keep are rarely defined by function alone. They become familiar. They gather meaning. We remember them.":"Мы сохраняем вещи не только за их функцию. Они становятся знакомыми, обретают смысл — и остаются в памяти.",
    "We are interested in making digital experiences that feel considered, distinctive, and worth returning to.":"Нам интересны цифровые впечатления, в которых чувствуется внимание к деталям, индивидуальность и желание вернуться.",
    "Explore the world":"Исследовать мир", "PRODUCT 001":"ПРОДУКТ 001",
    "Meet BRB.":"Знакомьтесь, BRB.",
    "A character-led digital experiment about curiosity, small discoveries, and the details that make a product feel like its own world.":"Цифровой эксперимент о любопытстве, маленьких открытиях и деталях, благодаря которым продукт становится отдельным миром.",
    "BRB is in development. More to come as it takes shape.":"BRB в разработке. Продолжение — по мере того, как он обретает форму.",
    "Discover BRB":"Открыть BRB", "IN THE MAKING":"В ПРОЦЕССЕ", "In between things.":"Между делом.",
    "Character, objects, interactions, and details are all part of the same idea. We are building BRB one piece at a time.":"Персонаж, объекты, взаимодействия и детали — части одной идеи. Мы создаём BRB постепенно, шаг за шагом.",
    "SCENE404 STUDIO":"СТУДИЯ SCENE404", "Things worth keeping around.":"Вещи, которые хочется оставить.",
    "An independent studio exploring what digital products can become when character, design, and interaction are treated as parts of the same world.":"Независимая студия, исследующая, какими могут стать цифровые продукты, когда характер, дизайн и взаимодействие объединяются в один мир.",
    "Get to know the studio":"Познакомиться со студией", "SCENE404 studio":"SCENE404 studio",
    "Thanks for skipping around.":"Спасибо, что заглянули.", "STAY IN THE LOOP":"БУДЬТЕ В КУРСЕ",
    "Be first in line.":"Будьте в числе первых.",
    "Get updates from SCENE404 studio and hear when BRB is ready.":"Получайте новости SCENE404 studio и узнайте первыми, когда BRB будет готов.",
    "Updates from the studio, when there is something to share.":"Новости студии — когда нам будет чем поделиться.",
    "Email address":"Электронная почта", "Email Address":"Электронная почта", "Join the waitlist":"В лист ожидания",
    "Not spam, just first in line.":"Никакого спама — только новости для первых.", "Privacy Policy":"Политика конфиденциальности",
    "Terms":"Условия", "Navigation":"Навигация", "Social":"Соцсети", "Official":"Документы",
    "Privacy":"Конфиденциальность", "Support":"Поддержка", "Contact":"Контакты", "FAQ":"Вопросы и ответы",
    "Do Not Sell or Share My Personal Information":"Не продавать и не передавать мои персональные данные",
    "A little character with a world of its own.":"Маленький персонаж со своим собственным миром.",
    "BRB is the first product from SCENE404 studio — an exploration of what digital things can become when they have personality, behavior, and a reason to return.":"BRB — первый продукт SCENE404 studio. Мы исследуем, какими могут быть цифровые вещи, если у них есть характер, поведение и причина возвращаться.",
    "MORE THAN AN INTERFACE":"БОЛЬШЕ, ЧЕМ ИНТЕРФЕЙС", "A character you can come back to.":"Персонаж, к которому хочется вернуться.",
    "We are interested in the space between a useful product and something that feels familiar.":"Нас интересует пространство между полезным продуктом и чем-то по-настоящему знакомым.",
    "BRB is where we begin exploring that idea through character, interaction, and small digital moments.":"Через BRB мы исследуем эту идею с помощью персонажа, взаимодействия и маленьких цифровых моментов.",
    "WHEN THE DAY IS DONE":"КОГДА ДЕНЬ ЗАКОНЧЕН", "Sleep.":"Сон.", "Even little characters need a little downtime.":"Даже маленьким персонажам нужен отдых.",
    "A MOMENT TO PLAY":"ВРЕМЯ ПОИГРАТЬ", "Play.":"Игра.", "A tiny game, a quick choice, and one more reason to come back.":"Небольшая игра, быстрый выбор и ещё одна причина вернуться.",
    "MEET THE CHARACTERS":"ЗНАКОМЬТЕСЬ С ПЕРСОНАЖАМИ", "Same world. Different moods.":"Один мир. Разные настроения.",
    "A few of the personalities taking shape inside BRB.":"Некоторые характеры, которые появляются внутри BRB.",
    "Moonlight":"Лунный свет", "Up a little too late.":"Опять засиделся допоздна.", "Whisper":"Шёпот", "Quietly around.":"Тихо где-то рядом.",
    "Curator":"Куратор", "Keeps the good things.":"Хранит всё хорошее.", "Keeper":"Хранитель", "Not letting go.":"Не отпускает.",
    "Drifter":"Странник", "Somewhere else, briefly.":"Ненадолго где-то ещё.", "Glitch":"Сбой", "Not quite as expected.":"Не совсем так, как ожидалось.",
    "Phantom":"Фантом", "There, then not.":"Был здесь — и исчез.", "Secret":"Секрет", "We can't say much.":"Многое рассказать не можем.",
    "FIRST IN LINE":"ПЕРВЫМИ УЗНАЙТЕ", "BRB is in the making.":"BRB ещё создаётся.",
    "Get the first invite and hear when there is something new to see.":"Получите приглашение первыми и узнайте, когда появится что-то новое.",
    "THE WORLD OF SCENE404":"МИР SCENE404", "More than a product.":"Больше, чем продукт.",
    "A collection of characters, objects, ideas, and digital moments that belong to the same world.":"Коллекция персонажей, объектов, идей и цифровых моментов, принадлежащих одному миру.",
    "We build beyond the screen itself, exploring the details that give a product its own identity.":"Мы смотрим за пределы экрана и исследуем детали, которые придают продукту собственную индивидуальность.",
    "01 / CHARACTERS":"01 / ПЕРСОНАЖИ", "A few familiar faces.":"Несколько знакомых лиц.",
    "Different moods, same little world. More will find their way here.":"Разные настроения, один маленький мир. Со временем здесь появятся и другие.",
    "02 / OBJECTS":"02 / ОБЪЕКТЫ", "Little things, their own way.":"Маленькие вещи — по-своему.",
    "Objects with personality become part of the BRB world. Familiar shapes, a little color, and details made to be remembered.":"Объекты с характером становятся частью мира BRB. Знакомые формы, немного цвета и детали, которые хочется запомнить.",
    "03 / LITTLE TREATS":"03 / МАЛЕНЬКИЕ РАДОСТИ", "Sweet little details.":"Сладкие мелочи.", "Because the smallest things can become the most memorable.":"Потому что именно мелочи порой запоминаются сильнее всего.",
    "SMALL OBJECTS, BIG PERSONALITY":"МАЛЕНЬКИЕ ОБЪЕКТЫ, БОЛЬШОЙ ХАРАКТЕР", "The little things.":"Маленькие вещи.",
    "Ordinary objects. A little less ordinary here.":"Обычные предметы. Здесь — чуть менее обычные.", "Something to keep.":"То, что хочется оставить.",
    "Plain. Not yours. Mine.":"Обычное. Не твоё. Моё.", "A little treat.":"Маленькое удовольствие.",
    "A MOMENT IN THE WORLD":"МОМЕНТ ИЗ ЭТОГО МИРА", "Apparently, this is his now.":"Похоже, теперь это его.", "Some things are better left unexplained.":"Некоторые вещи лучше не объяснять.",
    "THE STUDIO POV":"ВЗГЛЯД СТУДИИ", "The world will keep growing as we make new products, explore new ideas, and find new reasons to return.":"Этот мир будет расти вместе с новыми продуктами, идеями и причинами возвращаться.",
    "About the studio":"О студии", "ABOUT THE STUDIO":"О СТУДИИ",
    "We make products, characters, and worlds shaped by one belief: usefulness matters, but it is not the whole story.":"Мы создаём продукты, персонажей и миры, исходя из одной идеи: польза важна, но это ещё не вся история.",
    "OUR POINT OF VIEW":"НАШ ВЗГЛЯД",
    "The digital world is full of things that work. Fewer things give us a reason to remember them, return to them, or make them part of our everyday lives.":"Цифровой мир полон вещей, которые работают. Но лишь немногие дают повод помнить о них, возвращаться к ним и впускать их в повседневную жизнь.",
    "We are interested in that difference — the space between function and familiarity.":"Нас интересует именно эта разница — пространство между функцией и чувством знакомости.",
    "FOLLOW WHAT COMES NEXT":"СЛЕДИТЕ ЗА ПРОДОЛЖЕНИЕМ", "A studio is more than one product.":"Студия — это больше, чем один продукт.",
    "Join the list for new projects, first looks, and updates from SCENE404 studio.":"Подпишитесь, чтобы первыми узнавать о новых проектах, видеть их раньше других и получать новости SCENE404 studio.",
    "A NOTE FROM THE FOUNDER":"ЗАМЕТКА ОТ ОСНОВАТЕЛЯ", "Why I started building BRB.":"Почему я начала создавать BRB.",
    "STUDIO":"СТУДИЯ", "THE IDEA":"ИДЕЯ", "IN THE MAKING":"В РАБОТЕ", "THE STUDIO POV":"ВЗГЛЯД СТУДИИ"
  };
  const reverse = Object.fromEntries(Object.entries(translations).map(([en, ru]) => [ru, en]));
  const storageKey = 'scene404-language';
  function applyLanguage(language) {
    const map = language === 'ru' ? translations : reverse;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { const original = node.nodeValue; const trimmed = original.trim(); if (!trimmed) return; if (map[trimmed]) node.nodeValue = original.replace(trimmed, map[trimmed]); });
    document.querySelectorAll('input[placeholder], img[alt], button[aria-label], a[aria-label], nav[aria-label]').forEach(el => {
      for (const attr of ['placeholder','alt','aria-label']) { const val = el.getAttribute(attr); if (val && map[val]) el.setAttribute(attr, map[val]); }
    });
    document.documentElement.lang = language;
    const toggle = document.querySelector('.language-toggle'); if (toggle) { toggle.textContent = language === 'ru' ? 'EN' : 'RU'; toggle.setAttribute('aria-label', language === 'ru' ? 'Switch to English' : 'Перевести на русский'); toggle.setAttribute('title', language === 'ru' ? 'Switch to English' : 'Перевести на русский'); }
    try { localStorage.setItem(storageKey, language); } catch (_) {}
  }
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header'); if (!header) return;
    const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'language-toggle'; toggle.textContent = 'RU'; toggle.setAttribute('aria-label','Перевести на русский'); toggle.setAttribute('title','Перевести на русский'); toggle.setAttribute('lang','ru'); header.appendChild(toggle);
    let language = 'en'; try { language = localStorage.getItem(storageKey) === 'ru' ? 'ru' : 'en'; } catch (_) {}
    toggle.addEventListener('click', () => applyLanguage(document.documentElement.lang === 'ru' ? 'en' : 'ru'));
    if (language === 'ru') applyLanguage('ru');
  });
})();
