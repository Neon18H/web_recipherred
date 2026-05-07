'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

// Three.js WebGPU — solo en cliente
const HeroWebGPU = dynamic(() => import('@/components/ui/hero-webgpu'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center" style={{ background: '#03030a' }}>
      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '11px', letterSpacing: '3px', color: '#C0142A' }}>
        INICIALIZANDO CIPHER RED...
      </div>
    </div>
  ),
});

const SERVICES = [
  { n:'01', icon:'🔍', title:'Gestión de Vulnerabilidades',
    desc:'Identificamos y priorizamos cada grieta en tu infraestructura. Escaneo continuo, análisis de riesgo y remediación guiada antes de que actúe el atacante.',
    tags:['ESCANEO','ANÁLISIS','REMEDIACIÓN'] },
  { n:'02', icon:'🛡️', title:'Operaciones SOC',
    desc:'Implementamos y administramos tu Centro de Operaciones de Seguridad. Monitoreo 24/7, detección en tiempo real y respuesta inmediata ante cualquier amenaza.',
    tags:['SIEM','24/7','ALERTAS'] },
  { n:'03', icon:'⚡', title:'Respuesta a Incidentes',
    desc:'Cuando el ataque ocurre, cada segundo importa. Contenemos, investigamos y eliminamos la amenaza. Forense digital y recuperación total de operaciones.',
    tags:['DFIR','FORENSE','CONTENCIÓN'] },
  { n:'04', icon:'👁️', title:'OSINT e Inteligencia',
    desc:'Mapeamos tu exposición digital con fuentes abiertas. Identificamos actores maliciosos y amenazas dirigidas antes de que lleguen a tu organización.',
    tags:['RECONOCIMIENTO','EXPOSICIÓN','PERFILES'] },
  { n:'05', icon:'🌐', title:'Ciberinteligencia',
    desc:'Operamos en la dark web y foros clandestinos para detectar filtraciones, credenciales comprometidas y planes de ataque antes de que se materialicen.',
    tags:['DARK WEB','THREAT INTEL','FILTRACIONES'] },
  { n:'06', icon:'📋', title:'Consultoría y Cumplimiento',
    desc:'Alineamos tu seguridad con ISO 27001, NIST y normativas colombianas. Evaluaciones de riesgo y preparación para auditorías del sector financiero y salud.',
    tags:['ISO 27001','NIST','SFC'] },
];

const TICKER = [
  '⚡ THREAT DETECTED','Gestión de Vulnerabilidades','SOC 24/7',
  '⚡ DARK WEB ALERT','Respuesta a Incidentes','OSINT & Ciberinteligencia',
  '⚡ CIPHER RED ACTIVE','Consultoría ISO 27001','Threat Intelligence',
];

const METRICS = [
  { target:100, sup:'%',  label:'CONFIDENCIALIDAD',    width:100 },
  { target:24,  sup:'/7', label:'MONITOREO SOC',       width:100 },
  { target:97,  sup:'%',  label:'REMEDIACIÓN EXITOSA', width:97  },
  { target:88,  sup:'%',  label:'DETECCIÓN OSINT',     width:88  },
];

const PROCESS = [
  { n:'01', phase:'ALPHA',   title:'Reconocimiento',   desc:'Mapeo total de tu superficie de ataque. Lo que no conoces no puedes proteger.' },
  { n:'02', phase:'BRAVO',   title:'Análisis táctico', desc:'Clasificamos amenazas por impacto real. Atacamos primero lo que más duele.' },
  { n:'03', phase:'CHARLIE', title:'Ejecución',        desc:'Remediación y controles reales desde el SOC. Sin parches temporales.' },
  { n:'04', phase:'DELTA',   title:'Intel continua',   desc:'El enemigo evoluciona cada día. Nosotros también. Monitoreo permanente.' },
];

