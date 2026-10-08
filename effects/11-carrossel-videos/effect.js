/* Duplica a lista (laço sem emenda), usa a capa do YouTube e carrega o iframe só no clique (leve + privado:
 * youtube-nocookie). Enquanto há vídeo tocando, o carrossel para. */
FX.smoothScroll();
const head = FX.heliosReveal(document.querySelectorAll(".voices__head [data-reveal]"));
FX.arm(document.querySelector(".voices"), "top 72%", () => head.play(), () => head.reverse());

const rail = document.querySelector("[data-voices]");
const track = rail.querySelector(".voices__track");
[...track.children].forEach((li) => { const c = li.cloneNode(true); c.setAttribute("aria-hidden", "true"); c.querySelector("button").tabIndex = -1; track.appendChild(c); });

track.querySelectorAll(".voice").forEach((btn) => {
  const id = (btn.dataset.yt || "").trim();
  if (id) btn.style.setProperty("--poster", `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`);   // capa do próprio YouTube
});
track.addEventListener("click", (e) => {
  const btn = e.target.closest(".voice");
  const id = btn?.dataset.yt?.trim();
  if (!btn || !id || btn.querySelector("iframe")) return;
  const f = document.createElement("iframe");
  f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1`;
  f.title = btn.getAttribute("aria-label") || "Vídeo";
  f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  f.allowFullscreen = true;
  btn.appendChild(f);
  rail.classList.add("is-playing");
});

// o carrossel sobe depois do título
gsap.set(rail, { autoAlpha: 0, y: 60 });
FX.arm(rail, "top 92%",
  () => gsap.to(rail, { autoAlpha: 1, y: 0, duration: 1.2, ease: FX.EASE, delay: 0.25 }),
  () => gsap.to(rail, { autoAlpha: 0, y: 60, duration: 0.5, ease: "power2.in" }));
