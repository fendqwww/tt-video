const { chromium } = require('playwright'); const { spawn } = require('child_process'); const fs=require('fs');
(async()=>{
  const data=JSON.parse(fs.readFileSync('data.json')); const fps=data.fps; const n=data.amp.length;
  const from=+(process.argv[2]||0), to=+(process.argv[3]||n), out=process.argv[4]||'frames';
  fs.mkdirSync(out,{recursive:true});
  const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1080,height:1920}});
  p.on('console',m=>console.log('page:',m.text())); p.on('pageerror',e=>console.log('err:',e.message));
  await p.goto('http://localhost:8765/scene.html'); await p.waitForFunction('window.READY',null,{timeout:60000});
  for(let f=from;f<to;f++){ await p.evaluate(t=>window.renderAt(t), f/fps);
    await p.screenshot({path:`${out}/${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:93}); }
  await b.close(); console.log('done',from,to);
})();
