'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight, Shield, Eye, Zap, Globe, FileText, Search } from 'lucide-react'
import { useScroll, motion } from 'motion/react'

/* ─── HERO SECTION ─── */
export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden" style={{ background: '#03030a' }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative' }}>
          <div style={{ paddingTop: '96px', paddingBottom: '128px' }}>
            <div style={{ position: 'relative', zIndex: 10, margin: '0 auto', maxWidth: '80rem', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ maxWidth: '42rem' }}>

                {/* Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(192,20,42,0.08)', border: '1px solid rgba(192,20,42,0.25)', padding: '8px 18px', borderRadius: '100px', marginBottom: '32px', marginTop: '64px' }}>
                  <span style={{ width: '7px', height: '7px', background: '#ff1a35', borderRadius: '50%', boxShadow: '0 0 12px #ff1a35', animation: 'badge-pulse 2s infinite', display: 'inline-block' }} />
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,100,120,0.9)' }}>
                    OPERACIONES ACTIVAS · MEDELLÍN, CO
                  </span>
                </div>

                {/* Title */}
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(48px,7vw,88px)', lineHeight: '0.95', color: '#fff', marginBottom: '24px' }}>
                  Protege lo que<br />
                  más{' '}
                  <em style={{
                    fontStyle: 'normal',
                    background: 'linear-gradient(135deg,#ff1a35 0%,#ff6b6b 50%,#ff1a35 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shine 4s linear infinite',
                  }}>
                    importa
                  </em>
                </h1>

                {/* Divider */}
                <div style={{ height: '2px', background: 'linear-gradient(90deg,#C0142A,rgba(192,20,42,0.2),transparent)', marginBottom: '24px', borderRadius: '2px' }} />

                {/* Subtitle */}
                <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: '18px', fontWeight: 300, color: 'rgba(232,230,240,0.6)', lineHeight: 1.8, maxWidth: '36rem', marginBottom: '48px' }}>
                  Inteligencia táctica, vigilancia permanente y respuesta inmediata ante amenazas digitales. Tu empresa bajo la protección más sofisticada.
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '64px' }}>
                  <Button size="lg" style={{ height: '48px', borderRadius: '9999px', paddingLeft: '20px', paddingRight: '12px', fontSize: '14px', background: '#C0142A', border: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(192,20,42,0.5)'; e.currentTarget.style.background = '#ff1a35'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#C0142A'; }}>
                    <span style={{ whiteSpace: 'nowrap', fontFamily: "'Share Tech Mono',monospace", letterSpacing: '1px' }}>DIAGNÓSTICO GRATUITO</span>
                    <ChevronRight size={18} style={{ marginLeft: '4px' }} />
                  </Button>
                  <Button size="lg" variant="ghost" style={{ height: '48px', borderRadius: '9999px', padding: '0 20px', fontSize: '14px', color: 'rgba(232,230,240,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(192,20,42,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                    <span style={{ whiteSpace: 'nowrap', fontFamily: "'Share Tech Mono',monospace", letterSpacing: '1px' }}>VER SERVICIOS</span>
                  </Button>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
                  {[
                    { num: '24', sup: '/7', label: 'MONITOREO SOC' },
                    { num: '100', sup: '%', label: 'CONFIDENCIAL' },
                    { num: '0', sup: 's', label: 'TOLERANCIA AL RIESGO' },
                  ].map(s => (
                    <div key={s.label} style={{ paddingLeft: '18px', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom,#C0142A,transparent)' }} />
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '34px', color: '#fff', lineHeight: 1 }}>
                        {s.num}<sup style={{ fontSize: '14px', color: '#ff1a35' }}>{s.sup}</sup>
                      </div>
                      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '9px', letterSpacing: '2px', color: '#5a5870', marginTop: '4px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Background video — cyber/tech */}
            <div style={{ position: 'absolute', inset: '4px', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(192,20,42,0.1)' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, filter: 'hue-rotate(330deg) saturate(2) brightness(0.6)' }}
                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
              />
              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(3,3,10,0.95) 35%,rgba(3,3,10,0.6) 65%,rgba(3,3,10,0.2) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(3,3,10,0.95) 0%,transparent 50%)' }} />
            </div>
          </div>
        </section>

        {/* ── CLIENTS SLIDER ── */}
        <section style={{ background: '#03030a', paddingBottom: '8px', borderTop: '1px solid rgba(192,20,42,0.1)' }}>
          <div style={{ margin: '0 auto', maxWidth: '80rem', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ padding: '24px 0', width: '100%', position: 'relative' }}>
                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '10px', letterSpacing: '3px', color: '#5a5870', textAlign: 'center', marginBottom: '20px' }}>
                  // EMPRESAS QUE NOS CONFÍAN SU SEGURIDAD
                </p>
                <InfiniteSlider speedOnHover={15} speed={35} gap={80}>
                  {[
                    { name: 'Bancolombia', src: 'https://html.tailus.io/blocks/customers/nvidia.svg' },
                    { name: 'EPM', src: 'https://html.tailus.io/blocks/customers/column.svg' },
                    { name: 'Grupo Éxito', src: 'https://html.tailus.io/blocks/customers/github.svg' },
                    { name: 'Sura', src: 'https://html.tailus.io/blocks/customers/nike.svg' },
                    { name: 'Nutresa', src: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg' },
                    { name: 'ISA', src: 'https://html.tailus.io/blocks/customers/laravel.svg' },
                    { name: 'Cementos Argos', src: 'https://html.tailus.io/blocks/customers/lilly.svg' },
                    { name: 'Ecopetrol', src: 'https://html.tailus.io/blocks/customers/openai.svg' },
                  ].map((c) => (
                    <div key={c.name} style={{ display: 'flex', alignItems: 'center', opacity: 0.4, filter: 'invert(1) sepia(1) hue-rotate(320deg) saturate(0.3) brightness(1.5)' }}>
                      <img src={c.src} alt={c.name} style={{ height: '20px', width: 'auto' }} />
                    </div>
                  ))}
                </InfiniteSlider>
                <ProgressiveBlur className="pointer-events-none absolute left-0 top-0 h-full w-20" direction="left" blurIntensity={1} />
                <ProgressiveBlur className="pointer-events-none absolute right-0 top-0 h-full w-20" direction="right" blurIntensity={1} />
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ padding: '112px 52px', background: '#03030a' }}>
          <div style={{ margin: '0 auto', maxWidth: '80rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '10px', letterSpacing: '4px', color: '#ff1a35', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ width: '32px', height: '1px', background: '#C0142A', display: 'inline-block' }} /> SERVICIOS
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(38px,5vw,68px)', lineHeight: 1.05, color: '#fff', marginBottom: '56px' }}>
              Lo que <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#ff1a35,#ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>hacemos</em>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)' }}>
              {SERVICES.map((s, i) => (
                <ServiceCard key={i} {...s} index={i} />
              ))}
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;700&display=swap');
        @keyframes badge-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,26,53,0.4);}70%{box-shadow:0 0 0 10px rgba(255,26,53,0);} }
        @keyframes shine { to{background-position:200% center;} }
      `}</style>
    </>
  )
}

/* ─── SERVICE CARD ─── */
const SERVICES = [
  { icon: Search,    n: '01', title: 'Gestión de Vulnerabilidades', desc: 'Escaneo continuo, análisis de riesgo y remediación guiada. Identificamos cada grieta antes que el atacante.', tags: ['ESCANEO', 'ANÁLISIS', 'REMEDIACIÓN'] },
  { icon: Shield,    n: '02', title: 'Operaciones SOC',             desc: 'Implementamos y administramos tu Centro de Operaciones. Monitoreo 24/7, detección en tiempo real.', tags: ['SIEM', '24/7', 'ALERTAS'] },
  { icon: Zap,       n: '03', title: 'Respuesta a Incidentes',      desc: 'Contenemos, investigamos y eliminamos amenazas. Forense digital y recuperación total de operaciones.', tags: ['DFIR', 'FORENSE', 'CONTENCIÓN'] },
  { icon: Eye,       n: '04', title: 'OSINT e Inteligencia',        desc: 'Mapeamos tu exposición digital. Identificamos actores maliciosos antes de que lleguen a tu organización.', tags: ['RECONOCIMIENTO', 'EXPOSICIÓN'] },
  { icon: Globe,     n: '05', title: 'Ciberinteligencia',           desc: 'Operamos en la dark web para detectar filtraciones, credenciales comprometidas y planes de ataque.', tags: ['DARK WEB', 'THREAT INTEL'] },
  { icon: FileText,  n: '06', title: 'Consultoría y Cumplimiento',  desc: 'ISO 27001, NIST y normativas colombianas. Evaluaciones de riesgo y preparación para auditorías.', tags: ['ISO 27001', 'NIST', 'SFC'] },
]

function ServiceCard({ icon: Icon, n, title, desc, tags }: typeof SERVICES[0] & { index: number }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#0a0a16' : '#07070f',
        padding: '40px 30px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'background .4s',
      }}>
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,transparent,#C0142A,transparent)', transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform .5s' }} />
      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0 0,rgba(192,20,42,0.07),transparent 65%)', opacity: hovered ? 1 : 0, transition: 'opacity .4s', pointerEvents: 'none' }} />

      {/* Number */}
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '68px', color: hovered ? 'rgba(192,20,42,0.06)' : 'rgba(255,255,255,0.03)', position: 'absolute', top: '14px', right: '18px', lineHeight: 1, transition: 'color .4s' }}>{n}</div>

      {/* Icon */}
      <div style={{ width: '52px', height: '52px', background: 'rgba(192,20,42,0.08)', border: `1px solid ${hovered ? 'rgba(192,20,42,0.5)' : 'rgba(192,20,42,0.2)'}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', transition: 'all .4s', boxShadow: hovered ? '0 0 24px rgba(192,20,42,0.2)' : 'none' }}>
        <Icon size={22} color="#C0142A" />
      </div>

      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '19px', color: '#fff', marginBottom: '10px', letterSpacing: '.5px' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: '#5a5870', lineHeight: 1.85 }}>{desc}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {tags.map(t => (
            <span key={t} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '9px', letterSpacing: '1px', padding: '3px 9px', background: 'rgba(192,20,42,0.07)', border: '1px solid rgba(192,20,42,0.15)', color: 'rgba(192,20,42,0.65)', borderRadius: '4px' }}>{t}</span>
          ))}
        </div>
        <span style={{ color: '#C0142A', fontSize: '18px', opacity: hovered ? 1 : 0, transform: hovered ? 'translate(4px,-4px)' : 'translate(0,0)', transition: 'all .3s' }}>↗</span>
      </div>
    </div>
  )
}

