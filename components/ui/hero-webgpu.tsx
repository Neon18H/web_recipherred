'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   Hero Cipher Red — WebGL2 shader puro
   Sin dependencias de three/webgpu ni BloomNode
   Compatible con Netlify, Vercel y cualquier build
   Efectos: bat SDF, scan line roja, particles, data streams,
            parallax mouse, noise field, vignette
───────────────────────────────────────────────────────────── */

const VERT = `
attribute vec2 pos;
varying vec2 vUv;
void main(){
  vUv = pos * .5 + .5;
  gl_Position = vec4(pos, 0., 1.);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uRes;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float bat(vec2 p){
  p.y+=.06;
  float body=length(p*vec2(1.8,2.3))-.17;
  float wl=length((p+vec2(.38,0.))*vec2(1.,.55))-.34;
  float wr=length((p-vec2(.38,0.))*vec2(1.,.55))-.34;
  float ears=min(length(p+vec2(.09,-.24))-.055,length(p-vec2(.09,-.24))-.055);
  return min(min(body,min(wl,wr)),ears);
}
void main(){
  vec2 uv=vUv;
  vec2 asp=vec2(uRes.x/uRes.y,1.);
  vec2 p=(uv-.5)*asp*2.;
  vec2 off=(uMouse-.5)*asp*2.*.035;
  float t=uTime*.28;
  float flow=noise(p*2.8+t+off)*.5+noise(p*5.8-t*1.2+off*1.4)*.3+noise(p*11.+t*.65)*.2;
  float scanLine=smoothstep(.025,0.,abs(mod(uv.y+uTime*.38,1.)-.5))*.18;
  vec2 grid=fract(p*7.5+off*2.)-.5;
  float circuit=(1.-smoothstep(.47,.48,max(abs(grid.x),abs(grid.y))))*.11*flow;
  float particle=smoothstep(.28,.08,length(fract(p*5.5+off*2.5)-.5))*hash(floor(p*5.5+off*2.5)+floor(uTime*.4))*smoothstep(.45,.95,flow);
  vec2 bp=p-vec2(.52,0.);float b=bat(bp*1.85);
  float batGlow=smoothstep(.35,0.,b)*.65;
  float batEdge=smoothstep(.012,0.,abs(b))*1.8;
  float batFill=step(0.,-b)*.22;
  float sf1=smoothstep(.012,0.,abs(fract(p.x*3.8+.25)-.5))*smoothstep(.12,0.,abs(fract(p.y*2.8-uTime*.75)-.5))*.55;
  float sf2=smoothstep(.012,0.,abs(fract(p.x*3.8+.68)-.5))*smoothstep(.12,0.,abs(fract(p.y*4.5+uTime*1.05)-.5))*.45;
  float cg=smoothstep(1.3,.0,length(p-vec2(.6,0.)))*.18;
  vec3 red=vec3(.75,.08,.16),redB=vec3(1.,.1,.2),dark=vec3(.01,.01,.04);
  vec3 col=dark+red*circuit+red*particle*.85+redB*(sf1+sf2)+redB*batGlow+vec3(1.,.9,.9)*batEdge+red*batFill+vec3(.18,.01,.03)*cg+redB*scanLine;
  col*=1.-smoothstep(.45,1.5,length(p));
  col+=(hash(uv+uTime)-.5)*.014;
  gl_FragColor=vec4(col,1.);
}`;

