# 13 · Transição claro → escuro (horizonte)

Seção clara fixada (`pin`) + um overlay com `radial-gradient(circle at 50% 100%, …)` cujo raio `--r` é animado.
O gradiente tem: miolo na cor da seção seguinte → borda azul-clara de ~1px → brilho azul que se dissolve.

Dica: `.light.has-eclipse { will-change: transform }` faz a seção virar camada própria **antes** de ser fixada
(sem engasgo no instante em que o pin começa).