/* ─── HEADER ─── */
const menuItems = [
  { name: 'Servicios',   href: '#servicios' },
  { name: 'Metodología', href: '#metodologia' },
  { name: 'Nosotros',    href: '#nosotros' },
  { name: 'Contacto',    href: '#contacto' },
]

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [scrolled, setScrolled]   = React.useState(false)
  const { scrollYProgress }       = useScroll()

  React.useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setScrolled(v > 0.03))
    return () => unsub()
  }, [scrollYProgress])

  return (
    <header>
      <nav
        data-state={menuState ? 'active' : undefined}
        className="group fixed z-20 w-full pt-2">
        <div className={cn(
          'mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12',
          scrolled && 'bg-[rgba(3,3,10,0.75)] backdrop-blur-2xl'
        )}>
          <motion.div
            key={1}
            className={cn(
              'relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6',
              scrolled && 'lg:py-4'
            )}>
            {/* Logo */}
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <CipherRedLogo />
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Cerrar menú' : 'Abrir menú'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-white" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-white" />
              </button>

              {/* Desktop links */}
              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href}
                        style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '10px', letterSpacing: '2px', color: '#5a5870', textDecoration: 'none', transition: 'color .3s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5a5870'}>
                        {item.name.toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side */}
            <div className="bg-[rgba(3,3,10,0.95)] group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-[rgba(255,255,255,0.08)] p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              {/* Mobile menu links */}
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href}
                        style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '12px', letterSpacing: '2px', color: '#5a5870', textDecoration: 'none' }}
                        onClick={() => setMenuState(false)}>
                        {item.name.toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button variant="outline" size="sm"
                  style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '10px', letterSpacing: '2px', borderColor: 'rgba(255,255,255,0.12)', color: '#fff' }}>
                  CONTACTO
                </Button>
                <Button size="sm"
                  style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '10px', letterSpacing: '2px', background: '#C0142A', border: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ff1a35'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#C0142A'; }}>
                  DIAGNÓSTICO GRATIS
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  )
}

/* ─── LOGO ─── */
const CipherRedLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <svg width="32" height="20" viewBox="0 0 64 40" fill="none">
      <path d="M32 2C28 6 22 14 16 10C8 6 2 12 4 20C10 18 16 20 20 24C22 30 26 34 32 36C38 34 42 30 44 24C48 20 54 18 60 20C62 12 56 6 48 10C42 14 36 6 32 2Z" fill="#C0142A" />
      <ellipse cx="26" cy="16" rx="3.5" ry="5" fill="#03030a" />
      <ellipse cx="38" cy="16" rx="3.5" ry="5" fill="#03030a" />
    </svg>
    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '18px', letterSpacing: '3px', color: '#fff' }}>
      CIPHER<span style={{ color: '#ff1a35' }}>RED</span>
    </span>
  </div>
)
