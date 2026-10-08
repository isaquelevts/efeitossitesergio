/* Entrada do texto da hero — pensada para tocar logo depois de um loader (ou ao carregar a página):
 *   1. o título entra palavra por palavra: sobe da base, sai de um blur forte e assenta com "expo";
 *   2. a citação entra linha por linha;
 *   3. o botão e o preço sobem por último, com um leve "pop".
 * A função devolve uma timeline; ao terminar, o SplitText é revertido e o HTML volta ao original. */
FX.smoothScroll();

function heroIntro({ delay = 0.2 } = {}) {
  const title = document.querySelector(".hero__title"), quote = document.querySelector(".hero__quote");
  const extras = [...document.querySelectorAll(".hero__cta .btn, .hero__price")];
  const tSplit = SplitText.create(title, { type: "words", wordsClass: "wd" });
  const qSplit = SplitText.create(quote, { type: "lines", linesClass: "ln" });
  const accent = title.querySelector(".hero__title-accent");
  accent?.classList.add("grad--split");                          // o degradê passa a valer em cada palavra

  gsap.set(tSplit.words, { autoAlpha: 0, y: "0.6em", scale: 0.94, filter: "blur(14px)", transformOrigin: "0% 100%" });
  gsap.set(qSplit.lines, { autoAlpha: 0, y: 16, filter: "blur(8px)" });
  gsap.set(extras, { autoAlpha: 0, y: 22, scale: 0.95, filter: "blur(6px)" });

  return gsap.timeline({
    delay,
    onComplete: () => { tSplit.revert(); qSplit.revert(); accent?.classList.remove("grad--split"); gsap.set(extras, { clearProps: "all" }); },
  })
    .to(tSplit.words, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.15, ease: "expo.out", stagger: 0.1 }, 0)
    .to(qSplit.lines, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", stagger: 0.1 }, 0.5)
    .to(extras, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1, ease: "expo.out", stagger: 0.12 }, 0.8);
}

document.fonts.ready.then(() => heroIntro());
document.getElementById("replay").addEventListener("click", () => heroIntro({ delay: 0 }));
