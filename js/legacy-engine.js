'use strict';const $=id=>document.getElementById(id),board=$('board'),ctx=board.getContext('2d'),W=1800,H=1200;let logo=null,symbol=null,photos=[],files={};const enc=new TextEncoder();function status(s){$('status').textContent=s}function step(n){document.querySelectorAll('.stage').forEach(e=>e.classList.toggle('hidden',+e.dataset.stage!==n));document.querySelectorAll('.step').forEach(e=>e.classList.toggle('active',+e.dataset.step===n))}document.querySelectorAll('.step').forEach(b=>b.onclick=()=>step(+b.dataset.step));$('next0').onclick=()=>step(1);$('next1').onclick=()=>step(2);$('back1').onclick=()=>step(0);$('back2').onclick=()=>step(1);$('extra').onchange=()=>{$('extra-fields').classList.toggle('hidden',!$('extra').checked);render()};function hexToHsl(hex){let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255,max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min,h=0,s=0,l=(max+min)/2;if(delta){s=delta/(1-Math.abs(2*l-1));switch(max){case r:h=((g-b)/delta)%6;break;case g:h=(b-r)/delta+2;break;default:h=(r-g)/delta+4}h=(h*60+360)%360}return [h,s,l]}function hslToHex(h,s,l){let c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2,r=0,g=0,b=0;if(h<60)[r,g,b]=[c,x,0];else if(h<120)[r,g,b]=[x,c,0];else if(h<180)[r,g,b]=[0,c,x];else if(h<240)[r,g,b]=[0,x,c];else if(h<300)[r,g,b]=[x,0,c];else [r,g,b]=[c,0,x];return '#'+[r,g,b].map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('').toUpperCase()}// Color Palette Studio V15: duas cores oficiais + duas cores de apoio.
const PALETTE_KEY='logo-pack-studio-palette-v15';
const paletteState={primary:'#CE1738',secondary:'#E9E1D5',method:'complementary',lightness:0,manualA:null,manualB:null};
function validHex(v){return /^#[0-9a-f]{6}$/i.test(String(v||''))}
function normalizedHex(v,fallback){return validHex(v)?v.toUpperCase():fallback}
function readPalette(){return; /* Projetos iniciam sempre com paleta limpa. */ try{const saved=JSON.parse(localStorage.getItem(PALETTE_KEY)||'null');if(saved&&typeof saved==='object'){paletteState.primary=normalizedHex(saved.primary,paletteState.primary);paletteState.secondary=normalizedHex(saved.secondary,paletteState.secondary);if(['complementary','analogous','triadic','golden'].includes(saved.method))paletteState.method=saved.method;paletteState.lightness=Math.max(-20,Math.min(20,Number(saved.lightness)||0));paletteState.manualA=validHex(saved.manualA)?saved.manualA.toUpperCase():null;paletteState.manualB=validHex(saved.manualB)?saved.manualB.toUpperCase():null;}}catch(e){console.warn('Palette restore:',e)}}
function storePalette(){/* Sem persistencia entre sessoes: abrir a app inicia novo projeto. */}
function paletteColors(){const [h,s,l]=hexToHsl(paletteState.primary),off={complementary:180,analogous:30,triadic:120,golden:137.5}[paletteState.method];const shift=paletteState.lightness/100;const c1=hslToHex((h+off)%360,Math.max(.4,s*.8),Math.max(.12,Math.min(.88,l+shift)));const off2=paletteState.method==='analogous'?-30:paletteState.method==='triadic'?240:paletteState.method==='golden'?275:205;const c2=hslToHex((h+off2+360)%360,Math.max(.35,s*.65),Math.max(.12,Math.min(.88,l+.14+shift)));return [paletteState.primary,paletteState.secondary,paletteState.manualA||c1,paletteState.manualB||c2]}
function updatePalette(){const [primary,secondary,aux1,aux2]=paletteColors();$('accent').value=primary;$('second').value=secondary;$('golden').value=aux1;$('dark').value=aux2;$('light').value=secondary;[['primary',primary],['support',secondary],['accent',aux1]].forEach(([id,c])=>{const sw=$(id+'-swatch'),hex=$(id+'-hex');if(sw)sw.style.background=c;if(hex)hex.textContent=c});syncPaletteStudio();}
function syncPaletteStudio(){const host=$('color-palette-studio');if(!host)return;const vals=paletteColors();['primary','secondary','supportA','supportB'].forEach((id,i)=>{const el=$('cps-'+id);if(el&&document.activeElement!==el)el.value=vals[i];const sw=$('cps-swatch-'+id);if(sw)sw.style.background=vals[i];const picker=$('cps-picker-'+id);if(picker&&document.activeElement!==picker)picker.value=vals[i]});const method=$('cps-method');if(method)method.value=paletteState.method;const slider=$('cps-lightness');if(slider)slider.value=paletteState.lightness;const value=$('cps-lightness-value');if(value)value.textContent=(paletteState.lightness>0?'+':'')+paletteState.lightness+'%';}
function refreshPalette(){updatePalette();storePalette();render();if(typeof previewGuide==='function')previewGuide().catch(console.warn);document.dispatchEvent(new Event('change',{bubbles:false}));}
function installPaletteStudio(){if($('color-palette-studio'))return;const target=$('accent');if(!target)return;const container=document.createElement('section');container.id='color-palette-studio';container.style.cssText='margin:18px 0;padding:20px;border:1px solid #d9d9d9;border-radius:16px;background:#fff;color:#222;max-width:100%;box-sizing:border-box';container.innerHTML=`<h3 style="margin:0 0 6px;font:700 21px Arial,sans-serif">Color Palette Studio</h3><p style="font:13px Arial,sans-serif;opacity:.75;margin:0 0 18px">Duas cores oficiais + duas cores de apoio. As cores originais dos ficheiros SVG/PNG nunca são alteradas.</p><div id="cps-fields" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:12px"></div><div style="display:flex;flex-wrap:wrap;gap:15px;margin-top:16px;align-items:center"><label style="font:13px Arial,sans-serif">Harmonia <select id="cps-method" style="display:block;margin-top:6px;padding:9px;border:1px solid #bbb;border-radius:7px"><option value="complementary">Complementar · 180°</option><option value="analogous">Análoga · ±30°</option><option value="triadic">Triádica · 120°</option><option value="golden">Ângulo dourado · 137,5°</option></select></label><label style="font:13px Arial,sans-serif;flex:1;min-width:160px">Luminosidade <strong id="cps-lightness-value">0%</strong><input id="cps-lightness" type="range" min="-20" max="20" step="5" value="0" style="display:block;width:100%;margin-top:10px"></label><button id="cps-reset" type="button" style="padding:10px;border:1px solid #bbb;border-radius:7px;background:#fafafa;cursor:pointer">Repor cores de apoio</button></div><p style="font:12px Arial,sans-serif;opacity:.7;margin:12px 0 0">As cores de apoio podem ser editadas manualmente. Mudar a harmonia ou luminosidade volta a gerá-las.</p>`;
const fields=container.querySelector('#cps-fields');
[['primary','Principal · oficial'],['secondary','Secundária · oficial'],['supportA','Apoio 1 · editável'],['supportB','Apoio 2 · editável']].forEach(([id,label])=>{
 const wrap=document.createElement('label');wrap.style.cssText='font:13px Arial,sans-serif;display:block;min-width:0';
 const cap=document.createElement('span');cap.textContent=label;
 const picker=document.createElement('input');picker.type='color';picker.id='cps-picker-'+id;
 picker.title='Escolher cor na paleta visual';picker.setAttribute('aria-label','Escolher '+label);
 picker.style.cssText='display:block;width:100%;height:58px;cursor:pointer;border:1px solid #ddd;border-radius:8px;padding:2px;background:#fff;margin:7px 0';
 const input=document.createElement('input');input.id='cps-'+id;input.type='text';input.maxLength=7;input.placeholder='#RRGGBB';input.style.cssText='width:100%;padding:9px;box-sizing:border-box;border:1px solid #bbb;border-radius:7px;font:14px monospace';
 const apply=v=>{if(!validHex(v)){syncPaletteStudio();return;}const val=v.toUpperCase();if(id==='primary')paletteState.primary=val;else if(id==='secondary')paletteState.secondary=val;else if(id==='supportA')paletteState.manualA=val;else paletteState.manualB=val;refreshPalette();};
 picker.addEventListener('input',()=>apply(picker.value));input.addEventListener('change',()=>apply(input.value));
 wrap.append(cap,picker,input);fields.appendChild(wrap);
});
container.querySelector('#cps-method').addEventListener('change',e=>{paletteState.method=e.target.value;paletteState.manualA=null;paletteState.manualB=null;refreshPalette()});container.querySelector('#cps-lightness').addEventListener('input',e=>{paletteState.lightness=Number(e.target.value);paletteState.manualA=null;paletteState.manualB=null;refreshPalette()});container.querySelector('#cps-reset').addEventListener('click',()=>{paletteState.manualA=null;paletteState.manualB=null;refreshPalette()});
const stage=document.querySelector('.stage[data-stage="0"]')||target.closest('.stage')||target.closest('.panel')||target.parentElement;stage.appendChild(container);syncPaletteStudio();}
readPalette();updatePalette();
$('accent').addEventListener('input',()=>{if(validHex($('accent').value)){paletteState.primary=$('accent').value.toUpperCase();refreshPalette()}});
$('second').addEventListener('input',()=>{if(validHex($('second').value)){paletteState.secondary=$('second').value.toUpperCase();refreshPalette()}});
const fill=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};function txt(t,x,y,size=26,color='#161616',font='Arial',weight='normal'){ctx.fillStyle=color;ctx.textAlign='left';ctx.font=`${weight} ${size}px ${font}`;ctx.fillText(t,x,y)}function frame(x,y,w,h,color){fill(x,y,w,h,color);ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip()}function end(){ctx.restore()}function cover(im,x,y,w,h){if(!im)return;const s=Math.max(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*s)/2,y+(h-im.height*s)/2,im.width*s,im.height*s)}function contain(im,x,y,w,h,p=0){if(!im)return;let s=Math.min((w-2*p)/im.width,(h-2*p)/im.height);ctx.drawImage(im,x+(w-im.width*s)/2,y+(h-im.height*s)/2,im.width*s,im.height*s)}function lines(t,maxW,size,font='Georgia',weight='normal',maxLines=3){ctx.font=`${weight} ${size}px ${font}`;let words=String(t).split(/\s+/),a=[],s='';for(let word of words){let n=s?s+' '+word:word;if(ctx.measureText(n).width>maxW&&s){a.push(s);s=word}else s=n}if(s)a.push(s);return a.slice(0,maxLines)}function fitted(t,x,y,w,h,size=58,color='#161616',font='Georgia',weight='normal',maxLines=3){let sz=size,ls;do{ls=lines(t,w,sz,font,weight,maxLines);if(ls.length*sz*1.08<=h)break;sz-=2}while(sz>14);ls.forEach((l,i)=>txt(l,x,y+(i+1)*sz*1.08,sz,color,font,weight))}function photo(n,x,y,w,h){frame(x,y,w,h,n%2?'#b7aba2':'#34302f');if(photos.length)cover(photos[n%photos.length],x,y,w,h);else{ctx.strokeStyle='#ffffff18';for(let i=-h;i<w+h;i+=35){ctx.beginPath();ctx.moveTo(x+i,y);ctx.lineTo(x+i+h,y+h);ctx.stroke()}}end()}function logoIn(x,y,w,h,dark=false){if(logo)contain(logo,x,y,w,h,14);else fitted($('brand').value,x+12,y+15,w-24,h-25,70,dark?'white':$('accent').value,'Georgia','bold',2)}function title(n,s,x,y){txt(n,x,y,15,$('accent').value,'Arial','bold');txt(s,x+36,y,15,'#888','Arial','bold')}function render(){let a=$('accent').value,d=$('dark').value,l=$('light').value,s=$('second').value,b=$('brand').value||'BRAND',tag=$('tagline').value;ctx.setTransform(board.width/W,0,0,board.height/H,0,0);ctx.clearRect(0,0,W,H);fill(0,0,W,H,l);const g=7; // fixed non-overlapping grid: x=0/600/1200, y=0/400/800
// tile 1 brand hero
frame(0,0,600-g,400-g,d);txt('01 / BRAND IDENTITY',28,36,15,'#ffffffa8','Arial','bold');logoIn(26,72,540,170,true);fitted(tag.toUpperCase(),30,285,500,66,23,'#fff','Arial','bold',2);end();
// tile 2 manifesto
frame(600,0,600-g,400-g,l);title('02','ABOUT / PRACTICE',628,37);fitted($('headline').value,628,74,520,205,81,a,'Georgia','bold',3);fitted($('description').value,628,310,510,55,21,d,'Arial','normal',2);end();
// tile 3 symbol
frame(1200,0,600,400-g,a);txt('03 / SIGNATURE MARK',1228,37,15,'#ffffffaa','Arial','bold');if(symbol||logo){contain(symbol||logo,1335,75,330,250,20)}else fitted(b,1260,140,480,170,95,'#fff','Georgia','bold',2);end();
// tile 4 photography + selected work
frame(0,400,600-g,400-g,'#fff');title('04','SELECTED WORK',28,436);fitted($('project').value,28,455,530,86,61,d,'Georgia','normal',2);photo(0,28,566,262,188);photo(1,302,566,262,188);end();
// tile 5 featured project
frame(600,400,600-g,400-g,'#fff');title('05','FEATURED PROJECT',628,436);photo(2,628,460,535,210);fitted(b+' / VISUAL IDENTITY',628,685,510,65,29,d,'Georgia','bold',2);end();
// tile 6 digital / mockups
frame(1200,400,600,400-g,l);title('06','DIGITAL EXPERIENCE',1228,436);photo(3,1228,462,255,295);photo(4,1494,462,277,295);end();
// tile 7 applications
frame(0,800,600-g,400,s);txt('07 / APPLICATIONS',28,837,15,'white','Arial','bold');photo(5,28,865,250,300);photo(6,289,865,275,300);end();
// tile 8 brand system
frame(600,800,600-g,400,'#fff');title('08','IDENTITY SYSTEM',628,837);fitted('Brand elements.',628,865,520,110,65,d,'Georgia','normal',2);logoIn(628,990,315,130);[a,d,l,s].forEach((c,i)=>{fill(953+i*52,1020,45,94,c)});end();
// tile 9 colors and real world
frame(1200,800,600,400,l);title('09','REAL WORLD',1228,837);fitted('Made to be seen.',1228,859,520,94,56,d,'Georgia','normal',2);photo(7,1228,986,544,140);[a,d,l,s].forEach((c,i)=>{fill(1228+i*137,1141,128,31,c)});end();}
async function loadImg(f){return new Promise((res,rej)=>{let u=URL.createObjectURL(f),i=new Image();i.onload=()=>{URL.revokeObjectURL(u);res(i)};i.onerror=()=>{URL.revokeObjectURL(u);rej(Error('Imagem inválida: '+f.name))};i.src=u})}for(let id of ['brand','tagline','accent','dark','light','second','headline','description','project','extraLogo','extraBg'])$(id).addEventListener('input',render);for(let id of ['logo','symbol'])$(id).onchange=async e=>{try{let f=e.target.files[0];files[id]=f;let im=f?await loadImg(f):null;if(id==='logo')logo=im;else symbol=im;render();status('Ficheiro carregado.')}catch(err){status(err.message)}};$('photos').onchange=async e=>{try{files.photos=Array.from(e.target.files).slice(0,8);photos=await Promise.all(files.photos.map(loadImg));render();status(photos.length+' fotografias carregadas.')}catch(err){status(err.message)}};
function blobCanvas(c,type='image/png',quality=.94){return new Promise((ok,fail)=>c.toBlob(b=>b?ok(b):fail(Error('Falha ao converter canvas')),type,quality))}async function boardBlob(type='image/png'){let w=Number($('resolution').value),h=w*2/3,oldW=board.width,oldH=board.height;try{board.width=w;board.height=h;render();return await blobCanvas(board,type)}finally{board.width=oldW;board.height=oldH;render()}}function save(blob,name){let u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),30000)}const bytes=async b=>new Uint8Array(await b.arrayBuffer());function concat(...parts){let n=parts.reduce((a,p)=>a+p.length,0),r=new Uint8Array(n),k=0;for(let p of parts){r.set(p,k);k+=p.length}return r}const ascii=s=>enc.encode(s);function pdfJpeg(jpg,w,h){let obj=[ascii('<< /Type /Catalog /Pages 2 0 R >>'),ascii('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'),ascii('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 900 600] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>'),concat(ascii(`<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`),jpg,ascii('\nendstream')),ascii('<< /Length 30 >>\nstream\nq 900 0 0 600 0 0 cm /Im0 Do Q\nendstream')];let out=[ascii('%PDF-1.4\n')],offset=[0],pos=out[0].length;obj.forEach((o,i)=>{offset.push(pos);let p=concat(ascii(`${i+1} 0 obj\n`),o,ascii('\nendobj\n'));out.push(p);pos+=p.length});let start=pos,refs=['xref\n0 6\n0000000000 65535 f \n'];for(let i=1;i<6;i++)refs.push(String(offset[i]).padStart(10,'0')+' 00000 n \n');out.push(ascii(refs.join('')+`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`));return new Blob(out,{type:'application/pdf'})}const u16=n=>new Uint8Array([n&255,(n>>>8)&255]),u32=n=>new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]);let table=Array.from({length:256},(_,i)=>{let c=i;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0});function crc(b){let c=0xffffffff;for(let v of b)c=table[(c^v)&255]^(c>>>8);return(c^0xffffffff)>>>0}function zip(entries){let local=[],central=[],pos=0;for(let [name,data] of entries){let n=ascii(name),crcVal=crc(data),hdr=concat(u32(0x04034b50),u16(20),u16(0x800),u16(0),u16(0),u16(0),u32(crcVal),u32(data.length),u32(data.length),u16(n.length),u16(0),n,data);local.push(hdr);central.push(concat(u32(0x02014b50),u16(20),u16(20),u16(0x800),u16(0),u16(0),u16(0),u32(crcVal),u32(data.length),u32(data.length),u16(n.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(pos),n));pos+=hdr.length}let cd=concat(...central);return new Blob([...local,cd,u32(0x06054b50),u16(0),u16(0),u16(entries.length),u16(entries.length),u32(cd.length),u32(pos),u16(0)],{type:'application/zip'})}
// Mask only nontransparent pixels. Reject opaque files to prevent black/white squares.
async function mono(im,color,bg,size=1024){let cv=document.createElement('canvas');cv.width=cv.height=size;let x=cv.getContext('2d',{willReadFrequently:true}),s=Math.min(size*.8/im.width,size*.8/im.height),w=im.width*s,h=im.height*s;x.drawImage(im,(size-w)/2,(size-h)/2,w,h);let pixels=x.getImageData(0,0,size,size),d=pixels.data,corner=0;for(let p of [3,(size-1)*4,(size*(size-1))*4+3,(size*size-1)*4+3])corner+=d[p];if(corner/4>245)throw Error('O logótipo tem fundo opaco. Carrega SVG/PNG transparente para criar versões monocromáticas.');x.globalCompositeOperation='source-in';x.fillStyle=color;x.fillRect(0,0,size,size);x.globalCompositeOperation='destination-over';x.fillStyle=bg;x.fillRect(0,0,size,size);x.globalCompositeOperation='source-over';return bytes(await blobCanvas(cv))}function slug(){return ($('brand').value||'brand').normalize('NFKD').replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')||'brand'}let brandFontName='Arial', graphicImgs=[],graphicFiles=[];
$('brandFont').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{const url=URL.createObjectURL(f);brandFontName='BrandUploaded';const face=new FontFace(brandFontName,`url(${url})`);await face.load();document.fonts.add(face);files.font=f;status('Tipografia carregada: '+f.name);await previewGuide()}catch(err){status('Não foi possível carregar a fonte: '+err.message)}});
$('graphics').addEventListener('change',async e=>{graphicFiles=Array.from(e.target.files).slice(0,4);try{graphicImgs=await Promise.all(graphicFiles.map(loadImg));await previewGuide()}catch(err){status('Erro ao carregar elemento gráfico: '+err.message)}});
const pageTitles=['Capa','Índice','A marca','Personalidade','Identidade visual','Logótipo principal','Versões oficiais','Área de proteção','Dimensão mínima','Usos incorretos','Paleta cromática','Tipografia','Hierarquia tipográfica','Elementos gráficos','Padrões','Direção fotográfica','Redes sociais','Aplicações da marca','Ficheiros e formatos','Checklist de entrega'];
function rgb(hex){return [parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)]}
function contrast(hex){let v=rgb(hex).map(n=>{n/=255;return n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)});return .2126*v[0]+.7152*v[1]+.0722*v[2]>.38?'#191919':'#ffffff'}
function paintPage(index,scale=1){let c=document.createElement('canvas');c.width=Math.round(900*scale);c.height=Math.round(1273*scale);let x=c.getContext('2d');x.scale(scale,scale);const A=$('accent').value,D=$('dark').value,L=$('light').value,S=$('second').value,G=$('golden').value,B=$('brand').value||'Brand',T=$('tagline').value||'Identidade visual';const P=[A,S,G,D,L];
function rect(px,py,w,h,color){x.fillStyle=color;x.fillRect(px,py,w,h)}function text(t,px,py,size=24,color=D,font='Arial',weight='normal'){x.fillStyle=color;x.font=`${weight} ${size}px ${font}`;x.textBaseline='alphabetic';x.fillText(String(t),px,py)}function line(t,px,py,maxw,size=24,color=D,font='Arial',weight='normal',limit=4){x.font=`${weight} ${size}px ${font}`;let words=String(t).split(/\s+/),a=[],q='';for(let word of words){let n=q?q+' '+word:word;if(x.measureText(n).width>maxw&&q){a.push(q);q=word}else q=n}if(q)a.push(q);a.slice(0,limit).forEach((v,i)=>text(v,px,py+i*size*1.34,size,color,font,weight))}
function img(im,px,py,w,h,mode='contain'){if(!im)return;let ratio=mode==='cover'?Math.max(w/im.width,h/im.height):Math.min(w/im.width,h/im.height);let iw=im.width*ratio,ih=im.height*ratio;x.save();x.beginPath();x.rect(px,py,w,h);x.clip();x.drawImage(im,px+(w-iw)/2,py+(h-ih)/2,iw,ih);x.restore()}
function logoBox(px,py,w,h,bg='#ffffff',color=A){rect(px,py,w,h,bg);if(logo)img(logo,px+25,py+20,w-50,h-40);else line(B,px+35,py+h/2,w-70,62,color,'Georgia','bold',2)}
function monoBox(px,py,w,h,bg,ink){rect(px,py,w,h,bg);if(!logo){line(B,px+24,py+h/2,w-48,46,ink,'Georgia','bold',2);return}let m=document.createElement('canvas');m.width=Math.round(w);m.height=Math.round(h);let z=m.getContext('2d'),r=Math.min((w-45)/logo.width,(h-45)/logo.height),iw=logo.width*r,ih=logo.height*r;z.drawImage(logo,(w-iw)/2,(h-ih)/2,iw,ih);z.globalCompositeOperation='source-in';z.fillStyle=ink;z.fillRect(0,0,w,h);x.drawImage(m,px,py)}function pic(n,px,py,w,h){rect(px,py,w,h,S);if(photos.length)img(photos[n%photos.length],px,py,w,h,'cover');else{rect(px+20,py+20,w-40,h-40,L);text('FOTOGRAFIA OPCIONAL',px+35,py+h/2,19,D)}}
rect(0,0,900,1273,'#fff');rect(0,0,900,12,A);text('LOGO PACK STUDIO  /  '+B.toUpperCase(),55,57,15,D,'Arial','bold');text(String(index+1).padStart(2,'0')+' / 20',783,57,14,A,'Arial','bold');rect(55,75,790,1,'#dedad6');if(index===0){rect(0,90,900,820,D);logoBox(90,180,720,340,D,'#fff');line(B,90,620,720,78,'#fff','Georgia','bold',2);line(T.toUpperCase(),90,704,720,25,'#fff','Arial','normal',3);rect(55,1000,790,11,A);text('BRAND GUIDELINES',55,1058,32,D,'Arial','bold');text('IDENTIDADE VISUAL  /  2026',55,1100,18,S);}
else{ text(String(index+1).padStart(2,'0')+'  /  '+pageTitles[index].toUpperCase(),55,135,17,A,'Arial','bold');line(pageTitles[index],55,212,790,53,D,'Georgia','bold',2);rect(55,235,790,2,'#dedad6');
switch(index){
case 1:pageTitles.slice(2).forEach((t,j)=>{let yy=305+j*43;text(String(j+3).padStart(2,'0'),75,yy,18,A,'Arial','bold');text(t,135,yy,22,D)});break;
case 2:logoBox(55,300,790,390,L);line(T,55,760,750,36,D,'Georgia','normal',3);line($('description').value,55,840,750,23,D,'Arial','normal',5);break;
case 3:['ESSÊNCIA','PERSONALIDADE','EXPRESSÃO'].forEach((v,j)=>{let y=315+j*225;rect(55,y,790,190,j===1?D:L);text(v,83,y+55,18,j===1?'#fff':A,'Arial','bold');line([T,$('description').value,$('headline').value][j],83,y+108,720,30,j===1?'#fff':D,'Georgia','normal',3)});break;
case 4:logoBox(55,290,790,510,L);P.forEach((co,j)=>rect(55+j*158,830,158,140,co));break;
case 5:logoBox(55,310,790,600,L);text('Versão oficial da marca',55,975,25,D);break;
case 6:monoBox(55,310,385,350,'#ffffff','#000000');monoBox(460,310,385,350,'#111111','#ffffff');logoBox(55,690,790,300,A);text('Original · Preto · Branco · Principal',55,1040,24,D);break;
case 7:rect(55,305,790,620,L);x.strokeStyle=A;x.lineWidth=3;x.strokeRect(135,400,630,430);logoBox(175,440,550,350,'#fff');text('Margem mínima sugerida: 10% da dimensão maior',55,990,23,D);break;
case 8:[1,.65,.4].forEach((v,j)=>{logoBox(55,290+j*235,790*v,205,L);text(Math.round(v*100)+'%',55+790*v+12,390+j*235,22,A)});break;
case 9:{const labels=['Não esticar','Não rodar','Não alterar cores','Não aplicar efeitos','Não alterar espaçamentos','Evitar baixo contraste'];for(let j=0;j<6;j++){let col=j%2,row=Math.floor(j/2),px=55+col*405,py=300+row*275;rect(px,py,385,215,j===5?S:L);x.save();if(j===1){x.translate(px+192,py+105);x.rotate(.18);x.translate(-px-192,-py-105)}if(j===0){x.translate(px,py);x.scale(1.2,.8);x.translate(-px,-py)}logoBox(px+18,py+20,349,170,j===5?S:L,j===2?G:A);x.restore();text('× '+labels[j],px,py+245,20,A,'Arial','bold')}}break;
case 10:P.forEach((co,j)=>{let py=305+j*165;rect(55,py,230,140,co);text(['PRINCIPAL','SECUNDÁRIA','APOIO 1','APOIO 2','FUNDO'][j],320,py+52,25,D,'Arial','bold');text(co.toUpperCase(),320,py+90,22,A)});break;
case 11:rect(55,300,790,355,D);text('Aa Bb Cc',80,540,115,'#fff',brandFontName,'normal');text('Fonte definida: '+(files.font?files.font.name:'Arial (padrão)'),55,720,22,D);text('ABCDEFGHIJKLMNOPQRSTUVWXYZ',55,790,30,D,brandFontName);text('abcdefghijklmnopqrstuvwxyz 0123456789',55,850,25,D,brandFontName);break;
case 12:['Título principal','Cabeçalho','Subtítulo','Texto de corpo e legendas'].forEach((v,j)=>text(v,55,370+j*185,[56,40,30,22][j],j===0?A:D,brandFontName));break;
case 13:for(let j=0;j<4;j++){let px=55+(j%2)*405,py=310+Math.floor(j/2)*380;rect(px,py,385,345,P[j]);if(graphicImgs.length)img(graphicImgs[j%graphicImgs.length],px+50,py+35,285,270);else if(symbol||logo)img(symbol||logo,px+85,py+75,215,195);text(['FORMAS','CONTRASTE','MOTIVOS','PADRÕES'][j],px+12,py+332,16,contrast(P[j]),'Arial','bold')}break;
case 14:for(let j=0;j<4;j++){let px=55+(j%2)*405,py=310+Math.floor(j/2)*380;rect(px,py,385,345,j%2?L:D);for(let yy=py+25;yy<py+345;yy+=125)for(let xx=px+25;xx<px+385;xx+=125){if(symbol||logo)img(symbol||logo,xx,yy,92,92);else{rect(xx,yy,70,70,A)}}}break;
case 15:pic(0,55,310,790,450);pic(1,55,780,385,280);pic(2,460,780,385,280);break;
case 16:pic(0,55,310,385,520);pic(1,460,310,385,520);logoBox(55,860,790,190,L);break;
case 17:pic(2,55,310,790,360);pic(3,55,695,385,360);pic(4,460,695,385,360);break;
case 18:['Brand Board PNG','Brand Guidelines PDF','Logótipos originais','Versões monocromáticas','Favicons e ícones','Fotografias e gráficos','Paleta JSON + TXT'].forEach((v,j)=>{text('✓',65,330+j*95,28,A);text(v,120,330+j*95,26,D)});break;
case 19:['Confirmar ortografia e conteúdos','Validar cores e contraste','Rever proporções dos logótipos','Confirmar transparências','Verificar direitos das fotografias','Confirmar tipografia licenciada','Testar ficheiros antes da entrega'].forEach((v,j)=>{rect(62,303+j*103,25,25,'#fff');x.strokeStyle=A;x.strokeRect(62,303+j*103,25,25);text(v,105,327+j*103,22,D)});break;
}}
rect(55,1193,790,1,'#dedad6');text('BRAND GUIDELINES  /  '+B.toUpperCase(),55,1227,13,'#999','Arial','bold');text('A4  /  '+String(index+1).padStart(2,'0'),760,1227,13,'#999');return c}
function pdfPages(pages){let objs=[],pageRefs=[];objs.push(ascii('<< /Type /Catalog /Pages 2 0 R >>'));objs.push(null);for(let i=0;i<pages.length;i++){let pageNo=objs.length+1,imageNo=pageNo+1,contentNo=pageNo+2;pageRefs.push(pageNo+' 0 R');objs.push(ascii(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ${imageNo} 0 R >> >> /Contents ${contentNo} 0 R >>`));let b=pages[i].bytes;objs.push(concat(ascii(`<< /Type /XObject /Subtype /Image /Width ${pages[i].w} /Height ${pages[i].h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${b.length} >>\nstream\n`),b,ascii('\nendstream')));let str='q 595.28 0 0 841.89 0 0 cm /Im0 Do Q';objs.push(ascii(`<< /Length ${str.length} >>\nstream\n${str}\nendstream`))}objs[1]=ascii(`<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${pages.length} >>`);let out=[ascii('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n')],offset=[0],pos=out[0].length;for(let i=0;i<objs.length;i++){offset.push(pos);let b=concat(ascii(`${i+1} 0 obj\n`),objs[i],ascii('\nendobj\n'));out.push(b);pos+=b.length}let start=pos,refs=[`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`];for(let i=1;i<=objs.length;i++)refs.push(String(offset[i]).padStart(10,'0')+' 00000 n \n');out.push(ascii(refs.join('')+`trailer\n<< /Size ${objs.length+1} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`));return new Blob(out,{type:'application/pdf'})}
async function guidePdf(){let arr=[];for(let i=0;i<20;i++){status(`A gerar Brand Guidelines: página ${i+1}/20…`);await new Promise(r=>setTimeout(r,0));let c=paintPage(i,1.6),b=await blobCanvas(c,'image/jpeg',.88);arr.push({bytes:await bytes(b),w:c.width,h:c.height});c.width=c.height=1}return pdfPages(arr)}
async function previewGuide(){let target=$('guide-thumbs');target.innerHTML='';for(let i of [0,9,11]){let wrap=document.createElement('div'),cv=paintPage(i,.28);wrap.appendChild(cv);let label=document.createElement('small');label.textContent=(i+1)+' · '+pageTitles[i];wrap.appendChild(label);target.appendChild(wrap)}}
$('refreshGuide').onclick=()=>previewGuide().catch(e=>status(e.message));
async function logoRaster(im,kind,size=1024){let cv=document.createElement('canvas');cv.width=cv.height=size;let x=cv.getContext('2d');let sc=Math.min(size*.8/im.width,size*.8/im.height),w=im.width*sc,h=im.height*sc;x.drawImage(im,(size-w)/2,(size-h)/2,w,h);if(kind!=='original'){let data=x.getImageData(0,0,size,size).data,edge=[3,(size-1)*4+3,((size-1)*size)*4+3,(size*size-1)*4+3];if(edge.every(j=>data[j]>245))throw Error('O ficheiro do logótipo tem fundo opaco; as versões preta/branca precisam de transparência.');x.globalCompositeOperation='source-in';x.fillStyle=kind==='black'?'#000':kind==='white'?'#fff':$('accent').value;x.fillRect(0,0,size,size);x.globalCompositeOperation='source-over'}return cv}
async function exportPack(which){let button=$(which);button.disabled=true;try{if(!logo)throw Error('Carrega primeiro o logótipo original.');let name=slug();if(which==='png'){status('A gerar Brand Board PNG…');save(await boardBlob(),name+'-brand-board.png');status('Brand Board PNG gerado.');return}if(which==='pdf'){let pdf=await guidePdf();save(pdf,name+'-brand-guidelines-20p.pdf');status('Brand Guidelines PDF de 20 páginas gerado.');return}status('A preparar o Brand Pack…');let e=[],root=name+'/',add=async(n,b)=>e.push([root+n,await bytes(b)]);let boardPng=await boardBlob();await add('01_Brand_Board/brand-board.png',boardPng);let guide=await guidePdf();await add('02_Brand_Guidelines/brand-guidelines-20p.pdf',guide);let palette={brand:$('brand').value,primary:paletteState.primary,secondary:paletteState.secondary,supportA:paletteColors()[2],supportB:paletteColors()[3],method:paletteState.method,lightnessAdjustmentPercent:paletteState.lightness,formula:'HSL color harmonies; two official colors never auto-replaced',support:paletteState.secondary,accent:paletteColors()[2],dark:paletteColors()[3],light:paletteState.secondary};e.push([root+'03_Colors/palette.json',ascii(JSON.stringify(palette,null,2))]);e.push([root+'03_Colors/palette.txt',ascii(Object.entries(palette).map(([k,v])=>k+': '+v).join('\n'))]);for(let id of ['logo','symbol'])if(files[id])await add('04_Original_Assets/'+id+'-'+files[id].name,files[id]);if(files.font)await add('04_Original_Assets/font-'+files.font.name,files.font);if(window.__v16UploadedFonts){for(const [kind,entry] of Object.entries(window.__v16UploadedFonts)){if(entry?.file)await add('04_Original_Assets/font-'+kind+'-'+entry.file.name,entry.file)}}if(files.photos)for(let i=0;i<files.photos.length;i++)await add('05_Photography/'+String(i+1).padStart(2,'0')+'-'+files.photos[i].name,files.photos[i]);for(let i=0;i<graphicFiles.length;i++)await add('06_Graphic_Elements/'+graphicFiles[i].name,graphicFiles[i]);// V15: independent logo/symbol variants, consistent raster and vector outputs.
const secondary=$('second').value;
const primary=$('accent').value;
const [invHue,invSat,invLight]=hexToHsl(primary);
const inverse=hslToHex((invHue+180)%360,invSat,invLight);
const sizes=[16,24,32,48,64,128,180,192,256,512];
const variants=[
 ['original-transparent','original',null],
 ['black-transparent','black',null],
 ['white-transparent','white',null],
 ['black-on-white','black','#FFFFFF'],
 ['white-on-black','white','#000000'],
 ['original-on-secondary','original',secondary]
];
function drawVariant(im,kind,bg,size=1024,fit=.8){
 const cv=document.createElement('canvas');cv.width=cv.height=size;
 const c=cv.getContext('2d',{willReadFrequently:true});
 const k=Math.min(size*fit/im.width,size*fit/im.height),w=im.width*k,h=im.height*k;
 c.drawImage(im,(size-w)/2,(size-h)/2,w,h);
 if(kind!=='original'){
  const data=c.getImageData(0,0,size,size).data;
  const corners=[3,(size-1)*4+3,(size*(size-1))*4+3,(size*size-1)*4+3];
  if(corners.every(i=>data[i]>245))throw Error('Imagem sem transparencia: nao e possivel recolorir com fidelidade.');
  c.globalCompositeOperation='source-in';c.fillStyle=kind;c.fillRect(0,0,size,size);
  c.globalCompositeOperation='source-over';
 }
 if(bg){c.globalCompositeOperation='destination-over';c.fillStyle=bg;c.fillRect(0,0,size,size);c.globalCompositeOperation='source-over';}
 return cv;
}
function sourceSVG(source){
 const doc=new DOMParser().parseFromString(source,'image/svg+xml');
 if(doc.querySelector('parsererror')||doc.documentElement?.localName!=='svg')throw Error('SVG invalido');
 return source;
}
function svgVariant(source,kind,bg,fit=.8){
 const esc=v=>String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
 const uri='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(source)));
 const margin=(1-fit)/2*100;
 const pct=(fit*100);
 const image='<image href="'+uri+'" x="'+margin+'%" y="'+margin+'%" width="'+pct+'%" height="'+pct+'%" preserveAspectRatio="xMidYMid meet"/>';
 const head='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" width="1024" height="1024">';
 const background=bg?'<rect width="1024" height="1024" fill="'+esc(bg)+'"/>':'';
 if(kind==='original')return head+background+image+'</svg>';
 return head+'<defs><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024" style="mask-type:alpha">'+image+'</mask></defs>'+background+'<rect width="1024" height="1024" fill="'+esc(kind)+'" mask="url(#a)"/></svg>';
}
for(const asset of [{id:'logo',im:logo,folder:'07_Logo_Versions/'},{id:'symbol',im:symbol,folder:'10_Symbol_Versions/'}]){
 if(!asset.im)continue;
 const f=files[asset.id];
 const svgSource=f&&/\.svg$/i.test(f.name)?sourceSVG(await f.text()):null;
 for(const [name,mode,bg] of variants){
  try{
   const ink=mode==='black'?'#000000':mode==='white'?'#FFFFFF':'original';
   await add(asset.folder+name+'.png',await blobCanvas(drawVariant(asset.im,ink,bg)));
   if(svgSource){
    // Source SVG is preserved as a vector image; never vectorize PNG by relabeling.
    const svg=name==='original-transparent'?svgSource:svgVariant(svgSource,ink,bg);
    e.push([root+asset.folder+name+'.svg',ascii(svg)]);
   }
  }catch(err){e.push([root+asset.folder+'NOTICE-'+name+'.txt',ascii(err.message)]);}
 }
 if(svgSource)e.push([root+asset.folder+asset.id+'-original.svg',ascii(svgSource)]);
}
// Favicons: always transparent; original, black, white and hue-inverse.
const fav=symbol||logo;
const favFile=symbol&&files.symbol?files.symbol:files.logo;
const favSVG=favFile&&/\.svg$/i.test(favFile.name)?sourceSVG(await favFile.text()):null;
const favColors=[['original','original'],['black','#000000'],['white','#FFFFFF'],['inverse',inverse]];
for(const [label,ink] of favColors){
 for(const size of sizes){
  try{await add('08_Favicons/'+label+'/icon-'+size+'.png',await blobCanvas(drawVariant(fav,ink,null,size,.78)));}
  catch(err){e.push([root+'08_Favicons/'+label+'/NOTICE.txt',ascii(err.message)]);break;}
 }
 if(favSVG){
  const svg=label==='original'?favSVG:svgVariant(favSVG,ink,null,.78);
  e.push([root+'08_Favicons/'+label+'/favicon.svg',ascii(svg)]);
 }
}
for(let [label,w,h] of [['avatar',1024,1024],['post',1080,1080],['story',1080,1920],['banner',1500,500]]){let cv=document.createElement('canvas');cv.width=w;cv.height=h;let x=cv.getContext('2d');x.fillStyle=$('light').value;x.fillRect(0,0,w,h);let im=symbol||logo,sc=Math.min(w*.68/im.width,h*.68/im.height);x.drawImage(im,(w-im.width*sc)/2,(h-im.height*sc)/2,im.width*sc,im.height*sc);await add('09_Social_Media/'+label+'.png',await blobCanvas(cv))}e.push([root+'README.txt',ascii('Logo Pack Studio V15 ZIP repair\n01 Brand Board PNG\n02 Brand Guidelines PDF (20 paginas A4)\n03 Cores\n04 Originais\n05 Fotografias\n06 Graficos\n07 Versoes de logotipo\n08 Favicons\n09 Redes sociais\n10 Versoes de simbolo (se fornecido)\n\nSeis versoes oficiais: original, preto, branco, preto sobre branco, branco sobre preto, original sobre secundario. A cor secundaria usa o campo second da paleta. Favicons transparentes: original, preto, branco e inversa (matiz +180 graus), 10 tamanhos. SVG original e variantes SVG escalaveis por mascara alfa quando o ficheiro de origem e SVG. As variantes SVG preservam a geometria vetorial incorporada, nao sao paths recoloridos editaveis individualmente. PNG nao e convertido artificialmente em vetor.\n\nPDF rasterizado. CMYK e valores de impressao nao certificados. Fontes sujeitas a licenca.\n')]);save(zip(e),name+'-complete-brand-pack.zip');status('ZIP completo gerado. '+e.length+' ficheiros.')}catch(err){console.error(err);status('Erro: '+err.message)}finally{button.disabled=false}}
['png','pdf','zip'].forEach(id=>$(id).onclick=()=>exportPack(id));render();previewGuide();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installPaletteStudio);else setTimeout(installPaletteStudio,0);

// V15 UI may move color controls after this script loads.
setTimeout(()=>{if(!document.getElementById('color-palette-studio'))installPaletteStudio();},650);

// Keep the Color Palette Studio at the END of 01 / Brand Setup,
// after all brand fields and before the 02 / Visual Assets tab.
function placePaletteLast(){
 const palette=document.getElementById('color-palette-studio');
 const setup=document.querySelector('.stage[data-stage="0"]');
 if(palette&&setup&&setup.lastElementChild!==palette)setup.appendChild(palette);
}
setTimeout(placePaletteLast,800);
setTimeout(placePaletteLast,1600);


/* V16 - Typography Studio + Pattern Studio (local, no API). */
(function(){
'use strict';
const ready=()=>{
 const setup=document.querySelector('.stage[data-stage="0"]');
 const assets=document.querySelector('.stage[data-stage="1"]');
 if(!setup||!assets||document.getElementById('v16-typography'))return;
 const css=document.createElement('style');css.textContent=`
 .v16-studio{border:1px solid #ddd6d0;border-radius:13px;padding:17px;margin:16px 0;background:#fff;color:#242124}
 .v16-studio h3{margin:0 0 7px;font-size:18px}.v16-studio p{font-size:12px;color:#68636a;line-height:1.5}
 .v16-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
 .v16-grid label{display:flex;flex-direction:column;gap:5px;font-size:12px;font-weight:600}
 .v16-grid select,.v16-grid input{width:100%;box-sizing:border-box;border:1px solid #d4cfcb;border-radius:6px;padding:8px;background:white;color:#262326}
 .v16-preview{margin:12px 0;padding:16px;border:1px solid #e5dfd9;border-radius:8px;overflow:hidden}
 .v16-preview h4{margin:0 0 6px;font-size:32px;line-height:1.15;font-weight:500;overflow-wrap:anywhere}
 .v16-preview p{font-size:13px;margin:0;overflow-wrap:anywhere}
 .v16-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
 .v16-actions button{border:1px solid #d2c9c1;border-radius:7px;background:#f9f7f4;color:#252025;padding:9px 12px;cursor:pointer;font-size:12px}
 #v16-pattern-canvas{width:100%;height:auto;display:block;border:1px solid #e1dad4;border-radius:8px;margin-top:12px}
 @media(max-width:560px){.v16-grid{grid-template-columns:1fr}}
 `;document.head.appendChild(css);
 const ty=document.createElement('section');ty.id='v16-typography';ty.className='v16-studio';
 ty.innerHTML=`<h3>Typography Studio</h3><p>Define a hierarquia tipográfica da marca. As sugestões são locais e editáveis; não utilizam IA nem descarregam fontes.</p><div class="v16-grid"><label>Fonte de títulos<select id="v16-display"><option value="Georgia">Georgia · editorial</option><option value="Times New Roman">Times New Roman · clássica</option><option value="Arial">Arial · minimalista</option><option value="Trebuchet MS">Trebuchet MS · contemporânea</option><option value="Verdana">Verdana · funcional</option><option value="Palatino Linotype">Palatino · literária</option></select></label><label>Fonte de texto<select id="v16-body"><option value="Arial">Arial · neutra</option><option value="Verdana">Verdana · legível</option><option value="Georgia">Georgia · editorial</option><option value="Trebuchet MS">Trebuchet MS · moderna</option><option value="Times New Roman">Times New Roman · clássica</option></select></label><label>Escala de título (px)<input id="v16-size" type="range" min="24" max="54" value="36"></label><label>Espaçamento (px)<input id="v16-tracking" type="range" min="-2" max="5" step="0.5" value="0"></label></div><div class="v16-grid" style="margin-top:14px"><label>Carregar fonte de títulos (.otf, .ttf, .woff, .woff2)<input type="file" id="v16-display-file" accept=".otf,.ttf,.woff,.woff2"></label><label>Carregar fonte de texto (.otf, .ttf, .woff, .woff2)<input type="file" id="v16-body-file" accept=".otf,.ttf,.woff,.woff2"></label></div><p id="v16-font-status" aria-live="polite">As fontes são utilizadas localmente. Confirma a licença antes de as incluir num Brand Pack.</p><div class="v16-preview" id="v16-type-preview"><h4 id="v16-title-preview">Identidade com personalidade.</h4><p id="v16-copy-preview">Uma linguagem visual consistente, clara e memorável.</p></div><div class="v16-actions"><button id="v16-type-download" type="button">Exportar regras tipográficas (.txt)</button></div>`;
 const palette=document.getElementById('color-palette-studio');if(palette)setup.insertBefore(ty,palette);else setup.appendChild(ty);
 const pat=document.createElement('section');pat.id='v16-pattern';pat.className='v16-studio';pat.innerHTML=`<h3>Pattern Studio</h3><p>Repete o símbolo SVG original sem alterar a sua geometria. Os padrões podem ser exportados como SVG ou PNG.</p><div class="v16-grid"><label>Espaçamento entre símbolos<input id="v16-gap" type="range" min="0" max="100" value="24"></label><label>Escala do símbolo<input id="v16-scale" type="range" min="12" max="110" value="46"></label><label>Rotação<input id="v16-rotate" type="range" min="-180" max="180" value="0"></label><label>Fundo<select id="v16-bg"><option value="secondary">Secundária</option><option value="primary">Principal</option><option value="white">Branco</option><option value="transparent">Transparente</option></select></label></div><canvas id="v16-pattern-canvas" width="900" height="500"></canvas><p id="v16-pattern-status">Carrega um símbolo SVG no Brand Setup para gerar o padrão.</p><div class="v16-actions"><button id="v16-pattern-svg" type="button">Exportar SVG</button><button id="v16-pattern-png" type="button">Exportar PNG</button></div>`;
 assets.appendChild(pat);
 const q=id=>document.getElementById(id);
 const typeUpdate=()=>{q('v16-title-preview').style.fontFamily=`"${q('v16-display').value}",serif`;q('v16-title-preview').style.fontSize=q('v16-size').value+'px';q('v16-title-preview').style.letterSpacing=q('v16-tracking').value+'px';q('v16-copy-preview').style.fontFamily=`"${q('v16-body').value}",sans-serif`;q('v16-title-preview').textContent=(q('brand')?.value||'Identidade com personalidade.')+' — Design with purpose.';};
 ['v16-display','v16-body','v16-size','v16-tracking'].forEach(id=>q(id).addEventListener('input',typeUpdate));q('brand')?.addEventListener('input',typeUpdate);typeUpdate();
 const v16Fonts={};window.__v16UploadedFonts=v16Fonts;
 for(const [kind,id,selectId] of [['display','v16-display-file','v16-display'],['body','v16-body-file','v16-body']]){
  q(id).addEventListener('change',async event=>{
   const file=event.target.files?.[0];if(!file)return;
   if(!/\.(otf|ttf|woff2?)$/i.test(file.name)){q('v16-font-status').textContent='Formato inválido. Usa OTF, TTF, WOFF ou WOFF2.';return}
   if(file.size>15*1024*1024){q('v16-font-status').textContent='A fonte excede 15 MB.';return}
   const url=URL.createObjectURL(file);
   try{
    const family='V16Uploaded'+kind;
    const face=new FontFace(family,`url("${url}")`);
    await face.load();document.fonts.add(face);
    v16Fonts[kind]={file,family,url};
    let option=[...q(selectId).options].find(x=>x.value===family);
    if(!option){option=document.createElement('option');option.value=family;q(selectId).appendChild(option)}
    option.textContent='Carregada: '+file.name;q(selectId).value=family;typeUpdate();
    q('v16-font-status').textContent='Fonte '+(kind==='display'?'de títulos':'de texto')+' carregada: '+file.name;
    if(kind==='display'&&q('brandFont')){
     try{const dt=new DataTransfer();dt.items.add(file);q('brandFont').files=dt.files;q('brandFont').dispatchEvent(new Event('change',{bubbles:true}))}catch(e){console.warn('Fonte visível no Typography Studio; PDF pode usar a fonte anterior.',e)}
    }
   }catch(err){q('v16-font-status').textContent='Não foi possível ler a fonte: '+err.message;URL.revokeObjectURL(url)}
  });
 }
 const download=(blob,name)=>{const a=document.createElement('a');const u=URL.createObjectURL(blob);a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)};
 const safeName=()=>((q('brand')?.value||'brand').trim().replace(/[^a-z0-9-]+/gi,'-')||'brand');
 q('v16-type-download').onclick=()=>{const t=`TYPOGRAPHY SYSTEM\nBrand: ${q('brand')?.value||''}\nDisplay: ${q('v16-display').value}\nBody: ${q('v16-body').value}\nTitle size: ${q('v16-size').value}px\nLetter spacing: ${q('v16-tracking').value}px\nUploaded display font: ${v16Fonts.display?.file.name||'none'}\nUploaded body font: ${v16Fonts.body?.file.name||'none'}\nCheck licenses before redistributing font files.\n`;download(new Blob([t],{type:'text/plain'}),safeName()+'-typography.txt')};
 const escapeAttr=v=>String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
 let svgData='',patternSvg='';
 const color=id=>{const v=q(id)?.value||'';return /^#[a-f0-9]{6}$/i.test(v)?v:'#E9E1D5'};
 const renderPattern=()=>{
 const canvas=q('v16-pattern-canvas'),ctx=canvas.getContext('2d');ctx.clearRect(0,0,900,500);
 const bg=q('v16-bg').value;const fill=bg==='primary'?color('accent'):bg==='secondary'?color('second'):bg==='white'?'#FFFFFF':'none';
 if(fill!=='none'){ctx.fillStyle=fill;ctx.fillRect(0,0,900,500)}
 if(!svgData){patternSvg='';q('v16-pattern-status').textContent='Carrega um símbolo SVG no Brand Setup para gerar o padrão.';return}
 const size=Number(q('v16-scale').value)*2,gap=Number(q('v16-gap').value),cell=size+gap,rotation=Number(q('v16-rotate').value);
 const img=new Image();img.onload=()=>{for(let y=-cell;y<500+cell;y+=cell){for(let x=-cell;x<900+cell;x+=cell){ctx.save();ctx.translate(x+size/2,y+size/2);ctx.rotate(rotation*Math.PI/180);ctx.drawImage(img,-size/2,-size/2,size,size);ctx.restore()}}};img.onerror=()=>{q('v16-pattern-status').textContent='O SVG não pôde ser apresentado. Verifica se é um SVG válido.'};img.src=svgData;
 const tile=`<image href="${escapeAttr(svgData)}" x="${-size/2}" y="${-size/2}" width="${size}" height="${size}" transform="translate(${size/2} ${size/2}) rotate(${rotation})"/>`;
 patternSvg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="900" height="500" viewBox="0 0 900 500"><defs><pattern id="tile" patternUnits="userSpaceOnUse" width="${cell}" height="${cell}">${tile}</pattern></defs>${fill==='none'?'':`<rect width="900" height="500" fill="${fill}"/>`}<rect width="900" height="500" fill="url(#tile)"/></svg>`;
 q('v16-pattern-status').textContent='Padrão pronto · original preservado · 900 × 500 px';
 };
 const symbolInput=q('symbol');const loadSymbol=()=>{const file=symbolInput?.files?.[0];if(!file||!(/\.svg$/i.test(file.name)||file.type==='image/svg+xml')){svgData='';renderPattern();return}const reader=new FileReader();reader.onload=()=>{const raw=String(reader.result||'');const doc=new DOMParser().parseFromString(raw,'image/svg+xml');const root=doc.documentElement;if(root.nodeName.toLowerCase()!=='svg'||doc.querySelector('parsererror')||doc.querySelector('script,foreignObject,iframe,object,embed')){svgData='';q('v16-pattern-status').textContent='SVG inválido ou com conteúdo não permitido.';return}root.querySelectorAll('*').forEach(el=>{[...el.attributes].forEach(a=>{if(/^on/i.test(a.name)||/javascript:/i.test(a.value)||(/^(href|xlink:href)$/i.test(a.name)&&!a.value.startsWith('#')))el.removeAttribute(a.name)})});const cleaned=new XMLSerializer().serializeToString(root);svgData='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(cleaned)));renderPattern()};reader.readAsText(file)};
 symbolInput?.addEventListener('change',loadSymbol);
 ['v16-gap','v16-scale','v16-rotate','v16-bg','accent','second'].forEach(id=>q(id)?.addEventListener('input',renderPattern));
 q('v16-pattern-svg').onclick=()=>{if(!patternSvg){q('v16-pattern-status').textContent='Primeiro carrega um símbolo SVG.';return}download(new Blob([patternSvg],{type:'image/svg+xml'}),safeName()+'-pattern.svg')};
 q('v16-pattern-png').onclick=()=>{if(!patternSvg){q('v16-pattern-status').textContent='Primeiro carrega um símbolo SVG.';return}q('v16-pattern-canvas').toBlob(b=>{if(b)download(b,safeName()+'-pattern.png')},'image/png')};
 const newButton=q('v15-new');newButton?.addEventListener('click',()=>{['v16-display','v16-body'].forEach(id=>q(id).selectedIndex=0);q('v16-size').value=36;q('v16-tracking').value=0;q('v16-gap').value=24;q('v16-scale').value=46;q('v16-rotate').value=0;q('v16-bg').selectedIndex=0;svgData='';typeUpdate();renderPattern()});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(ready,350));else setTimeout(ready,350);
})();

/* V17 — Brand Guidelines Builder. Local, editable, no external APIs. */
(function(){
'use strict';
const init=()=>{
 const stage=document.querySelector('.stage[data-stage="2"]');
 if(!stage||document.getElementById('v17-builder'))return;
 const style=document.createElement('style');style.textContent=`
 #v17-builder{background:#fff;border:1px solid #ded8d2;border-radius:14px;padding:18px;margin:18px 0;color:#242124}
 #v17-builder h3{margin:0 0 6px;font-size:19px}#v17-builder p{font-size:12px;color:#6d6765;line-height:1.5}
 .v17-row{border-top:1px solid #e9e5e1;padding:10px 0;display:grid;grid-template-columns:22px minmax(0,1fr);gap:10px;align-items:start}
 .v17-row input[type=text],.v17-row textarea{width:100%;box-sizing:border-box;border:1px solid #d6d1cc;border-radius:6px;padding:8px;font:12px Arial;color:#222;background:white}
 .v17-row textarea{resize:vertical;min-height:50px;margin-top:6px}.v17-row label{font-size:12px;font-weight:600}
 #v17-builder button{padding:9px 12px;background:#f6f2ee;border:1px solid #d7d0c9;border-radius:7px;cursor:pointer}
 .v17-toolbar{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.v17-note{font-size:11px!important}
 `;document.head.appendChild(style);
 const section=document.createElement('section');section.id='v17-builder';
 section.innerHTML='<h3>Brand Guidelines Builder · V17</h3><p>Personaliza o conteúdo e escolhe as páginas a entregar. A pré-visualização e o PDF usam a mesma seleção. Mantém-se a estrutura A4 existente.</p><div class="v17-toolbar"><button type="button" id="v17-all">Selecionar todas</button><button type="button" id="v17-default">Repor conteúdo</button></div><div id="v17-pages"></div><p class="v17-note">As notas são adicionadas à respetiva página. Os elementos gráficos continuam a ser produzidos pelo motor original; revê sempre o PDF antes de entregar.</p>';
 stage.insertBefore(section,stage.firstChild);
 const descriptions=[
 'Identidade visual e assinatura da marca.', 'Estrutura e conteúdos do documento.',
 'História, posicionamento e proposta de valor.', 'Valores, personalidade e tom de voz.',
 'Elementos centrais do sistema de identidade.', 'Logótipo oficial: respeitar a geometria original.',
 'Variantes aprovadas para fundos claros e escuros.', 'Manter espaço livre à volta da marca.',
 'Garantir legibilidade em formatos pequenos.', 'Evitar distorções, efeitos e alterações arbitrárias.',
 'Cores oficiais e respetivas referências HEX.', 'Famílias tipográficas e caracteres de referência.',
 'Hierarquia visual para títulos, textos e legendas.', 'Elementos gráficos que complementam o logótipo.',
 'Padrões derivados do símbolo original.', 'Fotografia: enquadramento, luz e ambiente.',
 'Aplicações para formatos de redes sociais.', 'Exemplos de aplicação da identidade.',
 'Organização dos ficheiros e formatos de entrega.', 'Verificações antes da entrega ao cliente.'
 ];
 const defaults=pageTitles.map((title,i)=>({title,description:descriptions[i],enabled:true}));
 const data=defaults.map(x=>({...x}));window.__v17Guidelines=data;
 const holder=document.getElementById('v17-pages');
 const build=()=>{holder.replaceChildren();data.forEach((page,i)=>{
  const row=document.createElement('div');row.className='v17-row';
  const check=document.createElement('input');check.type='checkbox';check.checked=page.enabled;check.title='Incluir página '+(i+1);check.onchange=()=>{page.enabled=check.checked;refresh()};
  const fields=document.createElement('div');const label=document.createElement('label');label.textContent=String(i+1).padStart(2,'0')+' · '+defaults[i].title;
  const title=document.createElement('input');title.type='text';title.value=page.title;title.maxLength=80;title.setAttribute('aria-label','Título da página '+(i+1));title.oninput=()=>{page.title=title.value||defaults[i].title;refresh()};
  const note=document.createElement('textarea');note.value=page.description;note.maxLength=300;note.setAttribute('aria-label','Nota da página '+(i+1));note.oninput=()=>{page.description=note.value;refresh()};
  fields.append(label,title,note);row.append(check,fields);holder.appendChild(row);
 })};
 let refreshTimer;const refresh=()=>{clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>previewGuide().catch(console.warn),180)};
 document.getElementById('v17-all').onclick=()=>{data.forEach(p=>p.enabled=true);build();refresh()};
 document.getElementById('v17-default').onclick=()=>{defaults.forEach((p,i)=>Object.assign(data[i],p));build();refresh()};
 build();
 const originalPaint=paintPage;
 paintPage=function(index,scale=1){
  const c=originalPaint(index,scale),p=data[index];if(!p)return c;
  const x=c.getContext('2d');x.save();x.scale(scale,scale);
  if(index>0&&p.title!==defaults[index].title){
   x.fillStyle='#ffffff';x.fillRect(50,146,800,85);
   x.font='bold 45px Georgia';x.fillStyle=document.getElementById('dark')?.value||'#211F20';
   const title=p.title.length>34?p.title.slice(0,33)+'…':p.title;x.fillText(title,55,209);
  }
  if(p.description){
   x.fillStyle='#fff';x.fillRect(54,1108,794,67);
   x.fillStyle=document.getElementById('dark')?.value||'#211F20';x.font='18px Arial';
   const words=p.description.split(/\s+/);let line='',y=1130;
   for(const word of words){const next=line?line+' '+word:word;if(x.measureText(next).width>770){x.fillText(line,55,y);line=word;y+=23;if(y>1168)break}else line=next}
   if(line&&y<=1168)x.fillText(line,55,y);
  }
  x.restore();return c;
 };
 const originalPdf=guidePdf;
 guidePdf=async function(){
  const selected=data.map((p,i)=>p.enabled?i:-1).filter(i=>i>=0);
  if(!selected.length)throw Error('Seleciona pelo menos uma página nas Guidelines.');
  const pages=[];
  for(let j=0;j<selected.length;j++){
   const i=selected[j];status('A gerar Guidelines: '+(j+1)+'/'+selected.length+'…');
   await new Promise(resolve=>setTimeout(resolve,0));
   const c=paintPage(i,1.6),blob=await blobCanvas(c,'image/jpeg',.88);
   pages.push({bytes:await bytes(blob),w:c.width,h:c.height});c.width=c.height=1;
  }
  return pdfPages(pages);
 };
 previewGuide=async function(){
  const target=document.getElementById('guide-thumbs');if(!target)return;
  target.replaceChildren();const selected=data.map((p,i)=>p.enabled?i:-1).filter(i=>i>=0);
  for(const i of selected.slice(0,6)){
   const wrap=document.createElement('div'),canvas=paintPage(i,.28),label=document.createElement('small');
   label.textContent=(i+1)+' · '+data[i].title;wrap.append(canvas,label);target.appendChild(wrap);
  }
 };
 // Enrich the existing ZIP without changing its logo, favicon or board exports.
 const originalZip=zip;
 zip=function(entries){
  const root=(slug()||'brand')+'/';
  entries.push([root+'02_Brand_Guidelines/guidelines-content.json',enc.encode(JSON.stringify(data,null,2))]);
  const font=window.__v16UploadedFonts||{};
  const typography={display:document.getElementById('v16-display')?.value||'Georgia',body:document.getElementById('v16-body')?.value||'Arial',displayFile:font.display?.file?.name||null,bodyFile:font.body?.file?.name||null,titleSize:document.getElementById('v16-size')?.value||36,tracking:document.getElementById('v16-tracking')?.value||0};
  entries.push([root+'11_Typography/typography.json',enc.encode(JSON.stringify(typography,null,2))]);
  const pattern=document.getElementById('v16-pattern-canvas');
  if(pattern){try{const base64=pattern.toDataURL('image/png').split(',')[1];const binary=atob(base64),out=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)out[i]=binary.charCodeAt(i);entries.push([root+'12_Patterns/pattern-preview.png',out]);}catch(e){console.warn('Pattern preview omitted:',e)}}
  return originalZip(entries);
 };
 const pdfButton=document.getElementById('pdf');if(pdfButton)pdfButton.onclick=()=>exportPack('pdf');
 const zipButton=document.getElementById('zip');if(zipButton)zipButton.onclick=()=>exportPack('zip');
 document.getElementById('v15-new')?.addEventListener('click',()=>{defaults.forEach((p,i)=>Object.assign(data[i],p));build();refresh()});
 refresh();
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,700));else setTimeout(init,700);
})();
