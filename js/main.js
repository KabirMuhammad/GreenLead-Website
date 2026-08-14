// Signature element: hero canvas grid that morphs from power-grid lines to network topology
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');
let w, h, dpr;

function resize(){
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.offsetWidth; h = canvas.offsetHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener('resize', resize);
resize();

// Nodes: represent both "grid poles" and "network nodes" — morph between two layouts
const COLS = 9, ROWS = 6;
let nodes = [];

function buildNodes(){
  nodes = [];
  const marginX = w*0.08, marginY = h*0.15;
  const spanX = (w - marginX*2)/(COLS-1);
  const spanY = (h - marginY*2)/(ROWS-1);
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const gridX = marginX + c*spanX;
      const gridY = marginY + r*spanY;
      // network layout: same grid but jittered, deterministic pseudo-random
      const seed = (r*COLS+c)*999;
      const jitterX = (Math.sin(seed)*0.5)*spanX*0.4;
      const jitterY = (Math.cos(seed*1.3)*0.5)*spanY*0.4;
      nodes.push({
        gx: gridX, gy: gridY,
        nx: gridX + jitterX, ny: gridY + jitterY,
        x: gridX, y: gridY,
        r: 1.6 + Math.abs(Math.sin(seed))*1.4,
        phase: Math.random()*Math.PI*2
      });
    }
  }
}
buildNodes();
window.addEventListener('resize', buildNodes);

let t = 0;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function idx(r,c){ return r*COLS+c; }

function draw(){
  t += prefersReduced ? 0 : 0.006;
  const morph = (Math.sin(t)+1)/2; // 0 = grid, 1 = network

  ctx.clearRect(0,0,w,h);

  // update positions
  nodes.forEach(n=>{
    n.x = n.gx + (n.nx-n.gx)*morph;
    n.y = n.gy + (n.ny-n.gy)*morph;
  });

  // draw connecting lines (grid-like adjacency, fading with morph on diagonals)
  ctx.lineWidth = 1;
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const n = nodes[idx(r,c)];
      if(c<COLS-1){
        const n2 = nodes[idx(r,c+1)];
        const alpha = 0.14 + 0.10*Math.sin(t*1.4 + r + c);
        ctx.strokeStyle = `rgba(184,137,43,${Math.max(0.04,alpha)})`;
        ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(n2.x,n2.y); ctx.stroke();
      }
      if(r<ROWS-1){
        const n2 = nodes[idx(r+1,c)];
        const alpha = 0.10 + 0.08*Math.sin(t*1.2 + r*1.5 + c);
        ctx.strokeStyle = `rgba(217,228,221,${Math.max(0.03,alpha)})`;
        ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(n2.x,n2.y); ctx.stroke();
      }
      // occasional diagonal "network" links, more visible as morph -> 1
      if(r<ROWS-1 && c<COLS-1 && (r+c)%3===0){
        const n2 = nodes[idx(r+1,c+1)];
        ctx.strokeStyle = `rgba(184,137,43,${0.08*morph})`;
        ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(n2.x,n2.y); ctx.stroke();
      }
    }
  }

  // draw nodes
  nodes.forEach(n=>{
    const pulse = 0.6 + 0.4*Math.sin(t*2 + n.phase);
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r*pulse, 0, Math.PI*2);
    ctx.fillStyle = `rgba(184,137,43,${0.5*pulse})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();
