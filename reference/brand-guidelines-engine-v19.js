/* Logo Pack Studio - Brand Guidelines V19: unified renderer, 20 A4 pages. */
(function(){
'use strict';
const N=20, W19=900,H19=1273, M19=66;
const titles19=['Capa','Manifesto e essência','Conceito e construção','Sistema de identidade','Logótipo principal','Versões cromáticas','Símbolo e monograma','Área de proteção','Utilizações corretas e incorretas','Cores principais','Cores complementares','Sistema tipográfico','Hierarquia tipográfica','Patterns e elementos gráficos','Cartões e estacionário','Comunicação digital','Campanhas e publicidade','Fotografia e direção de arte','Brand Board','Créditos e entrega'];
const q19=id=>document.getElementById(id);
const val19=(id,f='')=>q19(id)?.value||f;
const color19=(id,f)=>/^#[\da-f]{6}$/i.test(val19(id))?val19(id):f;
const safe19=t=>String(t||'').trim();
const make19=(i,scale=1)=>{
 const c=document.createElement('canvas');c.width=Math.round(W19*scale);c.height=Math.round(H19*scale);
 const x=c.getContext('2d');x.scale(scale,scale);x.textBaseline='alphabetic';
 const A=color19('accent','#CE1738'),S=color19('second','#E9E1D5'),D='#202020',L='#FFFFFF',muted='#77716D';
 const B=safe19(val19('brand','NOVA MARCA')),T=safe19(val19('tagline','Identidade visual')),desc=safe19(val19('description',''));
 const support=[color19('golden','#A5A5A5'),color19('dark','#353535')];
 const fontTitle=window.__v16UploadedFonts?.display?.family||val19('v16-display','Georgia');
 const fontBody=window.__v16UploadedFonts?.body?.family||val19('v16-body','Arial');
 const font=(size=22,f=fontBody,weight='normal')=>`${weight} ${size}px "${f}", Arial, sans-serif`;
 const box=(px,py,w,h,col)=>{x.fillStyle=col;x.fillRect(px,py,w,h)};
 const text=(t,px,py,size=22,col=D,f=fontBody,weight='normal')=>{x.fillStyle=col;x.font=font(size,f,weight);x.textAlign='left';x.fillText(String(t||''),px,py)};
 const wrap=(t,px,py,width,size=22,col=D,f=fontBody,leading=1.45,max=9)=>{x.font=font(size,f);const words=String(t||'').split(/\s+/).filter(Boolean);let line='',lines=[];for(const w of words){const next=line?line+' '+w:w;if(x.measureText(next).width>width&&line){lines.push(line);line=w}else line=next}if(line)lines.push(line);lines.slice(0,max).forEach((line,j)=>text(line,px,py+j*size*leading,size,col,f));return Math.min(lines.length,max)*size*leading};
 const rule=(py)=>box(M19,py,W19-2*M19,1,'#D7D2CC');
 const panel=(px,py,w,h,col='#F5F2ED')=>{box(px,py,w,h,col)};
 const fit=(im,px,py,w,h,pad=24)=>{if(!im||!im.width||!im.height)return false;const sc=Math.min((w-pad*2)/im.width,(h-pad*2)/im.height);if(!(sc>0))return false;x.save();x.beginPath();x.rect(px,py,w,h);x.clip();x.drawImage(im,px+(w-im.width*sc)/2,py+(h-im.height*sc)/2,im.width*sc,im.height*sc);x.restore();return true};
 const logo19=(px,py,w,h,bg=S,im=logo)=>{panel(px,py,w,h,bg);if(!fit(im,px,py,w,h,Math.min(50,w*.12)))text('LOGÓTIPO NÃO CARREGADO',px+24,py+h/2,18,muted)};
 const image19=(im,px,py,w,h,bg='#EEE9E2')=>{panel(px,py,w,h,bg);if(!fit(im,px,py,w,h,10))text('Imagem não adicionada',px+20,py+h/2,18,muted)};
 const blockTitle=(name,caption)=>{text(name,M19,247,47,D,fontTitle);if(caption)wrap(caption,M19,292,765,18,muted,fontBody,1.5,3);rule(325)};
 const note=(s,py=1110)=>{rule(py-28);wrap(s,M19,py,W19-2*M19,17,muted,fontBody,1.45,3)};
 const swatch=(col,px,py,w,h,name)=>{panel(px,py,w,h,col);text(name,px,py+h+33,17,D,fontBody,'bold');text(col.toUpperCase(),px,py+h+58,16,muted)};
 const availablePhotos=Array.isArray(photos)?photos:[];
 const graphic=typeof graphicImgs!=='undefined'&&Array.isArray(graphicImgs)?graphicImgs:[];
 box(0,0,W19,H19,L);
 if(i===0){box(0,0,W19,H19,S);box(M19,78,62,8,A);text('VISUAL IDENTITY SYSTEM',M19,134,16,D,fontBody,'bold');logo19(M19,310,768,460,S);text(B.toUpperCase(),M19,864,59,D,fontTitle);wrap(T,M19,917,710,24,D,fontBody,1.3,3);rule(1120);text('BRAND GUIDELINES  /  20 PÁGINAS',M19,1161,16,D);text('01 / 20',756,1210,15,muted);return c}
 if(i===19){box(0,0,W19,H19,D);text('FIM DO GUIA',M19,145,16,S,fontBody,'bold');fit(symbol||logo,M19,260,768,480,50);text(B.toUpperCase(),M19,847,55,S,fontTitle);text('IDENTIDADE VISUAL',M19,903,18,S);box(M19,1012,768,1,'#777');wrap('Brand Guidelines geradas pelo Logo Pack Studio. Confirma os direitos de utilização dos recursos e revê os ficheiros antes da entrega.',M19,1064,740,18,S,fontBody,1.5,4);text('20 / 20',752,1210,15,S);return c}
 text('BRAND GUIDELINES',M19,75,15,A,fontBody,'bold');text(B.toUpperCase(),M19,104,19,D,fontTitle);text(String(i+1).padStart(2,'0')+'  /  20',757,75,15,muted);rule(126);
 switch(i){
 case 1:blockTitle('Essência da marca','Uma identidade construída para comunicar com clareza e consistência.');text(T,M19,445,48,A,fontTitle);wrap(desc||'Adiciona uma descrição da marca no Brand Setup para apresentar a sua essência, propósito e posicionamento.',M19,540,740,26,D,fontBody,1.6,12);note('Este texto utiliza os conteúdos definidos para o projeto. Não são criados valores ou afirmações fictícias.');break;
 case 2:blockTitle('Conceito e construção','A ideia visual que sustenta a identidade.');logo19(M19,365,768,470,S);wrap(desc||'Apresentação do conceito: adiciona uma descrição do projeto para contextualizar o logótipo.',M19,904,730,22,D,fontBody,1.5,6);break;
 case 3:blockTitle('Sistema de identidade','Elementos principais que formam o universo da marca.');logo19(M19,365,470,425,S);logo19(556,365,278,425,L,symbol);swatch(A,M19,850,170,140,'Principal');swatch(S,256,850,170,140,'Secundária');swatch(support[0],446,850,170,140,'Apoio 01');swatch(support[1],636,850,170,140,'Apoio 02');break;
 case 4:blockTitle('Logótipo principal','Versão prioritária para a comunicação institucional.');logo19(M19,350,768,645,S);note('Preservar sempre a proporção original do ficheiro. Não distorcer, recortar ou redesenhar a marca.');break;
 case 5:blockTitle('Versões cromáticas','A mesma identidade aplicada em fundos contrastantes.');logo19(M19,365,368,330,L);logo19(466,365,368,330,D);logo19(M19,735,368,330,S);logo19(466,735,368,330,A);note('As quatro apresentações mostram o ficheiro original sobre fundos diferentes. Versões monocromáticas só devem ser usadas após validação dos ficheiros próprios.',1160);break;
 case 6:blockTitle('Símbolo e monograma','Uma expressão compacta da identidade.');logo19(M19,355,768,610,S,symbol);text('SÍMBOLO',M19,1038,18,A,fontBody,'bold');wrap(symbol?'Ficheiro do símbolo original, apresentado sem alterações.':'Carrega o símbolo no Brand Setup para completar esta página.',M19,1080,730,20,D);break;
 case 7:blockTitle('Área de proteção','Preservar a legibilidade e a integridade da marca.');panel(M19,355,768,640,'#F5F2ED');x.save();x.strokeStyle=A;x.setLineDash([9,8]);x.lineWidth=2;x.strokeRect(160,455,580,420);x.restore();fit(logo,200,495,500,340,15);text('ZONA DE RESPIRO ILUSTRATIVA',M19,1040,16,A,fontBody,'bold');note('A grelha é uma referência visual, não uma medida técnica certificada. Define a margem mínima no manual final conforme a geometria do logótipo.');break;
 case 8:blockTitle('Utilizações da marca','Regras para proteger a consistência visual.');logo19(M19,360,365,355,S);logo19(469,360,365,355,L);text('SIM · Proporções originais',M19,752,19,D);text('SIM · Contraste suficiente',469,752,19,D);panel(M19,815,768,200,'#F7F5F2');wrap('EVITAR   Deformações · Rotações · Efeitos decorativos · Recolorações não aprovadas · Baixo contraste',M19+30,885,705,22,D,fontBody,1.6,5);break;
 case 9:blockTitle('Cores principais','As duas cores oficiais que definem a marca.');swatch(A,M19,370,365,540,'COR PRINCIPAL');swatch(S,469,370,365,540,'COR SECUNDÁRIA');note('Valores HEX definidos pelo projeto. Confirma os perfis de cor antes de produzir materiais impressos.');break;
 case 10:blockTitle('Cores complementares','Cores de apoio calculadas ou definidas manualmente.');swatch(support[0],M19,365,365,490,'APOIO 01');swatch(support[1],469,365,365,490,'APOIO 02');text('PALETA COMPLETA',M19,990,17,A,fontBody,'bold');[A,S,...support].forEach((col,j)=>box(M19+j*192,1015,192,78,col));break;
 case 11:blockTitle('Sistema tipográfico','As famílias tipográficas selecionadas para a identidade.');text('Aa',M19,550,205,D,fontTitle);text('H1  /  TÍTULOS',M19,610,17,A,fontBody,'bold');text(fontTitle,M19,649,20,muted);rule(720);text('Aa Bb Cc 0123456789',M19,832,54,D,fontBody);text('H2 / H3  /  TEXTO E APOIO',M19,886,17,A,fontBody,'bold');text(fontBody,M19,928,20,muted);note('As fontes carregadas no Typography Studio são aplicadas à composição quando disponíveis.');break;
 case 12:blockTitle('Hierarquia tipográfica','Escalas e pesos para aplicações consistentes.');text(B.toUpperCase(),M19,447,61,A,fontTitle);text('H1  /  IDENTIDADE',M19,487,16,muted);rule(534);text('Comunicação com personalidade',M19,623,39,D,fontTitle);text('H2  /  TÍTULO DE SECÇÃO',M19,667,16,muted);rule(711);wrap(desc||'Texto de apoio para exemplificar a legibilidade, a composição e o ritmo entre diferentes níveis de informação.',M19,779,740,24,D,fontBody,1.5,7);text('H3  /  CORPO DE TEXTO',M19,1000,16,muted);break;
 case 13:blockTitle('Patterns e elementos gráficos','Motivos derivados do símbolo ou importados para o projeto.');{const p=q19('v18-pattern-preview')||q19('v16-pattern-canvas');if(p&&p.width)image19(p,M19,360,768,540,S);else image19(graphic[0],M19,360,768,540,S);image19(graphic[0]||symbol,M19,932,365,190,L);image19(graphic[1]||symbol,469,932,365,190,S)}break;
 case 14:blockTitle('Cartões e estacionário','Aplicações reais fornecidas pelo projeto.');image19(availablePhotos[0],M19,355,768,525,S);image19(availablePhotos[1],M19,910,365,225,L);image19(availablePhotos[2],469,910,365,225,L);break;
 case 15:blockTitle('Comunicação digital','Consistência entre formatos e plataformas.');image19(availablePhotos[0],M19,355,365,655,S);image19(availablePhotos[1],469,355,365,655,L);note('Adiciona peças reais do projeto para substituir os espaços sem imagem.');break;
 case 16:blockTitle('Campanhas e publicidade','Expressão visual em peças de comunicação.');image19(availablePhotos[2],M19,355,768,465,S);image19(availablePhotos[3],M19,845,365,260,L);image19(availablePhotos[4],469,845,365,260,S);break;
 case 17:blockTitle('Fotografia e direção de arte','Uma linguagem fotográfica coerente com a marca.');image19(availablePhotos[0],M19,355,768,470,S);image19(availablePhotos[1],M19,852,365,260,L);image19(availablePhotos[2],469,852,365,260,L);break;
 case 18:blockTitle('Brand Board','Síntese visual do sistema de identidade.');{const b=q19('board');if(b&&b.width)image19(b,M19,360,768,580,S);else logo19(M19,360,768,580,S);[A,S,...support].forEach((col,j)=>box(M19+j*192,965,192,105,col));}break;
 }
 rule(1200);text('IDENTIDADE VISUAL  /  '+B.toUpperCase(),M19,1230,13,muted);text(String(i+1).padStart(2,'0')+' / 20',772,1230,13,muted);return c;
};
paintPage=make19;
previewGuide=async function(){const target=q19('guide-thumbs');if(!target)return;target.replaceChildren();for(let i=0;i<N;i++){const item=document.createElement('div');item.style.cssText='min-width:155px;max-width:230px';const cv=paintPage(i,.22);cv.style.cssText='width:100%;height:auto;display:block;border:1px solid #ddd';const cap=document.createElement('small');cap.textContent=String(i+1).padStart(2,'0')+' · '+titles19[i];item.append(cv,cap);target.appendChild(item)}target.style.cssText+=';display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:14px;';};
guidePdf=async function(){if(document.fonts?.ready)await document.fonts.ready;const pages=[];for(let i=0;i<N;i++){status('A compor Brand Guidelines: '+(i+1)+'/20');await new Promise(r=>setTimeout(r,0));const c=paintPage(i,1.6);const b=await blobCanvas(c,'image/jpeg',.93);pages.push({bytes:await bytes(b),w:c.width,h:c.height});c.width=c.height=1}return pdfPages(pages)};
const button=q19('refreshGuide');if(button)button.onclick=()=>previewGuide().catch(e=>status(e.message));
window.__brandGuidelinesEngineVersion='19.0';
setTimeout(()=>previewGuide().catch(console.warn),500);
})();
