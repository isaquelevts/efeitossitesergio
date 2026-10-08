# 09 · Título fixo + timeline que acende

- **Título fixo** com `position: sticky` — precisa de `overflow: clip` (nunca `hidden`) nos ancestrais, e o título e a lista num wrapper
  só deles: o sticky para onde o pai acaba.
- **Fio**: `scaleY(var(--p))` (barato, só `transform`); `--p` é escrito por um `scrub` do ScrollTrigger.
- **Nós**: o fio acende cada nó quando o alcança (`.is-on`): borda, brilho, número branco e um anel que se abre uma vez (`@keyframes tl-ping`).
- **Cometa**: um ponto brilhante na ponta (`top: calc(var(--p) * 100%)`), visível só enquanto o fio está andando.
