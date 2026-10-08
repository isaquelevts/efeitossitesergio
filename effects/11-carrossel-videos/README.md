# 11 · Carrossel infinito de vídeos do YouTube

- **Laço sem emenda**: a lista é clonada uma vez e a trilha anda `translateX(-50%)` (as margens ficam nos itens, não em `gap`, para as duas metades serem idênticas).
- **YouTube leve**: só a capa (`i.ytimg.com/vi/<ID>/hqdefault.jpg`) carrega; o `<iframe>` (`youtube-nocookie.com`) só entra no clique.
- **Como ligar um vídeo**: coloque o ID em `data-yt` de cada `<button class="voice">`.
- Pausa no hover e quando há vídeo tocando; com "reduzir movimento" vira uma faixa rolável.
