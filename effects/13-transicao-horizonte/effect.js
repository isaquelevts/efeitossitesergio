/* O raio do horizonte (--r) é animado pelo GSAP dentro de um pin: a seção clara fica fixada e o círculo cresce
 * até cobrir o canto mais distante da tela.
 *
 * Dois cuidados que tiram a "travada":
 *  - ease "power2.inOut" (e não "in"): com "in" o horizonte chegava ao fim na velocidade máxima e parava de uma vez
 *    ao soltar o pin; assim ele nasce e assenta devagar;
 *  - um respiro final (0.12 do pin) com a tela já escura, antes de a seção soltar. */
FX.smoothScroll();
const light = document.querySelector(".light"), eclipse = light.querySelector(".light__eclipse");
light.classList.add("has-eclipse");

const head = FX.heliosReveal(light.querySelectorAll("[data-reveal]"));
FX.arm(light, "top 60%", () => head.play(), () => head.reverse());

const horizon = { r: 0 };
const maxR = () => Math.hypot(innerWidth / 2, innerHeight) + 300;     // cobre o canto mais distante + a luz da borda
const paint = () => {
  eclipse.style.setProperty("--r", horizon.r.toFixed(1) + "px");
  eclipse.style.opacity = Math.min(1, horizon.r / 90).toFixed(2);     // nasce do nada, sem ponto de luz parado
};
paint();

gsap.timeline({
  scrollTrigger: { trigger: light, start: "bottom bottom", end: "+=110%", pin: true, anticipatePin: 1, scrub: 0.5, invalidateOnRefresh: true },
})
  .fromTo(horizon, { r: 0 }, { r: () => maxR(), ease: "power2.inOut", duration: 0.88, onUpdate: paint }, 0)
  .to({}, { duration: 0.12 }, 0.88);
