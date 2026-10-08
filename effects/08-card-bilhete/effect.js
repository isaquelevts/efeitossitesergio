/* Entrada: o card sobe com expo, o conteúdo entra em cascata e o preço conta de 0 até o valor. */
FX.smoothScroll();
const card = document.querySelector("[data-ticket]");
const bits = [...card.querySelectorAll("[data-t]")];
const price = card.querySelector("[data-count]");
const target = +price.dataset.count, counter = { v: 0 };

gsap.set(card, { autoAlpha: 0, y: 90, scale: 0.95, transformOrigin: "50% 100%" });
gsap.set(bits, { autoAlpha: 0, y: 26, filter: "blur(8px)" });
const tl = gsap.timeline({ paused: true })
  .to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out", force3D: true }, 0)
  .to(bits, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: FX.EASE, stagger: 0.07, clearProps: "filter" }, 0.3)
  .to(counter, { v: target, duration: 1.5, ease: "expo.out", onUpdate: () => { price.textContent = Math.round(counter.v); } }, 0.55);

FX.arm(card, "top 84%", () => tl.timeScale(1).play(), () => tl.timeScale(1.6).reverse());
document.getElementById("replay").addEventListener("click", () => tl.restart());
