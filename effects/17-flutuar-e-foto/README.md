# 17 · Objeto flutuando + foto revelada por recorte

- **Flutuar**: duas timelines `sine.inOut` com `yoyo` e durações diferentes (3.4s e 5.1s) — nunca repete igual. Só roda enquanto está na tela (`onToggle`).
- **Entrada do objeto**: chega girado (`-14°`), pequeno (`.84`) e desfocado, e assenta com a curva `helios`.
- **Foto**: `clip-path: inset(100% 0 0 0 round 28px)` → `inset(0 …)` com `expo.inOut`, zoom de saída `1.22 → 1`, cartão depois e parallax `±4.5%`.
