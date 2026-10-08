# 12 · Transição "tela no meio"

A hero fica parada e a próxima seção abre como uma janela no meio dela (clip-path crescendo do centro).
O texto da próxima seção só entra quando a janela passa de ~45% aberta, centralizado na janela.

Leia os comentários de `effect.js`: eles explicam por que o clip-path é montado à mão e por que as medidas ficam em cache
(são as duas coisas que separam uma transição lisa de uma que trava).
