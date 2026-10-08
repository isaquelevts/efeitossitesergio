/* Feixes de luz: 16 fiozinhos com posição, altura e ritmo aleatórios, subindo em loop (CSS animation). */
document.querySelectorAll(".sbg__beams").forEach((beams) => {
  for (let i = 0; i < 16; i++) {
    const b = document.createElement("i");
    b.style.left = (Math.random() * 100).toFixed(2) + "%";
    b.style.height = (80 + Math.random() * 110).toFixed(0) + "px";
    b.style.animationDuration = (7.5 + Math.random() * 4.5).toFixed(2) + "s";
    b.style.animationDelay = (-Math.random() * 8).toFixed(2) + "s";
    beams.appendChild(b);
  }
});
