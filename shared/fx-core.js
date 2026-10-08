/* fx-core.js — o "miolo" que todos os efeitos usam (GSAP 3.13 + ScrollTrigger + SplitText + Lenis)
 *
 *   FX.smoothScroll({ lerp })         rolagem suave (Lenis) sincronizada com o ScrollTrigger
 *   FX.heliosReveal(alvos, { delay }) text reveal: palavra por palavra (data-reveal="words") ou bloco (data-reveal="block")
 *   FX.arm(gatilho, start, onIn, onOut) gatilho "entrou/saiu" que se corrige sozinho (recarregar no meio, âncora, resize)
 *   FX.EASE                           a curva usada em todas as entradas
 *
 * Carregue DEPOIS de gsap, ScrollTrigger, SplitText, CustomEase e Lenis.
 */
(() => {
  const { gsap, ScrollTrigger, SplitText, CustomEase } = window;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

  /* curva de entrada: arranca rápido e assenta muito suave (a mesma da hero da Helios Creative) */
  CustomEase.create("helios", "0.2, 0.7, 0.2, 1");
  const EASE = "helios";

  /* ---------- rolagem suave ----------
   * lerp (amortecimento contínuo) em vez de duration+easing: a curva expo arrancava rápido demais a cada
   * rolada — o "tranco" do primeiro movimento. 0.09 é o valor que dá a sensação de "manteiga". */
  function smoothScroll({ lerp = 0.09 } = {}) {
    if (!window.Lenis || matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
    const lenis = new Lenis({ lerp, smoothWheel: true });
    window.__lenis = lenis;                                     // os outros efeitos (showreel) reaproveitam
    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());   // pins mudam a altura da página
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return lenis;
  }

  /* ---------- text reveal estilo Helios ----------
   * data-reveal="words": palavra por palavra — sobe 0,45em, sai de blur(10px), 0,9s, 0,07s entre palavras
   * data-reveal="block": o bloco inteiro — sobe 28px, sai de blur(6px), 0,9s
   * Sem máscara. Devolve { play, reverse }. Elementos .grad dentro do título ganham o degradê palavra por palavra. */
  function heliosReveal(targets, { delay = 0 } = {}) {
    // o atraso é um deslocamento DENTRO do timeline (não a opção delay): o estado inicial (invisível)
    // é aplicado na hora e as palavras não aparecem antes do reveal começar
    const tl = gsap.timeline({ paused: true });
    let at = delay;
    [...targets].forEach((el) => {
      const mode = el.dataset.reveal || "words";
      if (mode === "words") {
        const split = SplitText.create(el, { type: "words", wordsClass: "wd" });
        el.querySelectorAll(".grad").forEach((g) => g.classList.add("grad--split"));   // o degradê do pai quebra quando os filhos se movem
        gsap.set(split.words, { autoAlpha: 0, y: "0.45em", filter: "blur(10px)" });
        tl.to(split.words, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: EASE, stagger: 0.07, clearProps: "filter" }, at);
        at += 0.15 + split.words.length * 0.07 * 0.6;            // o próximo entra antes do último terminar
      } else {
        gsap.set(el, { autoAlpha: 0, y: 28, filter: "blur(6px)" });
        tl.to(el, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: EASE, clearProps: "filter" }, at);
        at += 0.25;
      }
    });
    return {
      play: () => tl.timeScale(1).play(),
      reverse: () => tl.timeScale(1.8).reverse(),
      timeline: tl,
    };
  }

  /* ---------- gatilho que se corrige sozinho ----------
   * se a página abrir (ou for recalculada) já além do ponto de entrada — recarregar no meio, âncora, resize —
   * o efeito toca em vez de ficar travado escondido. `start` pode ser função (recalculada a cada refresh). */
  function arm(trigger, start, onIn, onOut) {
    let isIn = false;
    const enter = () => { if (!isIn) { isIn = true; onIn(); } };
    const leave = () => { if (isIn) { isIn = false; onOut(); } };
    ScrollTrigger.create({
      trigger, start,
      onEnter: enter,
      onLeaveBack: leave,
      onRefresh: (self) => { if (self.scroll() >= self.start) enter(); else leave(); },
    });
  }

  window.FX = { smoothScroll, heliosReveal, arm, EASE };
  window.__fx = window.FX;                                       // nome usado pelo showreel

  // sempre abre do topo: efeitos com pin dependem de começar em 0
  try { history.scrollRestoration = "manual"; } catch (e) {}
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener("load", () => ScrollTrigger.refresh());
})();
