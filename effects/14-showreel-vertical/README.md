# 14 · Showreel vertical com rolagem que "encaixa"

Inspirado num site do showreel da GSAP: a seção fica fixada, o texto sobe na coluna da direita e, a cada tópico,
a imagem seguinte **cresce do centro** (clip-path) até cobrir o quadro, enquanto o texto continua subindo.
O fundo é a mesma imagem, **já desfocada em arquivo** (200px) com baixa opacidade, em crossfade com a da frente.

**A "travadinha"** (o encaixe): cada gesto da roda é interceptado no `virtualScroll` do Lenis e vira **um** movimento suave
até o tópico seguinte — sem esperar a rolagem parar.
- gestos rápidos em sequência encadeiam um tópico cada;
- a inércia do trackpad que sobra é absorvida;
- perto da seção, um gesto só já leva ao primeiro/último tópico;
- nas pontas, a rolagem passa direto: a seção nunca prende você;
- teclado, barra de rolagem e toque usam um encaixe ao parar (fallback);
- a curva do encaixe (Hermite) **parte da velocidade em que a página já estava** e assenta com velocidade zero: nada de freada e arranque.

**Como adaptar**: uma `<figure class="pf" data-pf>` + `<img class="prog__bg" data-bg>` + `<article class="pt" data-pt>` por tópico, na mesma ordem.
No celular (ou com "reduzir movimento") vira uma pilha vertical com a imagem dentro de cada tópico.
