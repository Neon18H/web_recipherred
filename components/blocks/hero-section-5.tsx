'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useScroll, motion } from 'motion/react'

const menuItems = [
  { name: 'Servicios',   href: '#servicios' },
  { name: 'Metodología', href: '#metodologia' },
  { name: 'Nosotros',    href: '#nosotros' },
  { name: 'Contacto',    href: '#contacto' },
]

const CLIENTS = [
  { name:'Bancolombia', src:'https://html.tailus.io/blocks/customers/nvidia.svg',      h:'20px' },
  { name:'EPM',         src:'https://html.tailus.io/blocks/customers/column.svg',      h:'16px' },
  { name:'Grupo Éxito', src:'https://html.tailus.io/blocks/customers/github.svg',      h:'16px' },
  { name:'Sura',        src:'https://html.tailus.io/blocks/customers/nike.svg',        h:'20px' },
  { name:'Nutresa',     src:'https://html.tailus.io/blocks/customers/lemonsqueezy.svg',h:'20px' },
  { name:'ISA',         src:'https://html.tailus.io/blocks/customers/laravel.svg',     h:'16px' },
  { name:'Argos',       src:'https://html.tailus.io/blocks/customers/lilly.svg',       h:'28px' },
  { name:'Ecopetrol',   src:'https://html.tailus.io/blocks/customers/openai.svg',      h:'24px' },
]

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden" style={{ background:'#050508' }}>

        {/* ── HERO ── */}
        <section>
          <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72" style={{ position:'relative' }}>

            {/* Content */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">

                {/* Badge */}
                <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(192,20,42,0.08)', border:'1px solid rgba(192,20,42,0.22)', padding:'7px 16px', borderRadius:'100px', marginBottom:'24px', marginTop:'32px' }}>
                  <span style={{ width:'7px', height:'7px', background:'#ff1a35', borderRadius:'50%', boxShadow:'0 0 8px #ff1a35', display:'inline-block', animation:'badge-pulse 2s infinite' }} />
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'10px', letterSpacing:'3px', color:'rgba(255,110,130,0.9)' }}>
                    OPERACIONES ACTIVAS · MEDELLÍN, CO
                  </span>
                </div>

                <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(44px,7vw,82px)', lineHeight:.95, color:'#fff', marginTop:'8px', marginBottom:'0', maxWidth:'720px' }}
                  className="lg:mt-16">
                  Protege lo que<br/>más{' '}
                  <em style={{
                    fontStyle:'normal',
                    background:'linear-gradient(135deg,#ff1a35 0%,#ff6b6b 45%,#ff1a35 100%)',
                    backgroundSize:'200% auto',
                    WebkitBackgroundClip:'text',
                    WebkitTextFillColor:'transparent',
                    backgroundClip:'text',
                    animation:'shine 3.5s linear infinite',
                  }}>importa</em>
                </h1>

                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'17px', fontWeight:300, color:'rgba(200,198,220,0.65)', lineHeight:1.8, maxWidth:'520px', marginTop:'24px', marginBottom:'0' }}
                  className="mt-8 max-w-2xl">
                  Inteligencia táctica, vigilancia permanente y respuesta inmediata ante amenazas digitales. Tu empresa bajo la protección más sofisticada de Colombia.
                </p>

                {/* Buttons */}
                <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <Button size="lg"
                    style={{ height:'48px', borderRadius:'9999px', paddingLeft:'24px', paddingRight:'16px', fontSize:'13px', background:'#C0142A', border:'none', fontFamily:"'Share Tech Mono',monospace", letterSpacing:'1px', transition:'all .3s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='#ff1a35';e.currentTarget.style.boxShadow='0 0 28px rgba(192,20,42,0.5)';e.currentTarget.style.transform='translateY(-1px)';}}
                    onMouseLeave={e=>{e.currentTarget.style.background='#C0142A';e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='translateY(0)';}}>
                    <span className="text-nowrap">DIAGNÓSTICO GRATIS</span>
                    <ChevronRight size={18} style={{ marginLeft:'4px' }} />
                  </Button>
                  <Button size="lg" variant="ghost"
                    style={{ height:'48px', borderRadius:'9999px', padding:'0 24px', fontSize:'13px', color:'rgba(200,198,220,0.7)', border:'1px solid rgba(255,255,255,0.1)', fontFamily:"'Share Tech Mono',monospace", letterSpacing:'1px', transition:'all .3s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(192,20,42,0.4)';e.currentTarget.style.color='rgba(255,100,120,0.9)';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='rgba(200,198,220,0.7)';}}>
                    <span className="text-nowrap">VER SERVICIOS</span>
                  </Button>
                </div>

                {/* Stats */}
                <div style={{ display:'flex', gap:'36px', flexWrap:'wrap', marginTop:'48px' }}>
                  {[
                    { num:'24', sup:'/7', label:'Monitoreo SOC' },
                    { num:'100', sup:'%', label:'Confidencial' },
                    { num:'<1h', sup:'', label:'Respuesta incidentes' },
                  ].map(s => (
                    <div key={s.label} style={{ paddingLeft:'16px', position:'relative' }}>
                      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'2px', background:'linear-gradient(to bottom,#C0142A,transparent)' }} />
                      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'32px', color:'#fff', lineHeight:1 }}>
                        {s.num}<sup style={{ fontSize:'14px', color:'#ff1a35' }}>{s.sup}</sup>
                      </div>
                      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'9px', letterSpacing:'2px', color:'#6b6b80', marginTop:'3px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video background */}
            <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl sm:aspect-video lg:rounded-[3rem]"
              style={{ border:'1px solid rgba(192,20,42,0.08)' }}>
              <video autoPlay loop muted playsInline
                style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.2, filter:'hue-rotate(320deg) saturate(1.8) brightness(0.55)' }}
                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477" />
              {/* Gradient overlays */}
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(5,5,8,0.97) 32%,rgba(5,5,8,0.55) 62%,rgba(5,5,8,0.12) 100%)' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(5,5,8,0.98) 0%,transparent 48%)' }} />
              {/* Red glow on right */}
              <div style={{ position:'absolute', top:'50%', right:'15%', transform:'translateY(-50%)', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(192,20,42,0.12),transparent 70%)', pointerEvents:'none' }} />
            </div>
          </div>
        </section>

        {/* ── CLIENTS ── */}
        <section style={{ background:'#050508', paddingBottom:'8px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <div className="group relative m-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div style={{ padding:'24px 24px 24px 0', borderRight:'1px solid rgba(255,255,255,0.07)', marginRight:'24px', minWidth:'160px', display:'none' }} className="md:block">
                <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'10px', letterSpacing:'2px', color:'#6b6b80', textAlign:'right' }}>
                  // EMPRESAS<br/>QUE CONFÍAN
                </p>
              </div>
              <div className="relative py-6 w-full md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={96}>
                  {CLIENTS.map(c => (
                    <div key={c.name} className="flex items-center" style={{ opacity:0.3, filter:'invert(1) sepia(1) hue-rotate(320deg) saturate(0.2) brightness(1.8)', transition:'opacity .3s' }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.opacity='0.6'}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.opacity='0.3'}>
                      <img src={c.src} alt={c.name} style={{ height:c.h, width:'auto', maxWidth:'120px' }} />
                    </div>
                  ))}
                </InfiniteSlider>
                <div style={{ position:'absolute', inset:'0 auto', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right,#050508,transparent)' }} />
                <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left,#050508,transparent)' }} />
                <ProgressiveBlur className="pointer-events-none absolute left-0 top-0 h-full w-20" direction="left" blurIntensity={0.5} />
                <ProgressiveBlur className="pointer-events-none absolute right-0 top-0 h-full w-20" direction="right" blurIntensity={0.5} />
              </div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Share+Tech+Mono&family=Inter:wght@300;400;500&display=swap');
        @keyframes badge-pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,26,53,0.35);}70%{box-shadow:0 0 0 8px rgba(255,26,53,0);}}
        @keyframes shine{to{background-position:200% center;}}
      `}</style>
    </>
  )
}

/* ── HEADER ── */
const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [scrolled, setScrolled]   = React.useState(false)
  const { scrollYProgress }       = useScroll()

  React.useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setScrolled(v > 0.03))
    return () => unsub()
  }, [scrollYProgress])

  return (
    <header>
      <nav data-state={menuState ? 'active' : undefined} className="group fixed z-20 w-full pt-2">
        <div className={cn(
          'mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12',
          scrolled && 'backdrop-blur-2xl'
        )} style={{ background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent', border: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent' }}>
          <motion.div key={1} className={cn(
            'relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6',
            scrolled && 'lg:py-4'
          )}>
            {/* Logo + mobile toggle */}
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center gap-3">
                <svg width="28" height="18" viewBox="0 0 64 40" fill="none">
                  <path d="M32 2C28 6 22 14 16 10C8 6 2 12 4 20C10 18 16 20 20 24C22 30 26 34 32 36C38 34 42 30 44 24C48 20 54 18 60 20C62 12 56 6 48 10C42 14 36 6 32 2Z" fill="#C0142A"/>
                  <ellipse cx="26" cy="16" rx="3.5" ry="5" fill="#050508"/>
                  <ellipse cx="38" cy="16" rx="3.5" ry="5" fill="#050508"/>
                </svg>
                <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'17px', letterSpacing:'3px', color:'#fff' }}>
                  CIPHER<span style={{ color:'#ff1a35' }}>RED</span>
                </span>
              </Link>

              <button onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Cerrar' : 'Menú'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu style={{ color:'#fff' }} className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X style={{ color:'#fff' }} className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              {/* Desktop nav */}
              <div className="hidden lg:block">
                <ul className="flex gap-8">
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href}
                        style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'10px', letterSpacing:'2px', color:'#6b6b80', textDecoration:'none', transition:'color .25s' }}
                        onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#fff'}
                        onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#6b6b80'}>
                        {item.name.toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — CTA */}
            <div className="group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:bg-transparent lg:p-0 lg:shadow-none"
              style={{ background:'rgba(13,13,18,0.98)', border:'1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={()=>{}} onMouseLeave={()=>{}}>
              {/* Mobile links */}
              <div className="lg:hidden w-full">
                <ul className="space-y-5">
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} onClick={() => setMenuState(false)}
                        style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'12px', letterSpacing:'2px', color:'#9898aa', textDecoration:'none' }}>
                        {item.name.toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Buttons */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button variant="outline" size="sm" asChild
                  style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'10px', letterSpacing:'2px', borderColor:'rgba(255,255,255,0.12)', color:'rgba(200,198,220,0.8)', background:'transparent' }}>
                  <Link href="#contacto"><span>CONTACTO</span></Link>
                </Button>
                <Button size="sm" asChild
                  style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'10px', letterSpacing:'2px', background:'#C0142A', border:'none' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='#ff1a35';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='#C0142A';}}>
                  <Link href="#contacto"><span>DIAGNÓSTICO</span></Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  )
}
