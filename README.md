# Logo Pack Studio V8 — White-label A4

## Instalação
Publica todos os ficheiros desta pasta na raiz do repositório GitHub Pages (não a pasta inteira). Mantém `app.js`, `pdf-local.js` e `jszip.min.js` ao lado de `index.html`.

## Alterações
- Manual A4 vertical com 20 páginas baseado na organização do modelo white-label fornecido pelo utilizador.
- Pré-visualização das 20 páginas dentro da própria aplicação.
- Gerador PDF local e autónomo (`pdf-local.js`) que converte as páginas para PDF A4 vertical.
- ZIP criado por JSZip incluído localmente.
- Auto Generate / Customize, cor sugerida, upload de logótipo, símbolo e fotografias.
- Cache antiga do Service Worker removida no carregamento.

## Limitações
- PDF é rasterizado (páginas em imagem JPEG), não um ficheiro vetorial editável.
- Textos estratégicos, medidas mínimas, tipografia, cores CMYK e aprovações requerem validação humana.
- SVG só é incluído quando o ficheiro original é SVG.
- Para recoloração monocromática, usar logótipo com fundo transparente.
- As aplicações são composições planas, não mockups fotográficos realistas.

## Testes
Foi verificada a sintaxe JS (`node --check`) e o pacote ZIP. O browser Chromium do ambiente de execução bloqueou navegação local e localhost, pelo que a exportação ainda requer teste no dispositivo.
