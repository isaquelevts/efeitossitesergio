# 08 · Card em formato de bilhete

- **Borda de luz girando**: `conic-gradient(from var(--spin), …)` num pseudo-elemento mascarado (só a borda de 1px aparece);
  `--spin` é uma `@property` do tipo `<angle>` animada de `0` a `360deg`.
- **Picotes**: dois círculos na cor do fundo cortam a divisória tracejada.
- **Preço**: degradê branco → azul-claro com `background-clip: text`; o número conta de 0 ao valor (`data-count`).
- No tablet/celular o bilhete vira vertical e os picotes vão para as laterais.
