/* Cada frase acende palavra por palavra, amarrada à rolagem (scrub) —
 * as palavras partem de opacity .16 e vão a 1 em sequência enquanto a frase cruza a tela. */
FX.smoothScroll();
document.querySelectorAll(".scrub-item").forEach((li) => {
  const split = SplitText.create(li.querySelector(".scrub-text"), { type: "words", wordsClass: "wd" });
  gsap.set(split.words, { opacity: 0.16 });
  gsap.to(split.words, {
    opacity: 1, ease: "none", stagger: 0.12,
    scrollTrigger: { trigger: li, start: "top 80%", end: "bottom 56%", scrub: 0.4 },
  });
  // quando a frase chega: a etiqueta acende e o fio de baixo ganha luz
  ScrollTrigger.create({
    trigger: li, start: "top 72%",
    onEnter: () => li.classList.add("is-on"),
    onLeaveBack: () => li.classList.remove("is-on"),
    onRefresh: (self) => li.classList.toggle("is-on", self.scroll() >= self.start),
  });
});
