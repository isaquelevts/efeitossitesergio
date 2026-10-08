# 02 · Text reveal (Helios)

Palavra por palavra (`data-reveal="words"`) ou bloco inteiro (`data-reveal="block"`), saindo de um blur.

| modo | movimento | blur | tempo |
|---|---|---|---|
| `words` | sobe `0.45em` | `10px → 0` | `0.9s`, `0.07s` entre palavras |
| `block` | sobe `28px` | `6px → 0` | `0.9s` |

- O degradê (`.grad`) dentro do título é aplicado **em cada palavra** depois do split (`.grad--split` em `shared/base.css`) —
  o degradê do elemento pai quebra quando os filhos se mexem.
- O estado inicial (invisível) é aplicado na hora: nada pisca antes do reveal.
- `clearProps: "filter"` no fim: nenhuma palavra fica com filtro parado (cada uma viraria uma camada pesada).
- Código: `FX.heliosReveal` e `FX.arm` em `shared/fx-core.js`.
