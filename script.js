(() => {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = year);

  const toggle = document.querySelector(".mobile-menu-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".mobile-backdrop");
  const setMenu = (open) => {
    if (!toggle || !drawer || !backdrop) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    drawer.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  backdrop?.addEventListener("click", () => setMenu(false));
  drawer?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") setMenu(false);
  });

  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const editions = [
      {name:"Moonlight", file:"brb-moonlight.jpeg", tagline:"Sees the softer side.", desc:"Quietly curious. Thoughtful. Finds beauty in the little things.", traits:"GENTLE · THOUGHTFUL · QUIETLY CURIOUS"},
      {name:"Whisper", file:"brb-whisper.jpeg", tagline:"Not loud. Always here.", desc:"Calm, observant, and quietly playful. The kind of presence that doesn't need to announce itself.", traits:"CALM · OBSERVANT · QUIETLY PLAYFUL"},
      {name:"Curator", file:"brb-curator.jpeg", tagline:"Keeps the good things.", desc:"Attentive and selective. Finds meaning in the small things worth keeping.", traits:"ATTENTIVE · SELECTIVE · CONSIDERED"},
      {name:"Keeper", file:"brb-keeper.jpeg", tagline:"Holds what matters.", desc:"Loyal, steady, protective. Quietly strong.", traits:"LOYAL · STEADY · PROTECTIVE"},
      {name:"Drifter", file:"brb-drifter.jpeg", tagline:"Always finding something.", desc:"Curious, observant, a wanderer who finds beauty in the in-between.", traits:"CURIOUS · OBSERVANT · WANDERER"},
      {name:"Glitch", file:"brb-glitch.jpeg", tagline:"Turns mistakes into something new.", desc:"Playful, unpredictable, creative. Always up to something.", traits:"PLAYFUL · UNPREDICTABLE · CREATIVE"},
      {name:"Secret", file:"brb-secret.jpeg", tagline:"For now.", desc:"Unknown, something different, still a mystery. Some things can wait.", traits:"UNKNOWN · DIFFERENT · STILL A MYSTERY"}
    ];
    let index = 0;
    const main = carousel.querySelector("[data-main-image]");
    const title = carousel.querySelector("[data-edition-title]");
    const number = carousel.querySelector("[data-edition-number]");
    const tagline = carousel.querySelector("[data-edition-tagline]");
    const desc = carousel.querySelector("[data-edition-description]");
    const traits = carousel.querySelector("[data-edition-traits]");
    const thumbs = [...carousel.querySelectorAll("[data-slide]")];
    function show(next) {
      index = (next + editions.length) % editions.length;
      const item = editions[index];
      main.style.opacity = "0.25";
      window.setTimeout(() => {
        main.src = item.file;
        main.alt = `BRB ${item.name} edition`;
        title.textContent = item.name;
        const dot = document.createElement("span"); dot.className = "accent-dot"; dot.textContent = ".";
        title.appendChild(dot);
        number.textContent = `Edition ${String(index + 1).padStart(2,"0")} / ${String(editions.length).padStart(2,"0")}`;
        tagline.textContent = item.tagline;
        desc.textContent = item.desc;
        traits.textContent = item.traits;
        main.style.opacity = "1";
      }, 100);
      thumbs.forEach((b,i) => b.setAttribute("aria-current", String(i === index)));
    }
    carousel.querySelector("[data-prev]")?.addEventListener("click", () => show(index - 1));
    carousel.querySelector("[data-next]")?.addEventListener("click", () => show(index + 1));
    thumbs.forEach((b,i) => b.addEventListener("click", () => show(i)));
    carousel.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    // Touch swipe for phones.
    let startX = null;
    main.addEventListener("touchstart", e => { startX = e.changedTouches[0].clientX; }, {passive:true});
    main.addEventListener("touchend", e => {
      if (startX === null) return;
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 45) show(index + (delta < 0 ? 1 : -1));
      startX = null;
    }, {passive:true});
  }
})();
