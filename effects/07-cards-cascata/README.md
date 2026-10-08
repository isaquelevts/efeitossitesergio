# 07 · Cards em cascata + luz que segue o mouse

- **Cascata**: `autoAlpha 0→1`, `y 70→0`, `scale .94→1`, `blur 8px→0`, `stagger .12`. A letra grande de cada card sobe `18%` e assenta depois.
- **Holofote**: um `radial-gradient` no `::before` posicionado por `--mx/--my`, atualizados no `pointermove` com `requestAnimationFrame`
  (no máximo uma escrita por quadro). Só liga em dispositivos com mouse (`hover: hover`).
