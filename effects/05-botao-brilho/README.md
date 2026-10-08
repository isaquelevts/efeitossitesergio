# 05 · Botão com brilho girando

**CSS puro** — não precisa de JavaScript.

- `btn__ring`: o anel da borda (`rgba(255,255,255,.19)`);
- `btn__shine`: uma faixa de luz de 20×180px com `blur(10px)` que **gira em volta do centro** (`transform-origin: 50% 100%`) e acende o anel;
- `btn__fill`: o preenchimento, inset de `1.5px` — é o que deixa o anel aparecer;
- `btn__chip`: círculo com duas setas; ao passar o mouse a atual sai pela diagonal e a próxima entra do lado oposto;
- halo azul em volta (`box-shadow`) que cresce no hover.

As cores estão em `shared/tokens.css` (`--color-btn-*`). Há uma variação `btn--light` para fundos claros.
