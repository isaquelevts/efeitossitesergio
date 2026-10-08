# 06 · Card com brilho subindo da base

Inspirado no card da Reflect Academy, em azul. Camadas dentro de `.card-fx`:

- `card-fx__glow`: gradiente que sobe da base (branco → azul-claro → azul → transparente);
- `card-fx__sides`: `inset box-shadow` nas laterais, mascarado para só aparecer embaixo (o formato de "U");
- `card-fx__sweep`: uma linha de luz de 2px que varre a borda de cima uma vez.

`overflow: hidden` + `isolation: isolate` no card mantêm tudo dentro dos cantos arredondados.
