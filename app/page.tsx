'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { Search, Shield, Zap, Eye, Globe, FileText, ChevronRight, Mail } from 'lucide-react';

const HeroSection = dynamic(
  () => import('@/components/blocks/hero-section-5').then(m => ({ default: m.HeroSection })),
  {
    ssr: false,
    loading: () => (
      <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#050508' }}>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'11px', letterSpacing:'4px', color:'#C0142A' }}>
          CIPHER RED LOADING...
        </div>
      </div>
    ),
  }
);

const SERVICES = [
  { icon: Search,   n:'01', title:'Gestión de Vulnerabilidades',
    desc:'Identificamos cada grieta antes que el atacante. Escaneo continuo, análisis priorizado y remediación guiada paso a paso.',
    tags:['ESCANEO','ANÁLISIS','REMEDIACIÓN'] },
  { icon: Shield,   n:'02', title:'Operaciones SOC',
    desc:'Tu Centro de Operaciones diseñado, implementado y administrado por nosotros. Ojos abiertos 24/7, respuesta en minutos.',
    tags:['SIEM','MONITOREO','ALERTAS'] },
  { icon: Zap,      n:'03', title:'Respuesta a Incidentes',
    desc:'Cuando el ataque llega, cada segundo vale. Contenemos, investigamos, eliminamos y recuperamos. Sin pánico, con método.',
    tags:['DFIR','FORENSE','RECUPERACIÓN'] },
  { icon: Eye,      n:'04', title:'OSINT e Inteligencia',
    desc:'Mapeamos lo que tu empresa expone en internet. Identificamos actores maliciosos antes de que identifiquen a tu organización.',
    tags:['RECONOCIMIENTO','EXPOSICIÓN','PERFILES'] },
  { icon: Globe,    n:'05', title:'Ciberinteligencia',
    desc:'Operamos en la dark web y foros clandestinos. Detectamos filtraciones, credenciales comprometidas y planes de ataque con anticipación.',
    tags:['DARK WEB','THREAT INTEL','MONITOREO'] },
  { icon: FileText, n:'06', title:'Consultoría y Cumplimiento',
    desc:'Alineamos tu postura de seguridad con ISO 27001, NIST y normativas colombianas. Listos para auditorías del sector financiero y salud.',
    tags:['ISO 27001','NIST','SFC'] },
];

const METRICS = [
  { num:'24', sup:'/7',  sub:'h',  label:'Monitoreo continuo',   desc:'SOC activo sin interrupciones' },
  { num:'97', sup:'%',   sub:'',   label:'Remediación exitosa',   desc:'Vulnerabilidades cerradas' },
  { num:'88', sup:'%',   sub:'',   label:'Detección OSINT',       desc:'Amenazas identificadas' },
  { num:'<1', sup:'h',   sub:'',   label:'Tiempo de respuesta',   desc:'Ante incidentes críticos' },
];

const PROCESS = [
  { n:'01', phase:'ALPHA',   icon:'🎯', title:'Reconocimiento',   desc:'Mapeamos tu superficie de ataque completa — lo que no conoces no puedes proteger.' },
  { n:'02', phase:'BRAVO',   icon:'🔬', title:'Análisis táctico', desc:'Clasificamos amenazas por impacto real. Priorizamos lo que puede destruir tu operación.' },
  { n:'03', phase:'CHARLIE', icon:'⚡', title:'Ejecución',        desc:'Implementamos controles reales desde el SOC. Sin parches temporales, sin excusas.' },
  { n:'04', phase:'DELTA',   icon:'🔄', title:'Intel continua',   desc:'El panorama de amenazas cambia cada día. Nos adaptamos antes que el atacante.' },
];

const WHY = [
  { icon:'🎯', title:'Experiencia operativa real',   desc:'No somos teóricos. Cada servicio viene respaldado por experiencia táctica en ciberseguridad ofensiva y defensiva.' },
  { icon:'🌑', title:'Acceso a inteligencia profunda', desc:'Monitoreamos dark web, foros clandestinos y canales encubiertos — información que otras empresas no pueden obtener.' },
  { icon:'⚡', title:'Respuesta sin burocracia',      desc:'Ante un incidente, actuamos de inmediato. No hay tickets ni escalados. Solo contención y solución.' },
  { icon:'🔒', title:'Confidencialidad absoluta',     desc:'Todo bajo NDA, contratos claros y protocolos estrictos de manejo de información sensible de clientes.' },
];

