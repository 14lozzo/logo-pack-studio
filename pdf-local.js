/* Local PDF fallback: 18-page rasterized PDF, no external network required. */
(function(){
const mm=4, W=297,H=210, encoder=new TextEncoder();
const bin=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
class LocalPDF{
 constructor(){this.pages=[];this.pending=[];this.addPage();this.color='#222';this.fill='#fff';this.stroke='#222';this.fontSize=12;this.bold=false;this.lw=.35;}
 addPage(){this.canvas=document.createElement('canvas');this.canvas.width=W*mm;this.canvas.height=H*mm;this.ctx=this.canvas.getContext('2d');this.ctx.scale(mm,mm);this.pages.push(this.canvas);}
 setFillColor(...v){this.fill=`rgb(${v.slice(0,3).join(',')})`}
 setTextColor(...v){this.color=`rgb(${v.slice(0,3).join(',')})`}
 setDrawColor(...v){this.stroke=`rgb(${v.slice(0,3).join(',')})`}
 setFont(_family,style){this.bold=style==='bold'}
 setFontSize(n){this.fontSize=n}
 setLineWidth(n){this.lw=n}
 setLineDashPattern(pattern){this.ctx.setLineDash(pattern||[])}
 rect(x,y,w,h,style){const c=this.ctx;if(style==='F'||style==='FD'){c.fillStyle=this.fill;c.fillRect(x,y,w,h)}if(style!=='F'){c.strokeStyle=this.stroke;c.lineWidth=this.lw;c.strokeRect(x,y,w,h)}}
 roundedRect(x,y,w,h,rx,ry,style){const c=this.ctx;c.beginPath();c.roundRect(x,y,w,h,Math.min(rx,ry));if(style==='F'||style==='FD'){c.fillStyle=this.fill;c.fill()}if(style!=='F'){c.strokeStyle=this.stroke;c.lineWidth=this.lw;c.stroke()}}
 line(x,y,x2,y2){const c=this.ctx;c.beginPath();c.strokeStyle=this.stroke;c.lineWidth=this.lw;c.moveTo(x,y);c.lineTo(x2,y2);c.stroke()}
 text(value,x,y){const c=this.ctx;c.font=`${this.bold?'700':'400'} ${this.fontSize*.3528*1.35}px Arial, sans-serif`;c.fillStyle=this.color;c.textBaseline='alphabetic';(Array.isArray(value)?value:[value]).forEach((line,i)=>c.fillText(String(line),x,y+i*this.fontSize*.48))}
 splitTextToSize(value,max){const c=this.ctx;c.font=`${this.bold?'700':'400'} ${this.fontSize*.3528*1.35}px Arial, sans-serif`;const lines=[];for(const paragraph of String(value).split('\n')){let line='';for(const word of paragraph.split(/\s+/)){const candidate=line?line+' '+word:word;if(c.measureText(candidate).width>max&&line){lines.push(line);line=word}else line=candidate}lines.push(line)}return lines}
 addImage(src,_format,x,y,w,h){const image=new Image();const c=this.ctx;this.pending.push(new Promise((resolve,reject)=>{image.onload=()=>{c.drawImage(image,x,y,w,h);resolve()};image.onerror=()=>reject(Error('Falha ao desenhar imagem no PDF'));image.src=src;}))}
 async ready(){await Promise.all(this.pending)}
 output(type){const chunks=[],offsets=[0];let pos=0;const push=data=>{const bytes=typeof data==='string'?encoder.encode(data):data;chunks.push(bytes);pos+=bytes.length};const obj=(id,content)=>{offsets[id]=pos;push(`${id} 0 obj\n`);push(content);push('\nendobj\n')};push('%PDF-1.4\n');const n=this.pages.length;obj(1,'<< /Type /Catalog /Pages 2 0 R >>');obj(2,`<< /Type /Pages /Count ${n} /Kids [${this.pages.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`);
 this.pages.forEach((page,i)=>{const id=3+i*3,jpeg=bin(page.toDataURL('image/jpeg',.88).split(',')[1]);obj(id,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Im${i} ${id+1} 0 R >> >> /Contents ${id+2} 0 R >>`);offsets[id+1]=pos;push(`${id+1} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);push(jpeg);push('\nendstream\nendobj\n');const stream=`q 841.89 0 0 595.28 0 0 cm /Im${i} Do Q`;obj(id+2,`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`)});const xref=pos;push(`xref\n0 ${3+n*3}\n0000000000 65535 f \n`);for(let i=1;i<3+n*3;i++)push(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);push(`trailer\n<< /Size ${3+n*3} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);const result=new Blob(chunks,{type:'application/pdf'});return type==='blob'?result:result}
}
window.jspdf=window.jspdf||{jsPDF:LocalPDF};
})();