export default function HeroWebGPU() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });

  const words    = ['Protege', 'lo', 'que', 'más', 'importa'];
  const subtitle = 'Inteligencia táctica. Vigilancia permanente. Respuesta inmediata.';
  const [visibleWords,    setVisibleWords]    = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays]                              = useState(() => words.map(() => Math.random() * 0.06));

  useEffect(() => {
    if (visibleWords < words.length) {
      const t = setTimeout(() => setVisibleWords(v => v + 1), 480);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSubtitleVisible(true), 650);
    return () => clearTimeout(t);
  }, [visibleWords]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') as WebGLRenderingContext;
    if (!gl) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      (gl as WebGLRenderingContext).viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight };
    });

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,   VERT));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uRes   = gl.getUniformLocation(prog, 'uRes');

    const start = performance.now();
    let raf: number;
    const render = () => {
      resize();
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime,  t);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const mono = "'Share Tech Mono', monospace";
  const disp = "'Syne', sans-serif";

  return (
    <div className="relative h-screen overflow-hidden" style={{ background:'#03030a' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background:'linear-gradient(to right,rgba(3,3,10,0.93) 28%,rgba(3,3,10,0.5) 58%,rgba(3,3,10,0.08) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background:'linear-gradient(to top,rgba(3,3,10,0.9) 0%,transparent 44%)' }} />
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        backgroundImage:'linear-gradient(rgba(192,20,42,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(192,20,42,0.035) 1px,transparent 1px)',
        backgroundSize:'70px 70px',
        maskImage:'radial-gradient(ellipse at 28% 50%,rgba(0,0,0,0.6) 0%,transparent 58%)',
      }} />

      <div className="relative z-20 h-full flex flex-col justify-center px-14 max-w-[640px]">
        <div className="word-reveal self-start inline-flex items-center gap-3 mb-9 px-5 py-2 rounded-full"
          style={{ background:'rgba(192,20,42,0.08)', border:'1px solid rgba(192,20,42,0.25)', animationDelay:'0.1s' }}>
          <span className="badge-dot" />
          <span style={{ fontFamily:mono, fontSize:'10px', letterSpacing:'3px', color:'rgba(255,100,120,0.9)' }}>
            OPERACIONES ACTIVAS · MEDELLÍN, CO
          </span>
        </div>

        <h1 className="font-extrabold text-white mb-6 leading-[.94]"
          style={{ fontFamily:disp, fontSize:'clamp(54px,7.5vw,90px)' }}>
          {words.map((word, i) => (
            <span key={i}
              className={i < visibleWords ? 'word-reveal' : 'opacity-0'}
              style={{
                animationDelay:`${i * 0.11 + (delays[i] || 0)}s`,
                display:'inline-block', marginRight:'0.28em',
                ...(i === words.length - 1 ? {
                  background:'linear-gradient(135deg,#ff1a35 0%,#ff6b6b 50%,#ff1a35 100%)',
                  backgroundSize:'200% auto',
                  WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent',
                  backgroundClip:'text',
                  animation:'shine 4s linear infinite',
                } : {}),
              }}>
              {word}
            </span>
          ))}
        </h1>

        <div style={{ height:'2px', marginBottom:'28px', borderRadius:'2px', background:'linear-gradient(90deg,#C0142A,rgba(192,20,42,0.15),transparent)', width:subtitleVisible?'100%':'0%', transition:'width 0.9s ease' }} />

        <p className={subtitleVisible?'fade-up-anim':'opacity-0'}
          style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'17px', fontWeight:300, color:'rgba(232,230,240,0.55)', lineHeight:1.85, maxWidth:'430px', marginBottom:'44px', animationDelay:'0.05s' }}>
          {subtitle}
        </p>

        <div className={`flex gap-4 flex-wrap mb-14 ${subtitleVisible?'fade-up-anim':'opacity-0'}`} style={{ animationDelay:'0.15s' }}>
          <button style={{ fontFamily:mono, fontSize:'11px', letterSpacing:'2px', padding:'14px 32px', background:'#C0142A', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer', transition:'all .3s' }}
            onMouseEnter={e=>{ const el=e.currentTarget; el.style.boxShadow='0 0 40px rgba(192,20,42,0.6)'; el.style.transform='translateY(-2px)'; }}
            onMouseLeave={e=>{ const el=e.currentTarget; el.style.boxShadow='none'; el.style.transform='translateY(0)'; }}>
            DIAGNÓSTICO GRATUITO
          </button>
          <button style={{ fontFamily:mono, fontSize:'11px', letterSpacing:'2px', padding:'14px 32px', background:'transparent', color:'#fff', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'6px', cursor:'pointer', transition:'all .3s' }}
            onMouseEnter={e=>{ const el=e.currentTarget; el.style.borderColor='rgba(192,20,42,0.5)'; el.style.color='#ff1a35'; el.style.transform='translateY(-2px)'; }}
            onMouseLeave={e=>{ const el=e.currentTarget; el.style.borderColor='rgba(255,255,255,0.12)'; el.style.color='#fff'; el.style.transform='translateY(0)'; }}>
            Ver Servicios ↓
          </button>
        </div>

        <div className={`flex gap-10 ${subtitleVisible?'fade-up-anim':'opacity-0'}`} style={{ animationDelay:'0.25s' }}>
          {[{num:'24',sup:'/7',label:'MONITOREO SOC'},{num:'100',sup:'%',label:'CONFIDENCIAL'},{num:'0',sup:'s',label:'TOLERANCIA AL RIESGO'}].map(s=>(
            <div key={s.label} className="pl-5 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background:'linear-gradient(to bottom,#C0142A,transparent)' }} />
              <div className="font-extrabold text-white leading-none" style={{ fontFamily:disp, fontSize:'36px' }}>
                {s.num}<sup style={{ fontSize:'16px', color:'#ff1a35' }}>{s.sup}</sup>
              </div>
              <div style={{ fontFamily:mono, fontSize:'9px', letterSpacing:'2px', color:'#5a5870', marginTop:'4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {subtitleVisible && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 fade-up-anim" style={{ animationDelay:'0.5s' }}>
          <span style={{ fontFamily:mono, fontSize:'9px', letterSpacing:'3px', color:'#5a5870' }}>SCROLL</span>
          <div className="w-px h-8 animate-bounce" style={{ background:'linear-gradient(to bottom,#C0142A,transparent)' }} />
        </div>
      )}
    </div>
  );
}