const mono: React.CSSProperties = { fontFamily: "'Share Tech Mono', monospace" };
const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

export default function Home() {
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0); const my = useRef(0);
  const rx = useRef(0); const ry = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX; my.current = e.clientY;
      if (curRef.current) { curRef.current.style.left=`${mx.current}px`; curRef.current.style.top=`${my.current}px`; }
    };
    document.addEventListener('mousemove', onMove);
    let raf: number;
    const loop = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (ringRef.current) { ringRef.current.style.left=`${rx.current}px`; ringRef.current.style.top=`${ry.current}px`; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onEnter = () => { if(curRef.current){curRef.current.style.width='16px';curRef.current.style.height='16px';} if(ringRef.current){ringRef.current.style.width='44px';ringRef.current.style.height='44px';ringRef.current.style.borderColor='rgba(192,20,42,0.7)';} };
    const onLeave = () => { if(curRef.current){curRef.current.style.width='8px';curRef.current.style.height='8px';} if(ringRef.current){ringRef.current.style.width='28px';ringRef.current.style.height='28px';ringRef.current.style.borderColor='rgba(255,26,53,0.4)';} };
    document.querySelectorAll('button,a,.svc-card,.why-card').forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let done = false;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting || done) return;
        done = true;
        const container = e.target as HTMLElement;
        container.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
          const raw = el.dataset['count'] ?? '0';
          if (raw.startsWith('<')) { el.textContent = raw; return; }
          const target = parseInt(raw, 10);
          let cur = 0;
          const iv = setInterval(() => {
            cur = Math.min(cur + target / 60, target);
            el.textContent = String(Math.round(cur));
            if (cur >= target) clearInterval(iv);
          }, 18);
        });
        container.querySelectorAll<HTMLElement>('[data-bar]').forEach(el => {
          setTimeout(() => { el.style.width = `${el.dataset['bar']}%`; }, 200);
        });
        obs.disconnect();
      });
    }, { threshold: 0.25 });
    const g = document.getElementById('metrics-grid');
    if (g) obs.observe(g);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div id="cr-cursor" ref={curRef} />
      <div id="cr-ring"   ref={ringRef} />

      {/* ── HERO (three.js + nav + slider) ── */}
      <HeroSection />

      {/* ── TICKER ── */}
      <div style={{ overflow:'hidden', borderTop:'1px solid rgba(192,20,42,0.12)', borderBottom:'1px solid rgba(192,20,42,0.12)', background:'rgba(192,20,42,0.025)', padding:'12px 0', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right,#050508,transparent)', zIndex:1 }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left,#050508,transparent)', zIndex:1 }} />
        <div className="ticker-track" style={{ display:'inline-flex', whiteSpace:'nowrap' }}>
          {['⚡ THREAT DETECTED','Gestión de Vulnerabilidades','SOC 24/7','⚡ DARK WEB ALERT','Respuesta a Incidentes','OSINT & Ciberinteligencia','⚡ CIPHER RED ACTIVE','Consultoría ISO 27001','Threat Intelligence',
            '⚡ THREAT DETECTED','Gestión de Vulnerabilidades','SOC 24/7','⚡ DARK WEB ALERT','Respuesta a Incidentes','OSINT & Ciberinteligencia','⚡ CIPHER RED ACTIVE','Consultoría ISO 27001','Threat Intelligence']
            .map((t, i) => (
            <span key={i} style={{ ...mono, fontSize:'10px', letterSpacing:'3px', padding:'0 32px', color: t.startsWith('⚡') ? 'rgba(255,80,80,0.9)' : 'rgba(200,195,220,0.45)' }}>
              {t} <span style={{ color:'rgba(192,20,42,0.35)', fontSize:'7px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="servicios" style={{ padding:'120px 52px', background:'#050508', position:'relative' }}>
        {/* Top separator line */}
        <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'1px', height:'80px', background:'linear-gradient(to bottom,transparent,rgba(192,20,42,0.5),transparent)' }} />

        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div className="reveal" style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'12px' }}>
            <span style={{ width:'36px', height:'1px', background:'var(--red)', display:'inline-block' }} />
            <span style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'var(--red2)' }}>SERVICIOS</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'64px', flexWrap:'wrap', gap:'24px' }}>
            <h2 className="reveal d1" style={{ ...syne, fontWeight:800, fontSize:'clamp(36px,5vw,64px)', lineHeight:1.05, color:'#fff', margin:0 }}>
              Lo que <span className="shine-text">hacemos</span>
            </h2>
            <p className="reveal d2" style={{ ...inter, fontSize:'15px', color:'var(--muted2)', maxWidth:'380px', lineHeight:1.7, margin:0 }}>
              Soluciones de ciberseguridad ofensiva y defensiva para empresas que no pueden permitirse fallar.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'1px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'16px', overflow:'hidden' }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" style={{ background:'var(--surface)', padding:'36px 32px', cursor:'default' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
                  <div className="svc-icon-box" style={{ width:'48px', height:'48px', background:'rgba(192,20,42,0.1)', border:'1px solid rgba(192,20,42,0.2)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .35s' }}>
                    <s.icon size={20} color="#C0142A" />
                  </div>
                  <span style={{ ...mono, fontSize:'11px', color:'rgba(192,20,42,0.4)', letterSpacing:'1px' }}>{s.n}</span>
                </div>
                <h3 style={{ ...syne, fontWeight:700, fontSize:'18px', color:'#fff', marginBottom:'10px', letterSpacing:'.3px' }}>{s.title}</h3>
                <p style={{ ...inter, fontSize:'13.5px', color:'var(--muted2)', lineHeight:1.8, marginBottom:'20px' }}>{s.desc}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ display:'flex', flexWrap:'wrap' as const, gap:'6px' }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ ...mono, fontSize:'9px', letterSpacing:'1px', padding:'3px 9px', background:'rgba(192,20,42,0.07)', border:'1px solid rgba(192,20,42,0.15)', color:'rgba(192,20,42,0.7)', borderRadius:'4px' }}>{t}</span>
                    ))}
                  </div>
                  <span className="svc-arrow" style={{ color:'var(--red)', fontSize:'16px', opacity:0, transition:'all .3s', display:'inline-block' }}>↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CIPHER RED ── */}
      <section style={{ padding:'100px 52px', background:'var(--surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
            <div>
              <div className="reveal" style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'12px' }}>
                <span style={{ width:'36px', height:'1px', background:'var(--red)', display:'inline-block' }} />
                <span style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'var(--red2)' }}>POR QUÉ NOSOTROS</span>
              </div>
              <h2 className="reveal d1" style={{ ...syne, fontWeight:800, fontSize:'clamp(34px,4vw,56px)', lineHeight:1.1, color:'#fff', marginBottom:'24px' }}>
                Operamos donde<br/>otros no <span className="shine-text">llegan</span>
              </h2>
              <p className="reveal d2" style={{ ...inter, fontSize:'15px', color:'var(--muted2)', lineHeight:1.75, maxWidth:'420px' }}>
                No somos una empresa de software vendiendo licencias. Somos un equipo táctico que opera en las sombras para que tu empresa permanezca en la luz.
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'20px' }}>
              {WHY.map((w, i) => (
                <div key={i} className="why-card reveal" style={{ display:'flex', gap:'18px', alignItems:'flex-start', padding:'22px 24px', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'12px', transition:'all .3s', transitionDelay:`${i*0.08}s` }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(192,20,42,0.3)'; el.style.background='#1a1a24'; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='var(--border)'; el.style.background='var(--surface2)'; }}>
                  <div style={{ fontSize:'22px', minWidth:'36px' }}>{w.icon}</div>
                  <div>
                    <div style={{ ...syne, fontWeight:700, fontSize:'15px', color:'#fff', marginBottom:'5px' }}>{w.title}</div>
                    <div style={{ ...inter, fontSize:'13px', color:'var(--muted2)', lineHeight:1.7 }}>{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section style={{ padding:'100px 52px', background:'#050508' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div className="reveal" style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'12px' }}>
            <span style={{ width:'36px', height:'1px', background:'var(--red)', display:'inline-block' }} />
            <span style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'var(--red2)' }}>CAPACIDADES</span>
          </div>
          <h2 className="reveal d1" style={{ ...syne, fontWeight:800, fontSize:'clamp(34px,4.5vw,60px)', lineHeight:1.05, color:'#fff', marginBottom:'64px' }}>
            Números que <span className="shine-text">respaldan</span>
          </h2>
          <div id="metrics-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'16px', overflow:'hidden' }}>
            {METRICS.map((m, i) => (
              <div key={i} style={{ background:'var(--surface)', padding:'44px 36px', position:'relative', overflow:'hidden' }}>
                {/* Subtle red glow top */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,rgba(192,20,42,${0.2+i*0.1}),transparent)` }} />
                <div style={{ ...syne, fontWeight:800, fontSize:'clamp(48px,5vw,72px)', lineHeight:1, color:'#fff', marginBottom:'8px', display:'flex', alignItems:'baseline', gap:'4px' }}>
                  <span data-count={m.num.replace('<','') === m.num ? m.num : undefined} style={{ background:'linear-gradient(135deg,#fff 40%,rgba(255,255,255,0.6))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    {m.num.startsWith('<') ? m.num : '0'}
                  </span>
                  <span style={{ fontSize:'clamp(22px,2.5vw,32px)', color:'var(--red2)', WebkitTextFillColor:'var(--red2)' }}>{m.sup}</span>
                </div>
                <div style={{ ...syne, fontWeight:600, fontSize:'15px', color:'rgba(255,255,255,0.85)', marginBottom:'5px' }}>{m.label}</div>
                <div style={{ ...inter, fontSize:'13px', color:'var(--muted)', marginBottom:'20px' }}>{m.desc}</div>
                <div style={{ height:'2px', background:'rgba(255,255,255,0.06)', borderRadius:'2px', overflow:'hidden' }}>
                  <div data-bar={m.sup==='%' ? parseInt(m.num) : 100} style={{ height:'100%', background:'linear-gradient(90deg,var(--red),#ff4d4d)', width:'0%', transition:'width 1.6s cubic-bezier(.4,0,.2,1)', borderRadius:'2px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="metodologia" style={{ padding:'100px 52px', background:'var(--surface)', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div className="reveal" style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'12px' }}>
            <span style={{ width:'36px', height:'1px', background:'var(--red)', display:'inline-block' }} />
            <span style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'var(--red2)' }}>METODOLOGÍA</span>
          </div>
          <h2 className="reveal d1" style={{ ...syne, fontWeight:800, fontSize:'clamp(34px,4.5vw,60px)', lineHeight:1.05, color:'#fff', marginBottom:'64px' }}>
            Cómo <span className="shine-text">operamos</span>
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'24px', position:'relative' }}>
            {/* Connecting line */}
            <div style={{ position:'absolute', top:'36px', left:'10%', right:'10%', height:'1px', background:'linear-gradient(90deg,transparent,rgba(192,20,42,0.25) 20%,rgba(192,20,42,0.25) 80%,transparent)', display:'none' }} />
            {PROCESS.map((s, i) => (
              <div key={i} className="reveal" style={{ transitionDelay:`${i*0.1}s` }}>
                <div style={{ display:'flex', flexDirection:'column' as const, height:'100%', padding:'32px 28px', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'14px', transition:'all .35s', cursor:'default' }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(192,20,42,0.35)'; el.style.background='#1a1a24'; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 16px 40px rgba(0,0,0,0.4)'; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='var(--border)'; el.style.background='var(--surface2)'; el.style.transform='translateY(0)'; el.style.boxShadow='none'; }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
                    <div style={{ fontSize:'28px' }}>{s.icon}</div>
                    <div style={{ ...mono, fontSize:'11px', letterSpacing:'2px', color:'rgba(192,20,42,0.5)' }}>{s.phase}</div>
                  </div>
                  <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:'rgba(192,20,42,0.1)', border:'1px solid rgba(192,20,42,0.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>
                    <span style={{ ...mono, fontSize:'13px', color:'var(--red2)' }}>{s.n}</span>
                  </div>
                  <div style={{ ...syne, fontWeight:700, fontSize:'18px', color:'#fff', marginBottom:'10px' }}>{s.title}</div>
                  <div style={{ ...inter, fontSize:'13.5px', color:'var(--muted2)', lineHeight:1.75 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contacto" style={{ padding:'140px 52px', background:'#050508', textAlign:'center' as const, position:'relative', overflow:'hidden', borderTop:'1px solid var(--border)' }}>
        {/* Background glow */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle,rgba(192,20,42,0.09),transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'500px', height:'500px', border:'1px solid rgba(192,20,42,0.07)', borderRadius:'50%', pointerEvents:'none', animation:'ring-spin 28s linear infinite' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'660px', height:'660px', border:'1px dashed rgba(192,20,42,0.04)', borderRadius:'50%', pointerEvents:'none', animation:'ring-spin 40s linear infinite reverse' }} />

        <div style={{ position:'relative', zIndex:2, maxWidth:'640px', margin:'0 auto' }}>
          <div style={{ ...mono, fontSize:'10px', letterSpacing:'4px', color:'var(--red2)', marginBottom:'20px' }}>// ACCESO DIRECTO</div>
          <h2 style={{ ...syne, fontWeight:800, fontSize:'clamp(44px,8vw,96px)', lineHeight:.95, color:'#fff', marginBottom:'20px' }}>
            ¿Tu empresa<br/>está <span className="shine-text">expuesta</span>?
          </h2>
          <p style={{ ...inter, fontSize:'16px', color:'var(--muted2)', lineHeight:1.75, marginBottom:'48px' }}>
            Hacemos un diagnóstico gratuito de seguridad. Sin compromisos, sin letra pequeña — solo claridad sobre tu postura actual.
          </p>

          {/* Email form */}
          <div style={{ display:'flex', maxWidth:'480px', margin:'0 auto 20px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', overflow:'hidden', background:'rgba(255,255,255,0.03)', transition:'border-color .3s' }}
            onFocus={e => (e.currentTarget as HTMLElement).style.borderColor='rgba(192,20,42,0.45)'}
            onBlur={e => (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.1)'}>
            <div style={{ display:'flex', alignItems:'center', padding:'0 16px' }}>
              <Mail size={15} color="#5a5870" />
            </div>
            <input type="email" placeholder="tu@empresa.com"
              style={{ flex:1, background:'transparent', border:'none', outline:'none', padding:'15px 8px', color:'#fff', ...inter, fontSize:'14px' }} />
            <button style={{ ...mono, fontSize:'10px', letterSpacing:'2px', padding:'15px 22px', background:'var(--red)', color:'#fff', border:'none', cursor:'pointer', transition:'background .3s', whiteSpace:'nowrap' as const }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--red2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--red)'; }}>
              SOLICITAR →
            </button>
          </div>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'24px', flexWrap:'wrap' as const }}>
            <span style={{ ...inter, fontSize:'12px', color:'var(--muted)', display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:'6px', height:'6px', background:'#22c55e', borderRadius:'50%', display:'inline-block' }} />
              Respuesta en menos de 24h
            </span>
            <span style={{ ...inter, fontSize:'12px', color:'var(--muted)', display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:'6px', height:'6px', background:'var(--red2)', borderRadius:'50%', display:'inline-block', boxShadow:'0 0 6px var(--red2)' }} />
              100% confidencial
            </span>
            <span style={{ ...inter, fontSize:'12px', color:'var(--muted)' }}>
              contacto@cipherred.tech
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', padding:'48px 52px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' as const, gap:'24px' }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <svg width="28" height="18" viewBox="0 0 64 40" fill="none">
              <path d="M32 2C28 6 22 14 16 10C8 6 2 12 4 20C10 18 16 20 20 24C22 30 26 34 32 36C38 34 42 30 44 24C48 20 54 18 60 20C62 12 56 6 48 10C42 14 36 6 32 2Z" fill="#C0142A"/>
              <ellipse cx="26" cy="16" rx="3.5" ry="5" fill="#050508"/>
              <ellipse cx="38" cy="16" rx="3.5" ry="5" fill="#050508"/>
            </svg>
            <span style={{ ...syne, fontWeight:800, fontSize:'17px', letterSpacing:'3px', color:'#fff' }}>
              CIPHER<span style={{ color:'var(--red2)' }}>RED</span>
            </span>
          </div>

          {/* Links */}
          <div style={{ display:'flex', gap:'32px', flexWrap:'wrap' as const }}>
            {['Servicios','Metodología','Contacto','LinkedIn','Instagram'].map(l => (
              <a key={l} href="#" style={{ ...inter, fontSize:'13px', color:'var(--muted)', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='var(--muted)'}>
                {l}
              </a>
            ))}
          </div>

          {/* Copy */}
          <div style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'var(--muted)' }}>
            © 2025 CIPHER RED S.A.S — MEDELLÍN, CO
          </div>
        </div>

        {/* Bottom accent */}
        <div style={{ maxWidth:'1280px', margin:'32px auto 0', paddingTop:'24px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'12px' }}>
          <div style={{ ...inter, fontSize:'12px', color:'var(--muted)' }}>
            Ley 1273 · Habeas Data · ISO 27001 · NIST CSF
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ width:'6px', height:'6px', background:'#22c55e', borderRadius:'50%', boxShadow:'0 0 6px #22c55e', display:'inline-block' }} />
            <span style={{ ...mono, fontSize:'10px', letterSpacing:'2px', color:'#22c55e' }}>SISTEMAS ACTIVOS</span>
          </div>
        </div>
      </footer>
    </>
  );
}
