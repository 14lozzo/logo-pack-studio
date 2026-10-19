/* Dependency-free A4 portrait PDF encoder. Canvas pages -> JPEG streams. */
window.BrandPDF={
 async fromCanvases(pages){
  const enc=new TextEncoder(), parts=[], offsets=[0];let position=0;
  function put(value){const bytes=typeof value==='string'?enc.encode(value):value;parts.push(bytes);position+=bytes.length}
  function object(id,value){offsets[id]=position;put(`${id} 0 obj\n`);put(value);put('\nendobj\n')}
  function base64Bytes(b64){const raw=atob(b64),out=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)out[i]=raw.charCodeAt(i);return out}
  put('%PDF-1.4\n');object(1,'<< /Type /Catalog /Pages 2 0 R >>');
  object(2,`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`);
  for(let i=0;i<pages.length;i++){
   const canvas=pages[i],id=3+i*3;
   const jpeg=base64Bytes(canvas.toDataURL('image/jpeg',.79).split(',')[1]);
   object(id,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im${i} ${id+1} 0 R >> >> /Contents ${id+2} 0 R >>`);
   offsets[id+1]=position;put(`${id+1} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);put(jpeg);put('\nendstream\nendobj\n');
   const stream=`q 595.28 0 0 841.89 0 0 cm /Im${i} Do Q`;
   object(id+2,`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  }
  const xref=position,count=3+pages.length*3;put(`xref\n0 ${count}\n0000000000 65535 f \n`);
  for(let i=1;i<count;i++)put(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);
  put(`trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts,{type:'application/pdf'});
 }
};
