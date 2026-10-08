# Efeitos GSAP — landing page do curso Big Bang

Todos os efeitos usados na landing page, **um por pasta**, cada um com demo funcionando, código comentado e um README curto.
Texto, card, transição, rolagem, loader, fundo.

> Feito com **GSAP 3.13** (ScrollTrigger, SplitText, CustomEase) e **Lenis**. Sem build, sem npm: HTML, CSS e JS puros.

## Como rodar

Abra a galeria com um servidor local qualquer (a mais simples, com Python):

```bash
python -m http.server 5530
# abra http://localhost:5530
```

Ou, no Windows, dê dois cliques em `iniciar-servidor.bat`. (As demos também abrem direto pelo arquivo, mas um servidor evita
qualquer restrição do navegador.)

## Os efeitos

| # | Pasta | Tipo | O que faz |
|---|---|---|---|
| 01 | [`01-rolagem-suave`](effects/01-rolagem-suave/) | Scroll | Lenis + ScrollTrigger com lerp 0.09 — sem o "tranco" do primeiro movimento. |
| 02 | [`02-text-reveal`](effects/02-text-reveal/) | Texto | Palavra por palavra ou em bloco, saindo de um blur. Reverte ao voltar. |
| 03 | [`03-text-scrub`](effects/03-text-scrub/) | Texto | Cada palavra acende na ordem de leitura, amarrada ao scroll (scrub). |
| 04 | [`04-entrada-hero`](effects/04-entrada-hero/) | Texto | Título com blur forte, citação linha por linha, botão com "pop". |
| 05 | [`05-botao-brilho`](effects/05-botao-brilho/) | Botão | CSS puro: fio de luz girando na borda, halo azul, seta que troca no hover. |
| 06 | [`06-card-brilho`](effects/06-card-brilho/) | Card | Estilo Reflect em azul: brilho em U, faixa de luz na borda e texto por cima. |
| 07 | [`07-cards-cascata`](effects/07-cards-cascata/) | Card | Cards saindo do blur em sequência e uma luz que segue o mouse. |
| 08 | [`08-card-bilhete`](effects/08-card-bilhete/) | Card | Borda com fio de luz girando (@property), picotes e preço que conta. |
| 09 | [`09-timeline`](effects/09-timeline/) | Lista | Sticky de verdade e um fio que acende os nós numerados com a rolagem. |
| 10 | [`10-faq-acordeao`](effects/10-faq-acordeao/) | Lista | Acessível, altura animada, uma aberta por vez, barra de luz. |
| 11 | [`11-carrossel-videos`](effects/11-carrossel-videos/) | Carrossel | Laço sem emenda em CSS, YouTube leve carregado só no clique. |
| 12 | [`12-transicao-tela-no-meio`](effects/12-transicao-tela-no-meio/) | Transição | A próxima seção abre como uma janela (clip-path) no meio da hero. |
| 13 | [`13-transicao-horizonte`](effects/13-transicao-horizonte/) | Transição | Do claro para o escuro: o horizonte de um planeta sobe e cobre a tela. |
| 14 | [`14-showreel-vertical`](effects/14-showreel-vertical/) | Scroll | A imagem cresce do centro, o texto sobe, cada gesto vai ao próximo tópico. |
| 15 | [`15-loader-foguete`](effects/15-loader-foguete/) | Loader | A chama do motor (SVG) é a máscara que revela a página. |
| 16 | [`16-fundo-espacial`](effects/16-fundo-espacial/) | Fundo | Estrelas, grade, feixes de luz e o horizonte de um planeta que respira. |
| 17 | [`17-flutuar-e-foto`](effects/17-flutuar-e-foto/) | Entrada | Objeto que entra girado e flutua; foto revelada por recorte com parallax. |

## Como cada pasta é organizada

```
effects/02-text-reveal/
├── index.html    ← demo (abra no navegador)
├── effect.css    ← só o CSS do efeito
├── effect.js     ← só o JS do efeito, comentado
└── README.md     ← o que é, parâmetros, como adaptar
shared/
├── fx-core.js    ← o "miolo": FX.smoothScroll, FX.heliosReveal, FX.arm
├── tokens.css    ← cores, tipos, curvas (troque aqui a identidade)
└── base.css      ← reset + utilitários das demos
assets/           ← imagens de demonstração
```

Para usar um efeito no seu projeto: copie `shared/` + a pasta do efeito, carregue as bibliotecas (veja abaixo),
e use o `index.html` da pasta como exemplo de marcação.

## Bibliotecas (via CDN, versões fixas)

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
```

## Princípios que aparecem em todos os efeitos

- **Estado inicial aplicado na hora** (`gsap.set`) — nada pisca antes do reveal.
- **`FX.arm`**: gatilho que se corrige sozinho; recarregar a página no meio ou usar âncora não deixa o efeito travado escondido.
- **Só `transform`, `opacity` e `clip-path`** nas animações pesadas; `clearProps: "filter"` ao terminar (filtro parado vira camada pesada).
- **Medidas em cache** nos efeitos de pin (ler layout a cada quadro é o que faz transição travar).
- **`prefers-reduced-motion`**: o loader, a rolagem suave e o showreel (que vira pilha estática) respeitam; nas demais demos
  os efeitos são de entrada e fáceis de desligar.

## Imagens e fonte

- As imagens em `assets/` são **de demonstração, geradas por IA**. Troque pelas suas.
- A fonte das demos é a **Geist** (Google Fonts, livre). No projeto original usei uma fonte licenciada, que **não** está aqui.

## Inspirações

O reveal de texto (curva e blur) vem do estudo da hero da **Helios Creative**; o card com brilho, da **Reflect Academy**;
o showreel vertical, de um site do showreel da **GSAP**. Os códigos aqui são implementações próprias.

## Licença

Código sob licença MIT (veja `LICENSE`). **GSAP** tem a sua própria licença (gratuita, inclusive os plugins, desde a 3.13 —
confira os termos para uso comercial em gsap.com/standard-license); **Lenis** é MIT.
