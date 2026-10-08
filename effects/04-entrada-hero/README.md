# 04 · Entrada do texto da hero

Título palavra por palavra (blur de 14px, sobe `0.6em`, `expo.out`), citação linha por linha, botão e preço com um leve "pop".

Dicas de ajuste (em `effect.js`):
- **intensidade**: o blur inicial (`14px`) e o `y` do título;
- **ritmo**: `stagger` das palavras (`0.1s`) e os deslocamentos `0.5` / `0.8` das outras partes;
- ao final o `SplitText` é revertido — nenhum `<span>` extra fica no DOM.

Usa o botão da demo `05-botao-brilho`.
