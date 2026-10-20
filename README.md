# Logo Pack Studio V15 — Fase 1 (modular)

## Instalação no GitHub Pages

Carrega **todo o conteúdo desta pasta** para a raiz do repositório, mantendo as subpastas `css/` e `js/`. Não carregues apenas `index.html`.

- `index.html`: interface base e campos atuais.
- `css/base.css`: estilos do motor anterior.
- `css/v15.css`: interface e estilos da V15.
- `js/legacy-engine.js`: renderização e exportação PNG/PDF/ZIP preservadas.
- `js/app-v15.js`: navegação de 4 etapas, pré-visualização de páginas, autosave IndexedDB, importação/exportação de projetos.

## Manutenção

Para mudar o aspeto da exportação PDF, editar a função `paintPage` em `js/legacy-engine.js`. Para o PNG, editar `render` e as funções de desenho do board no mesmo ficheiro. Para cores da interface, editar `css/v15.css`. O motor antigo continua agrupado num ficheiro por compatibilidade, podendo ser subdividido na fase seguinte após testes de regressão.

## Atenção

O autosave guarda ficheiros no IndexedDB do navegador; para transportar entre dispositivos, usar **Exportar projeto** e **Abrir projeto**. Um projeto salvo em JSON pode ficar grande por incluir imagens e fontes. Não confundir o ficheiro JSON do projeto com o ZIP final de entrega.

## Testes recomendados

1. Abrir no GitHub Pages (não abrir como `file://`).
2. Confirmar 4 separadores e barra Project Manager.
3. Carregar SVG, símbolo e fotos, verificar pré-visualização.
4. Guardar e atualizar; exportar JSON e voltar a importar.
5. Testar as três exportações.
