/* Text reveal estilo Helios.
 * Marque o texto com data-reveal="words" (palavra por palavra) ou data-reveal="block" (bloco inteiro)
 * e chame FX.heliosReveal(elementos). Ele devolve { play, reverse }.
 * FX.arm(...) toca quando o gatilho entra e reverte quando sai — e se corrige se a página abrir no meio. */
FX.smoothScroll();
document.querySelectorAll("[data-sec]").forEach((sec) => {
  const reveal = FX.heliosReveal(sec.querySelectorAll("[data-reveal]"));
  FX.arm(sec, "top 70%", () => reveal.play(), () => reveal.reverse());
});
