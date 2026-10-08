/* Os cards sobem em cascata saindo do desfoque; a letra grande "assenta" um instante depois.
 * Em tela com mouse, uma luz azul segue o cursor dentro de cada card (--mx / --my). */
FX.smoothScroll();
const cards = gsap.utils.toArray("[data-card]");
const letters = cards.map((c) => c.querySelector(".card__letter"));

gsap.set(cards, { autoAlpha: 0, y: 70, scale: 0.94, filter: "blur(8px)" });
gsap.set(letters, { yPercent: 18 });
const cascade = gsap.timeline({ paused: true })
  .to(cards, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: FX.EASE, stagger: 0.12, clearProps: "filter" }, 0)
  .to(letters, { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.12 }, 0.15);
FX.arm(document.querySelector(".cards"), "top 80%", () => cascade.timeScale(1).play(), () => cascade.timeScale(1.6).reverse());
document.getElementById("replay").addEventListener("click", () => cascade.restart());

if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  cards.forEach((card) => {
    let raf = 0;
    card.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const b = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - b.left).toFixed(0) + "px");
        card.style.setProperty("--my", (e.clientY - b.top).toFixed(0) + "px");
      });
    });
  });
}
