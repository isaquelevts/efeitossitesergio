# 15 · Loader: a chama do foguete é a máscara

O foguete decola e a **chama do motor, um SVG usado como `<mask>`**, é o que revela a página.

- `cuspD()` desenha a **abertura** (ponta fina no bocal, laterais côncavas, base reta) — lisa, sem ondulação;
- `fireD()` desenha o **núcleo de fogo** azul, cujas "línguas" oscilam com o tempo;
- tudo é redesenhado a cada quadro a partir de um objeto `s` animado por tweens (`lift`, `ign`, `len`, `wide`, `core`);
- o path já vem em **pixels de tela** (sem `transform`), então a espessura do contorno e o blur do brilho não escalam;
- o loader só liga com JS e sem "reduzir movimento" e tem uma trava de segurança de 4s no `<head>`;
- ao terminar dispara o evento `loader:done` — é aí que se encaixa a entrada do texto da hero (`04-entrada-hero`).
