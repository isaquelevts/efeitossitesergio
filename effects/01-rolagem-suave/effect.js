/* Rolagem suave: Lenis sincronizado com o ScrollTrigger.
 * A receita inteira está em FX.smoothScroll() (../../shared/fx-core.js):
 *
 *   const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
 *   lenis.on("scroll", ScrollTrigger.update);                              // ScrollTrigger lê a posição do Lenis
 *   ScrollTrigger.addEventListener("refresh", () => lenis.resize());       // pins mudam a altura da página
 *   gsap.ticker.add((t) => lenis.raf(t * 1000));                           // o Lenis anda no relógio do GSAP
 *   gsap.ticker.lagSmoothing(0);
 *
 * Esta demo deixa trocar o modo ao vivo.
 */
const lenis = FX.smoothScroll({ lerp: 0.09 });
document.querySelectorAll(".modes button").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll(".modes button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  const m = b.dataset.mode;
  lenis.options.smoothWheel = m !== "native";
  lenis.options.lerp = m === "agile" ? 0.2 : 0.09;
}));
