/* Transição "tela no meio": a hero fica parada (a seção toda fica fixada por 180% da altura da tela)
 * e a próxima seção é revelada por um clip-path que cresce do centro até a tela inteira.
 *
 * Detalhes que importam para ficar liso:
 *  - o clip-path é montado à mão a cada quadro a partir de um proxy {w, h, r} — interpolar a string de inset()
 *    quebra quando o navegador encurta os valores;
 *  - as medidas ficam em cache: ler offsetWidth/Height a cada quadro, logo depois de escrever o clip-path,
 *    força o navegador a recalcular o layout em todo frame;
 *  - a hero só mexe com transform/opacity (GPU);
 *  - o texto entra quando a janela passa de OPEN_AT (45%) e reverte se ela voltar a fechar. */
FX.smoothScroll();
const stack = document.querySelector(".stack"), hero = stack.querySelector(".hero"), next = stack.querySelector(".next");
const OPEN_AT = 0.45;

stack.classList.add("is-stacked");
const intro = FX.heliosReveal(next.querySelectorAll("[data-reveal]"));
let isOpen = false;

const win = { w: 0, h: 0, r: 22 };
let VW = 0, VH = 0, H = 0, lastClip = "";
const measure = () => { VW = next.offsetWidth; VH = innerHeight; H = next.offsetHeight; lastClip = ""; };

const applyClip = () => {
  const open = Math.min(win.w, win.h);
  if (open >= OPEN_AT && !isOpen) { isOpen = true; intro.play(); }
  if (open < OPEN_AT && isOpen) { isOpen = false; intro.reverse(); }

  let clip;
  if (win.w >= 0.999 && win.h >= 0.999) clip = "none";                    // aberta: libera a seção inteira
  else if (win.w <= 0.001) clip = "inset(50% 50% round 0px)";             // fechada
  else {
    const x = (VW * (1 - win.w)) / 2;
    const top = (VH * (1 - win.h)) / 2;
    const bottom = H - (top + VH * win.h);
    clip = `inset(${top.toFixed(1)}px ${x.toFixed(1)}px ${bottom.toFixed(1)}px ${x.toFixed(1)}px round ${win.r.toFixed(1)}px)`;
  }
  if (clip !== lastClip) { next.style.clipPath = clip; lastClip = clip; }  // só escreve se mudou
};
measure();
applyClip();

gsap.timeline({
  scrollTrigger: {
    trigger: stack, start: "top top", end: "+=180%", pin: true,
    anticipatePin: 1,                                  // evita o "pulo" ao prender/soltar
    scrub: 0.35, invalidateOnRefresh: true,
    onRefresh: () => { measure(); applyClip(); },
  },
})
  // 1 · respiro: só a hero recua um pouco — nada da próxima seção ainda
  .to(hero, { scale: 0.97, ease: "none", duration: 0.22, force3D: true }, 0)
  // 2 · a janela abre do centro e cresce até a tela inteira (só o recorte muda — barato)
  .to(win, { w: 1, h: 1, r: 0, ease: "power2.inOut", duration: 0.78, onUpdate: applyClip }, 0.22)
  .to(hero, { scale: 0.9, autoAlpha: 0.3, ease: "power1.in", duration: 0.78, force3D: true }, 0.22);
