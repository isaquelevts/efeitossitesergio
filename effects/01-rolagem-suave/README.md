# 01 · Rolagem suave

Lenis + ScrollTrigger, configurado com `lerp: 0.09`.

**Por quê `lerp` e não `duration`?** Com `duration` + `easing: expo.out` cada rolada reinicia a curva e o primeiro
movimento sai "dando tranco". O `lerp` persegue o alvo continuamente — sem reiniciar nada.

**Como usar**
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
<script>
  const lenis = new Lenis({ lerp: 0.09 });
  lenis.on("scroll", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", () => lenis.resize());
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
</script>
```
Para o CSS do Lenis, veja `html.lenis` em `shared/base.css`.
