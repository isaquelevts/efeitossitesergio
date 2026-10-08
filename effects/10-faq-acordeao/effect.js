/* Acordeão acessível (botão + aria-expanded + região) com altura animada pelo GSAP (height: "auto").
 * Uma pergunta aberta por vez. Depois de animar, recalcula o ScrollTrigger (o que está abaixo mudou de lugar). */
FX.smoothScroll();
const head = FX.heliosReveal(document.querySelectorAll(".faq__head [data-reveal]"));
FX.arm(document.querySelector(".faq"), "top 72%", () => head.play(), () => head.reverse());

const items = [...document.querySelectorAll("[data-faq]")];
let refreshTimer = 0;
const refreshLater = () => { clearTimeout(refreshTimer); refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150); };

const setOpen = (item, open) => {
  const a = item.querySelector(".faq__a");
  item.classList.toggle("is-open", open);
  item.querySelector(".faq__q").setAttribute("aria-expanded", String(open));
  gsap.killTweensOf(a);
  gsap.to(a, {
    height: open ? "auto" : 0, autoAlpha: open ? 1 : 0,
    duration: open ? 0.7 : 0.5, ease: open ? "power3.out" : "power3.inOut",
    onComplete: refreshLater,
  });
};
items.forEach((item) => {
  gsap.set(item.querySelector(".faq__a"), { height: 0, autoAlpha: 0 });
  item.querySelector(".faq__q").addEventListener("click", () => {
    const open = !item.classList.contains("is-open");
    items.forEach((o) => { if (o !== item && o.classList.contains("is-open")) setOpen(o, false); });
    setOpen(item, open);
  });
});

// as perguntas sobem em cascata
gsap.set(items, { autoAlpha: 0, y: 34 });
FX.arm(document.querySelector(".faq__list"), "top 86%",
  () => gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.9, ease: FX.EASE, stagger: 0.06 }),
  () => gsap.to(items, { autoAlpha: 0, y: 34, duration: 0.4, ease: "power2.in", stagger: 0.02 }));
