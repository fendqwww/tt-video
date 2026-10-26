// node render.js <url страницы> <from> <to> <папка кадров>; страница грузит data.json и выставляет window.renderAt(t)
const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{
  const [url, from, to, out]=process.argv.slice(2); const fps=30; fs.mkdirSync(out,{recursive:true});
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920}});
  p.on('pageerror',e=>console.log('err:',e.message));
  await p.goto(url); await p.waitForFunction('window.READY',null,{timeout:60000}); await p.evaluate(()=>document.fonts.ready);
  for(let f=+from;f<+to;f++){ await p.evaluate(t=>window.renderAt(t), f/fps);
    await p.screenshot({path:`${out}/${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:93}); }
  await b.close(); console.log('done',from,to);
})();
