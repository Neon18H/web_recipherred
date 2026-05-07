'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, MouseEvent as ReactMouseEvent } from 'react';

const HeroSection = dynamic(() => import('@/components/ui/hero-section').then(m => ({ default: m.HeroSection })), {
  ssr: false,
  loading: () => (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#03030a' }}>
      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'11px', letterSpacing:'3px', color:'#C0142A' }}>
        INICIALIZANDO CIPHER RED...
      </div>
    </div>
  ),
});

const SERVICES = [
  { n:'01', icon:'🔍', title:'Gestión de Vulnerabilidades', desc:'Identificamos y priorizamos cada grieta en tu infraestructura. Escaneo continuo, análisis de riesgo y remediación guiada antes de que actúe el atacante.', tags:['ESCANEO','ANÁLISIS','REMEDIACIÓN'] },
  { n:'02', icon:'🛡️', title:'Operaciones SOC', desc:'Implementamos y administramos tu Centro de Operaciones de Seguridad. Monitoreo 24/7, detección en tiempo real y respuesta inmediata ante cualquier amenaza.', tags:['SIEM','24/7','ALERTAS'] },
  { n:'03', icon:'⚡', title:'Respuesta a Incidentes', desc:'Cuando el ataque ocurre, cada segundo importa. Contenemos, investigamos y eliminamos la amenaza. Forense digital y recuperación total de operaciones.', tags:['DFIR','FORENSE','CONTENCIÓN'] },
  { n:'04', icon:'👁️', title:'OSINT e Inteligencia', desc:'Mapeamos tu exposición digital con fuentes abiertas. Identificamos actores maliciosos y amenazas dirigidas antes de que lleguen a tu organización.', tags:['RECONOCIMIENTO','EXPOSICIÓN','PERFILES'] },
  { n:'05', icon:'🌐', title:'Ciberinteligencia', desc:'Operamos en la dark web y foros clandestinos para detectar filtraciones, credenciales comprometidas y planes de ataque antes de que se materialicen.', tags:['DARK WEB','THREAT INTEL','FILTRACIONES'] },
  { n:'06', icon:'📋', title:'Consultoría y Cumplimiento', desc:'Alineamos tu seguridad con ISO 27001, NIST y normativas colombianas. Evaluaciones de riesgo y preparación para auditorías del sector financiero y salud.', tags:['ISO 27001','NIST','SFC'] },
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

const mono: React.CSSProperties = { fontFamily: "'Share Tech Mono',monospace" };
const disp: React.CSSProperties = { fontFamily: "'Syne',sans-serif" };

function hoverRed(e: ReactMouseEvent<HTMLAnchorElement>) {
  (e.currentTarget as HTMLElement).style.color = '#ff1a35';
}
function hoverMuted(e: ReactMouseEvent<HTMLAnchorElement>) {
  (e.currentTarget as HTMLElement).style.color = '#5a5870';
}

export default function Home() {
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);

  // Custom cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = `${mx.current}px`;
        curRef.current.style.top  = `${my.current}px`;
      }
    };
    document.addEventListener('mousemove', onMove);
    let raf: number;
    const loop = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx.current}px`;
        ringRef.current.style.top  = `${ry.current}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Metric counters
  useEffect(() => {
    let disconnected = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting || disconnected) return;
        const container = e.target as HTMLElement;
        container.querySelectorAll<HTMLElement>('[data-target]').forEach(el => {
          const targetVal = parseInt(el.dataset['target'] ?? '0', 10);
          const suffix = el.querySelector('sup')?.outerHTML ?? '';
          let cur = 0;
          const iv = setInterval(() => {
            cur = Math.min(cur + targetVal / 60, targetVal);
            el.innerHTML = `${Math.round(cur)}${suffix}`;
            if (cur >= targetVal) clearInterval(iv);
          }, 20);
        });
        container.querySelectorAll<HTMLElement>('[data-width]').forEach(el => {
          setTimeout(() => {
            el.style.width = `${el.dataset['width'] ?? '0'}%`;
          }, 300);
        });
        disconnected = true;
        obs.disconnect();
      });
    }, { threshold: 0.3 });
    const grid = document.getElementById('metrics-grid');
    if (grid) obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div id="cr-cursor" ref={curRef} />
      <div id="cr-ring"   ref={ringRef} />

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 52px', background:'rgba(3,3,10,0.6)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ ...disp, fontWeight:800, fontSize:'20px', letterSpacing:'3px', color:'#fff' }}>
          CIPHER<span style={{ color:'#ff1a35', textShadow:'0 0 20px rgba(255,26,53,0.5)' }}>RED</span>
        </div>
        <div style={{ display:'flex', gap:'32px' }}>
          {['Servicios','Metodología','Nosotros','Contacto'].map(l => (
            <a key={l} href="#"
              style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'#5a5870', textDecoration:'none', transition:'color .3s' }}
              onMouseEnter={hoverRed}
              onMouseLeave={hoverMuted}>
              {l.toUpperCase()}
            </a>
          ))}
        </div>
        <button
          style={{ ...mono, fontSize:'10px', letterSpacing:'2px', padding:'10px 22px', background:'transparent', color:'#ff1a35', border:'1px solid rgba(192,20,42,0.5)', borderRadius:'4px', cursor:'pointer', transition:'all .3s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C0142A'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff1a35'; }}>
          DIAGNÓSTICO GRATIS
        </button>
      </nav>

      {/* HERO */}
      <HeroSection />

      {/* TICKER */}
      <div style={{ overflow:'hidden', borderTop:'1px solid rgba(192,20,42,0.15)', borderBottom:'1px solid rgba(192,20,42,0.15)', background:'rgba(192,20,42,0.03)', padding:'11px 0', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right,#03030a,transparent)', zIndex:1 }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left,#03030a,transparent)', zIndex:1 }} />
        <div className="ticker-track" style={{ display:'inline-flex', whiteSpace:'nowrap' }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ ...mono, fontSize:'10px', letterSpacing:'3px', padding:'0 36px', color: t.startsWith('⚡') ? 'rgba(255,77,77,0.8)' : '#5a5870' }}>
              {t} <span style={{ color:'rgba(192,20,42,0.3)', fontSize:'8px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="servicios" style={{ padding:'112px 52px', position:'relative' }}>
        <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'1px', height:'96px', background:'linear-gradient(to bottom,transparent,rgba(192,20,42,0.4),transparent)' }} />
        <div className="reveal" style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'#ff1a35', marginBottom:'14px', display:'flex', alignItems:'center', gap:'14px' }}>
          <span style={{ width:'32px', height:'1px', background:'#C0142A', display:'inline-block' }} /> SERVICIOS
        </div>
        <h2 className="reveal" style={{ ...disp, fontWeight:800, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.05, color:'#fff', marginBottom:'56px', transitionDelay:'0.1s' }}>
          Lo que <em className="not-italic shine-text">hacemos</em>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.04)' }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="svc-card" style={{ background:'#07070f', padding:'40px 30px', cursor:'default' }}>
              <div style={{ ...disp, fontWeight:800, fontSize:'68px', color:'rgba(255,255,255,0.03)', position:'absolute', top:'14px', right:'18px', lineHeight:1 }}>{s.n}</div>
              <div className="svc-icon" style={{ width:'52px', height:'52px', background:'rgba(192,20,42,0.08)', border:'1px solid rgba(192,20,42,0.2)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', marginBottom:'24px', transition:'all .4s' }}>{s.icon}</div>
              <h3 style={{ ...disp, fontWeight:700, fontSize:'19px', color:'#fff', marginBottom:'10px', letterSpacing:'.5px' }}>{s.title}</h3>
              <p style={{ fontSize:'13px', color:'#5a5870', lineHeight:1.85 }}>{s.desc}</p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
                <div style={{ display:'flex', flexWrap:'wrap' as const, gap:'6px' }}>
                  {s.tags.map(t => (
                    <span key={t} style={{ ...mono, fontSize:'9px', letterSpacing:'1px', padding:'3px 9px', background:'rgba(192,20,42,0.07)', border:'1px solid rgba(192,20,42,0.15)', color:'rgba(192,20,42,0.65)', borderRadius:'4px' }}>{t}</span>
                  ))}
                </div>
                <span className="svc-arrow" style={{ color:'#C0142A', fontSize:'18px', opacity:0, transition:'all .3s' }}>↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section style={{ padding:'96px 52px', background:'radial-gradient(ellipse at 50% 100%,rgba(192,20,42,0.06),transparent 70%)' }}>
        <div className="reveal" style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'#ff1a35', marginBottom:'14px', display:'flex', alignItems:'center', gap:'14px' }}>
          <span style={{ width:'32px', height:'1px', background:'#C0142A', display:'inline-block' }} /> CAPACIDADES
        </div>
        <h2 className="reveal" style={{ ...disp, fontWeight:800, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.05, color:'#fff', marginBottom:'64px', transitionDelay:'0.1s' }}>
          Números que <em className="not-italic shine-text">respaldan</em>
        </h2>
        <div id="metrics-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.04)' }}>
          {METRICS.map(m => (
            <div key={m.label} style={{ background:'#07070f', padding:'40px 28px', textAlign:'center' as const }}>
              <div data-target={m.target} style={{ ...disp, fontWeight:800, fontSize:'56px', lineHeight:1, background:'linear-gradient(135deg,#fff,rgba(255,255,255,0.7))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                0<sup style={{ color:'#ff1a35', WebkitTextFillColor:'#ff1a35', fontSize:'24px' }}>{m.sup}</sup>
              </div>
              <div style={{ ...mono, fontSize:'10px', letterSpacing:'3px', color:'#5a5870', marginTop:'8px' }}>{m.label}</div>
              <div style={{ height:'1px', background:'rgba(255,255,255,0.06)', marginTop:'16px', borderRadius:'2px', overflow:'hidden' }}>
                <div data-width={m.width} style={{ height:'100%', background:'linear-gradient(90deg,#C0142A,#ff4d4d)', width:'0%', transition:'width 1800ms ease', borderRadius:'2px' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding:'112px 52px' }}>
        <div className="reveal" style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'#ff1a35', marginBottom:'14px', display:'flex', alignItems:'center', gap:'14px' }}>
          <span style={{ width:'32px', height:'1px', background:'#C0142A', display:'inline-block' }} /> METODOLOGÍA
        </div>
        <h2 className="reveal" style={{ ...disp, fontWeight:800, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.05, color:'#fff', marginBottom:'64px', transitionDelay:'0.1s' }}>
          Cómo <em className="not-italic shine-text">operamos</em>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'32px', position:'relative' }}>
          {PROCESS.map((s, i) => (
            <div key={i} style={{ textAlign:'center' as const }}>
              <div
                style={{ width:'72px', height:'72px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', background:'rgba(192,20,42,0.05)', border:'1px solid rgba(192,20,42,0.25)', transition:'all .4s', cursor:'default' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background='rgba(192,20,42,0.15)'; el.style.borderColor='#C0142A'; el.style.boxShadow='0 0 40px rgba(192,20,42,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background='rgba(192,20,42,0.05)'; el.style.borderColor='rgba(192,20,42,0.25)'; el.style.boxShadow='none'; }}>
                <span style={{ ...disp, fontWeight:800, fontSize:'22px', color:'#ff1a35' }}>{s.n}</span>
              </div>
              <div style={{ ...mono, fontSize:'9px', letterSpacing:'3px', color:'rgba(192,20,42,0.6)', marginBottom:'10px' }}>{s.phase}</div>
              <div style={{ ...disp, fontWeight:700, fontSize:'18px', color:'#fff', marginBottom:'10px' }}>{s.title}</div>
              <div style={{ fontSize:'13px', color:'#5a5870', lineHeight:1.75 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'140px 52px', textAlign:'center' as const, borderTop:'1px solid rgba(255,255,255,0.05)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,rgba(192,20,42,0.1),transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'480px', height:'480px', borderRadius:'50%', border:'1px solid rgba(192,20,42,0.08)', pointerEvents:'none', animation:'ring-spin 25s linear infinite' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'620px', height:'620px', borderRadius:'50%', border:'1px dashed rgba(192,20,42,0.05)', pointerEvents:'none', animation:'ring-spin 35s linear infinite reverse' }} />
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'#ff1a35', marginBottom:'24px' }}>// ACCESO DIRECTO</div>
          <h2 style={{ ...disp, fontWeight:800, fontSize:'clamp(48px,9vw,100px)', lineHeight:.92, color:'#fff', marginBottom:'24px' }}>
            ¿Tu empresa<br />está <em className="not-italic shine-text">expuesta</em>?
          </h2>
          <p style={{ ...mono, fontSize:'11px', letterSpacing:'3px', color:'#5a5870', marginBottom:'48px' }}>
            DIAGNÓSTICO GRATUITO · CONFIDENCIAL · SIN COMPROMISOS
          </p>
          <div style={{ display:'flex', maxWidth:'480px', margin:'0 auto 20px', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', overflow:'hidden', background:'rgba(255,255,255,0.02)' }}>
            <input type="email" placeholder="tu@empresa.com"
              style={{ flex:1, background:'transparent', border:'none', outline:'none', padding:'15px 20px', color:'#fff', ...mono, fontSize:'12px' }} />
            <button
              style={{ ...mono, fontSize:'10px', letterSpacing:'2px', padding:'15px 22px', background:'#C0142A', color:'#fff', border:'none', cursor:'pointer', transition:'background .3s', whiteSpace:'nowrap' as const }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ff1a35'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C0142A'; }}>
              SOLICITAR →
            </button>
          </div>
          <div style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'#5a5870' }}>
            contacto@cipherred.tech · Respuesta en menos de 24 horas
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:'36px 52px', borderTop:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' as const, gap:'16px' }}>
        <div style={{ ...disp, fontWeight:800, fontSize:'18px', letterSpacing:'3px', color:'#fff' }}>
          CIPHER<span style={{ color:'#ff1a35' }}>RED</span>
        </div>
        <div style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'#5a5870' }}>
          © 2025 CIPHER RED CYBERSECURITY S.A.S — MEDELLÍN, COLOMBIA
        </div>
        <div style={{ display:'flex', gap:'24px' }}>
          {['LinkedIn','Instagram','cipherred.tech'].map(l => (
            <a key={l} href="#"
              style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'#5a5870', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={hoverRed}
              onMouseLeave={hoverMuted}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
