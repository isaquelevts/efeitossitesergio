/* Timeline: o fio liga o centro do 1º nó ao do último e se enche de luz na linha de 55% da tela;
 * cada nó acende (e o texto da linha clareia) quando o fio chega nele. A ponta do fio é um "cometinha". */
FX.smoothScroll();

const head = FX.heliosReveal(document.querySelectorAll(".tl__head [data-reveal]"));
FX.arm(document.querySelector(".tl__cols"), "top 70%", () => head.play(), () => head.reverse());

const list = document.querySelector(".tl__list"), rail = list.querySelector(".tl__rail");
const rows = [...list.querySelectorAll("[data-row]")];

// cada linha entra quando chega na tela
rows.forEach((row) => {
  const bits = row.querySelectorAll(".tl__n, .tl__name, .tl__desc");
  gsap.set(bits, { autoAlpha: 0, y: 18, filter: "blur(8px)" });
  const tl = gsap.timeline({ paused: true })
    .to(bits, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: FX.EASE, stagger: 0.08, clearProps: "filter" }, 0);
  FX.arm(row, "top 92%", () => tl.timeScale(1).play(), () => tl.timeScale(1.8).reverse());
});

// centro de cada nó, relativo ao topo da lista
const nodeYs = () => rows.map((r) => { const n = r.querySelector(".tl__n"); return r.offsetTop + n.offsetTop + n.offsetHeight / 2; });
const prog = { p: 0 };
let ys = nodeYs();
const apply = () => {
  const pos = ys[0] + prog.p * (ys[ys.length - 1] - ys[0]);
  rail.style.setProperty("--p", prog.p.toFixed(4));
  rail.classList.toggle("is-live", prog.p > 0.002 && prog.p < 0.998);
  rows.forEach((r, i) => r.classList.toggle("is-on", pos >= ys[i] - 1));
};
gsap.to(prog, {
  p: 1, ease: "none", onUpdate: apply,
  scrollTrigger: {
    trigger: list, scrub: 0.5, invalidateOnRefresh: true,
    start: () => {                                              // aproveita o refresh para medir e posicionar o fio
      ys = nodeYs();
      list.style.setProperty("--rail-bot", (list.offsetHeight - ys[ys.length - 1]) + "px");
      rail.style.setProperty("--rail-top", ys[0] + "px");
      return `top+=${ys[0]} 55%`;
    },
    end: () => `top+=${ys[ys.length - 1]} 55%`,
    onRefresh: apply,
  },
});
