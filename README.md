# Logo Pack Studio — Auto Generate / Customize

Aplicação estática para GitHub Pages, Android e desktop.

## Publicação
Carrega os quatro ficheiros (`index.html`, `icon.svg`, `manifest.webmanifest`, `sw.js`) para a raiz do repositório GitHub e ativa Settings > Pages > Deploy from a branch > main / root.

## Utilização
1. Carrega **Original**, **Branco** e **Preto** (obrigatórios). O **Símbolo** é opcional.
2. Em **Auto Generate**, gera tudo com as definições predefinidas. Em **Customize**, escolhe formatos e conteúdos.
3. Descarrega o ZIP gerado no próprio dispositivo.

## Formatos e limitações
- PNG, JPG, WebP, ICO (favicon PNG-embedded), SVG (apenas quando a entrada é SVG), PDF (guia de 18 páginas).
- Os SVG originais são preservados. Imagens bitmap não são vetorizadas.
- JPG não suporta transparência. PNG/WebP mantêm transparência quando presente na origem.
- PDF é um manual de identidade visual; não é automaticamente um ficheiro de arte-final CMYK.
- Não exporta EPS nem CMYK certificado.
- JSZip e jsPDF são carregados por CDN e requerem internet na primeira utilização.
- Os ficheiros são processados no browser, sem upload para servidor.
