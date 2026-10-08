FX.smoothScroll();

/* ---------- objeto que entra girado e passa a flutuar ---------- */
const born = document.querySelector(".born");
const figure = born.querySelector(".born__figure"), floater = born.querySelector(".born__float");
const bornText = FX.heliosReveal(born.querySelectorAll("[data-reveal]"), { delay: 0.2 });

gsap.set(figure, { autoAlpha: 0, y: 70, scale: 0.84, rotation: -14, filter: "blur(10px)", transformOrigin: "50% 60%" });
const figIn = gsap.timeline({ paused: true })
  .to(figure, { autoAlpha: 1, y: 0, scale: 1, rotation: 0, filter: "blur(0px)", duration: 1.5, ease: FX.EASE, clearProps: "filter" }, 0);

// flutuação contínua: sobe/desce, balança e deriva de lado em ritmos diferentes (nunca repete igual)
const float = gsap.timeline({ paused: true });
float.fromTo(floater, { y: 8, rotation: -2.5 }, { y: -18, rotation: 3, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true }, 0)
     .fromTo(floater, { x: -6 }, { x: 8, duration: 5.1, ease: "sine.inOut", repeat: -1, yoyo: true }, 0);

FX.arm(born, "top 78%", () => { figIn.timeScale(1).play(); bornText.play(); }, () => { figIn.timeScale(1.6).reverse(); bornText.reverse(); });
ScrollTrigger.create({                                           // só flutua enquanto está na tela
  trigger: figure, start: "top bottom", end: "bottom top",
  onToggle: (self) => (self.isActive ? float.play() : float.pause()),
  onRefresh: (self) => (self.isActive ? float.play() : float.pause()),
});

/* ---------- foto revelada de baixo para cima + parallax ---------- */
const who = document.querySelector(".who");
const photo = who.querySelector("[data-photo]"), frame = who.querySelector(".who__frame"), img = frame.querySelector("img"), tag = who.querySelector("[data-tag]");
const whoText = FX.heliosReveal(who.querySelectorAll(".who__text [data-reveal]"), { delay: 0.15 });

gsap.set(frame, { clipPath: "inset(100% 0% 0% 0% round 28px)" });
gsap.set(img, { scale: 1.22, transformOrigin: "50% 100%" });
gsap.set(tag, { autoAlpha: 0, y: 40, filter: "blur(8px)" });
const photoIn = gsap.timeline({ paused: true })
  .to(frame, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.5, ease: "expo.inOut" }, 0)
  .to(img, { scale: 1, duration: 2, ease: "expo.out" }, 0.1)
  .to(tag, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: FX.EASE, clearProps: "filter" }, 1.0);
FX.arm(photo, "top 80%", () => photoIn.timeScale(1).play(), () => photoIn.timeScale(1.8).reverse());
FX.arm(who.querySelector(".who__text"), "top 72%", () => whoText.play(), () => whoText.reverse());

// parallax: a foto desliza um pouco mais devagar que a página (dentro da sobra da moldura)
gsap.fromTo(img, { yPercent: -4.5 }, { yPercent: 4.5, ease: "none", scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true } });

document.getElementById("replay").addEventListener("click", () => { figIn.restart(); photoIn.restart(); });
