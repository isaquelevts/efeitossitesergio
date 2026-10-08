/* Entrada do card em camadas:
 *  1) o card sobe e escala;  2) o brilho cresce da base;  3) uma faixa de luz varre a borda de cima;
 *  4) as frases entram por cima (text reveal). */
FX.smoothScroll();
const card = document.querySelector("[data-card]");
const glow = card.querySelector(".card-fx__glow"), sides = card.querySelector(".card-fx__sides"), sweep = card.querySelector(".card-fx__sweep");

gsap.set(card, { autoAlpha: 0, y: 90, scale: 0.93, transformOrigin: "50% 100%" });
gsap.set(glow, { autoAlpha: 0, scaleY: 0.15, transformOrigin: "50% 100%" });
gsap.set(sides, { autoAlpha: 0 });

const cardIn = gsap.timeline({ paused: true })
  .to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 1.15, ease: "expo.out", force3D: true }, 0)
  .to(glow, { autoAlpha: 1, scaleY: 1, duration: 1.6, ease: "power3.out" }, 0.25)
  .to(sides, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, 0.45)
  .fromTo(sweep, { x: "-100%", autoAlpha: 1 }, { x: "260%", duration: 1.5, ease: "power2.inOut" }, 0.2)
  .to(sweep, { autoAlpha: 0, duration: 0.3, ease: "none" }, 1.4);

const text = FX.heliosReveal(card.querySelectorAll("[data-reveal]"), { delay: 0.5 });
FX.arm(card, "top 84%",
  () => { cardIn.timeScale(1).play(); text.play(); },
  () => { cardIn.timeScale(1.6).reverse(); text.reverse(); });

// repetir (só para a demo)
document.getElementById("replay").addEventListener("click", () => { cardIn.restart(); text.timeline.restart(); });
