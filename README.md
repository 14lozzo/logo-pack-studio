# Logo Pack Studio V15 — Fase 1

## Instalar no GitHub Pages
Substituir o `index.html` da raiz do repositório pelo `index.html` deste pacote e fazer commit. Não é necessário instalar dependências.

## Implementado
- Navegação em quatro etapas: Brand Setup, Visual Assets, Brand Guidelines, Export Studio.
- Autosave local via IndexedDB (quando permitido pelo navegador).
- Guardar projeto manualmente, criar novo projeto, exportar projeto portátil `.json` e reabrir `.json` com recursos embebidos.
- Pré-visualização navegável das 20 páginas existentes.
- Os três botões de exportação herdados da V14 (PNG, PDF 20 páginas, ZIP) foram preservados.

## Ainda não implementado
- Dois seletores de cor com duas derivações Golden Angle (Fase 2).
- Três famílias tipográficas independentes e aplicação garantida no PDF (Fase 2/3).
- Editor de campos individuais das 20 páginas (Fase 3).
- Smart Templates e catálogo de mockups (Fase 4).

## Limitações
- A recuperação local só funciona no mesmo navegador/dispositivo e pode falhar se o armazenamento for limpo ou bloqueado. Exportar projeto JSON regularmente.
- O ficheiro de projeto JSON inclui os recursos em base64; poderá ser grande.
- As exportações preservadas continuam com as limitações técnicas da V14 (PDF rasterizado, por exemplo).
- Verificação de sintaxe JS efetuada. Teste automático em navegador Chromium bloqueado por política do ambiente de execução; testar manualmente no GitHub Pages antes de usar em trabalhos de cliente.