export default function Home() {
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rx = useRef(0), ry = useRef(0);
  let mx = 0, my = 0;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (curRef.current) { curRef.current.style.left = mx+'px'; curRef.current.style.top = my+'px'; }
    };
    document.addEventListener('mousemove', move);
    const loop = () => {
      rx.current += (mx - rx.current) * 0.1;
      ry.current += (my - ry.current) * 0.1;
      if (ringRef.current) { ringRef.current.style.left = rx.current+'px'; ringRef.current.style.top = ry.current+'px'; }
      requestAnimationFrame(loop);
    };
    loop();
    return () => document.removeEventListener('mousemove', move);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Metric counters
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.currentTarget.querySelectorAll<HTMLElement>('[data-target]').forEach(el => {
          const target = parseInt(el.dataset.target!);
          const suffix = el.querySelector('sup')?.outerHTML || '';
          let cur = 0;
          const iv = setInterval(() => {
            cur = Math.min(cur + target / 60, target);
            el.innerHTML = Math.round(cur) + suffix;
            if (cur >= target) clearInterval(iv);
          }, 20);
        });
        e.currentTarget.querySelectorAll<HTMLElement>('[data-width]').forEach(el => {
          setTimeout(() => { el.style.width = el.dataset.width + '%'; }, 300);
        });
        obs.disconnect();
      });
    }, { threshold: 0.3 });
    const grid = document.getElementById('metrics-grid');
    if (grid) obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  const mono = { fontFamily: "'Share Tech Mono',monospace" };
  const disp = { fontFamily: "'Syne',sans-serif" };

  return (
    <>
      {/* Custom cursor */}
      <div id="cr-cursor" ref={curRef} />
      <div id="cr-ring"   ref={ringRef} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-14 py-5"
        style={{ background: 'rgba(3,3,10,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="font-extrabold text-xl text-white" style={{ ...disp, letterSpacing: '3px' }}>
          CIPHER<span style={{ color: '#ff1a35', textShadow: '0 0 20px rgba(255,26,53,0.5)' }}>RED</span>
        </div>
        <div className="hidden md:flex gap-8">
          {['Servicios','Metodología','Nosotros','Contacto'].map(l => (
            <a key={l} href="#" className="relative group"
              style={{ ...mono, fontSize: '10px', letterSpacing: '2px', color: '#5a5870', textDecoration: 'none', transition: 'color .3s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#5a5870'}>
              {l.toUpperCase()}
            </a>
          ))}
        </div>
        <button className="relative overflow-hidden"
          style={{ ...mono, fontSize: '10px', letterSpacing: '2px', padding: '10px 22px', background: 'transparent', color: '#ff1a35', border: '1px solid rgba(192,20,42,0.5)', borderRadius: '4px', cursor: 'pointer', transition: 'all .3s' }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#C0142A'; el.style.color = '#fff'; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = '#ff1a35'; }}>
          DIAGNÓSTICO GRATIS
        </button>
      </nav>

      {/* ── HERO (Three.js WebGPU) ── */}
      <HeroWebGPU />

      {/* ── TICKER ── */}
      <div className="overflow-hidden py-3 relative" style={{ borderTop:'1px solid rgba(192,20,42,0.15)', borderBottom:'1px solid rgba(192,20,42,0.15)', background:'rgba(192,20,42,0.03)' }}>
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background:'linear-gradient(to right,#03030a,transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background:'linear-gradient(to left,#03030a,transparent)' }} />
        <div className="ticker-track inline-flex whitespace-nowrap">
          {[...TICKER,...TICKER].map((t,i) => (
            <span key={i} style={{ ...mono, fontSize:'10px', letterSpacing:'3px', padding:'0 36px', color: t.startsWith('⚡') ? 'rgba(255,77,77,0.8)' : '#5a5870' }}>
              {t} <span style={{ color:'rgba(192,20,42,0.3)', fontSize:'8px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="servicios" className="px-14 py-28 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background:'linear-gradient(to bottom,transparent,rgba(192,20,42,0.4),transparent)' }} />
        <div className="reveal flex items-center gap-4 mb-4" style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'#ff1a35' }}>
          <span style={{ width:'32px', height:'1px', background:'#C0142A', display:'inline-block' }} /> SERVICIOS
        </div>
        <h2 className="reveal delay-1 font-extrabold text-white mb-14" style={{ ...disp, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.05 }}>
          Lo que <em className="not-italic shine-text">hacemos</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.04)' }}>
          {SERVICES.map((s,i) => (
            <div key={i} className="svc-card p-10 cursor-default group" style={{ background:'#07070f' }}>
              <div className="font-extrabold absolute top-4 right-5 leading-none" style={{ ...disp, fontSize:'68px', color:'rgba(255,255,255,0.03)', transition:'color .4s' }}>
                {s.n}
              </div>
              <div className="svc-icon w-14 h-14 flex items-center justify-center rounded-xl mb-6 text-2xl"
                style={{ background:'rgba(192,20,42,0.08)', border:'1px solid rgba(192,20,42,0.2)', transition:'all .4s' }}>
                {s.icon}
              </div>
              <h3 className="font-bold text-white mb-3 text-xl" style={{ ...disp, letterSpacing:'.5px' }}>{s.title}</h3>
              <p className="text-sm leading-[1.85]" style={{ color:'#5a5870' }}>{s.desc}</p>
              <div className="flex items-center justify-between mt-5">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t => (
                    <span key={t} className="rounded px-2.5 py-1" style={{ ...mono, fontSize:'9px', letterSpacing:'1px', background:'rgba(192,20,42,0.07)', border:'1px solid rgba(192,20,42,0.15)', color:'rgba(192,20,42,0.65)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="svc-arrow text-lg" style={{ color:'#C0142A', opacity:0, transition:'all .3s' }}>↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="px-14 py-24" style={{ background:'radial-gradient(ellipse at 50% 100%,rgba(192,20,42,0.06),transparent 70%)' }}>
        <div className="reveal flex items-center gap-4 mb-4" style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'#ff1a35' }}>
          <span style={{ width:'32px', height:'1px', background:'#C0142A', display:'inline-block' }} /> CAPACIDADES
        </div>
        <h2 className="reveal delay-1 font-extrabold text-white mb-16" style={{ ...disp, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.05 }}>
          Números que <em className="not-italic shine-text">respaldan</em>
        </h2>
        <div id="metrics-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.04)' }}>
          {METRICS.map(m => (
            <div key={m.label} className="p-10 text-center" style={{ background:'#07070f' }}>
              <div className="font-extrabold leading-none" data-target={m.target}
                style={{ ...disp, fontSize:'56px', background:'linear-gradient(135deg,#fff,rgba(255,255,255,0.7))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                0<sup style={{ color:'#ff1a35', WebkitTextFillColor:'#ff1a35', fontSize:'24px' }}>{m.sup}</sup>
              </div>
              <div className="mt-2" style={{ ...mono, fontSize:'10px', letterSpacing:'3px', color:'#5a5870' }}>{m.label}</div>
              <div className="mt-4 h-px rounded overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded transition-all duration-[1800ms] ease-out w-0"
                  style={{ background:'linear-gradient(90deg,#C0142A,#ff4d4d)' }}
                  data-width={m.width} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="px-14 py-28">
        <div className="reveal flex items-center gap-4 mb-4" style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'#ff1a35' }}>
          <span style={{ width:'32px', height:'1px', background:'#C0142A', display:'inline-block' }} /> METODOLOGÍA
        </div>
        <h2 className="reveal delay-1 font-extrabold text-white mb-16" style={{ ...disp, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.05 }}>
          Cómo <em className="not-italic shine-text">operamos</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(192,20,42,0.3),rgba(192,20,42,0.3),transparent)' }} />
          {PROCESS.map((s,i) => (
            <div key={i} className="px-6 text-center group">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 transition-all duration-400"
                style={{ background:'rgba(192,20,42,0.05)', border:'1px solid rgba(192,20,42,0.25)' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background='rgba(192,20,42,0.15)'; el.style.borderColor='#C0142A'; el.style.boxShadow='0 0 40px rgba(192,20,42,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background='rgba(192,20,42,0.05)'; el.style.borderColor='rgba(192,20,42,0.25)'; el.style.boxShadow='none'; }}>
                <span className="font-extrabold text-2xl" style={{ ...disp, color:'#ff1a35' }}>{s.n}</span>
              </div>
              <div className="mb-2" style={{ ...mono, fontSize:'9px', letterSpacing:'3px', color:'rgba(192,20,42,0.6)' }}>{s.phase}</div>
              <div className="font-bold text-white text-lg mb-2" style={disp}>{s.title}</div>
              <div className="text-sm leading-[1.75]" style={{ color:'#5a5870' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-14 py-36 text-center relative overflow-hidden" style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(192,20,42,0.1),transparent 65%)' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ top:'50%', left:'50%', width:'480px', height:'480px', border:'1px solid rgba(192,20,42,0.08)', animation:'ring-spin 25s linear infinite' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ top:'50%', left:'50%', width:'620px', height:'620px', border:'1px dashed rgba(192,20,42,0.05)', animation:'ring-spin 35s linear infinite reverse' }} />
        <div className="relative z-10">
          <div className="mb-6" style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'#ff1a35' }}>// ACCESO DIRECTO</div>
          <h2 className="font-extrabold text-white leading-[.92] mb-6" style={{ ...disp, fontSize:'clamp(48px,9vw,100px)' }}>
            ¿Tu empresa<br />está <em className="not-italic shine-text">expuesta</em>?
          </h2>
          <p className="mb-12" style={{ ...mono, fontSize:'11px', letterSpacing:'3px', color:'#5a5870' }}>
            DIAGNÓSTICO GRATUITO · CONFIDENCIAL · SIN COMPROMISOS
          </p>
          <div className="flex max-w-[480px] mx-auto mb-5 rounded-lg overflow-hidden" style={{ border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.02)' }}>
            <input type="email" placeholder="tu@empresa.com" className="flex-1 outline-none bg-transparent px-6 py-4 text-white"
              style={{ ...mono, fontSize:'12px' }} />
            <button className="px-6 py-4 text-white whitespace-nowrap transition-colors duration-300"
              style={{ ...mono, fontSize:'10px', letterSpacing:'2px', background:'#C0142A', border:'none', cursor:'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ff1a35')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C0142A')}>
              SOLICITAR →
            </button>
          </div>
          <div style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'#5a5870' }}>
            contacto@cipherred.tech · Respuesta en menos de 24 horas
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-14 py-9 flex items-center justify-between flex-wrap gap-4" style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="font-extrabold text-lg text-white" style={{ ...disp, letterSpacing:'3px' }}>
          CIPHER<span style={{ color:'#ff1a35' }}>RED</span>
        </div>
        <div style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'#5a5870' }}>
          © 2025 CIPHER RED CYBERSECURITY S.A.S — MEDELLÍN, COLOMBIA
        </div>
        <div className="flex gap-6">
          {['LinkedIn','Instagram','cipherred.tech'].map(l => (
            <a key={l} href="#" style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'#5a5870', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#ff1a35'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#5a5870'}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
