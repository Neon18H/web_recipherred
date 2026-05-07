'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import type { Mesh } from 'three';
import {
  abs, blendScreen, float, mod, mx_cell_noise_float,
  oneMinus, smoothstep, texture, uniform, uv, vec2, vec3, pass, mix, add
} from 'three/tsl';

// Textures — cyber/tech imagery with depth map for parallax
const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP   = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp'  };

extend(THREE as any);

/* ─────────────────────────────────────────
   POST PROCESSING — bloom + red scan line
───────────────────────────────────────── */
function PostProcessing({
  strength = 1.2,
  threshold = 0.8,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef<any>({ value: 0 });

  const render = useMemo(() => {
    const pp        = new (THREE as any).PostProcessing(gl);
    const scenePass = pass(scene, camera);
    const color     = scenePass.getTextureNode('output');
    const bloomPass = bloom(color, strength, 0.5, threshold);

    const uScan    = uniform(0);
    progressRef.current = uScan;

    const scanPos  = float((uScan as any).value);
    const uvY      = uv().y;
    const width    = float(0.04);
    const line     = smoothstep(0, width, abs(uvY.sub(scanPos)));
    // Cipher Red brand color overlay
    const overlay  = vec3(0.75, 0.08, 0.16).mul(oneMinus(line)).mul(0.5);
    const withScan = mix(
      color,
      add(color, overlay),
      fullScreenEffect ? smoothstep(0.88, 1.0, oneMinus(line)) : 1.0
    );
    pp.outputNode = withScan.add(bloomPass);
    return pp;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.4) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
}

/* ─────────────────────────────────────────
   SCENE — depth-map parallax + red dot flow
───────────────────────────────────────── */
const W = 300, H = 300;

function Scene() {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer  = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);

    const tDepth  = texture(depthMap);
    const tMap    = texture(rawMap, uv().add(tDepth.r.mul(uPointer as any).mul(0.012)));

    const aspect   = float(W).div(H);
    const tUv      = vec2(uv().x.mul(aspect), uv().y);
    const tiling   = vec2(120.0);
    const tiledUv  = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const bright   = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist     = float((tiledUv as any).length());
    const dot      = float(smoothstep(0.5, 0.49, dist)).mul(bright);
    const flow     = oneMinus(smoothstep(0, 0.02, abs(tDepth.sub(uProgress as any))));
    // Cipher Red — rojo puro en los dots de profundidad
    const mask     = dot.mul(flow).mul(vec3(10, 0, 0));
    const final    = blendScreen(tMap, mask);

    const mat = new (THREE as any).MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material: mat, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(W, H);

  useFrame(({ clock }) => {
    (uniforms.uProgress as any).value = Math.sin(clock.getElapsedTime() * 0.4) * 0.5 + 0.5;
    if (meshRef.current) {
      const mat = meshRef.current.material as any;
      if (mat?.opacity !== undefined)
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.06);
    }
  });

  useFrame(({ pointer }) => {
    (uniforms.uPointer as any).value = pointer;
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.44, h * 0.44, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   HERO — HTML overlay + Canvas
───────────────────────────────────────── */
export default function HeroWebGPU() {
  const words   = ['Protege', 'lo', 'que', 'más', 'importa'];
  const subtitle = 'Inteligencia táctica. Vigilancia permanente. Respuesta inmediata.';

  const [visibleWords,    setVisibleWords]    = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays,          setDelays]          = useState<number[]>([]);

  useEffect(() => {
    setDelays(words.map(() => Math.random() * 0.06));
  }, []);

  useEffect(() => {
    if (visibleWords < words.length) {
      const t = setTimeout(() => setVisibleWords(v => v + 1), 480);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSubtitleVisible(true), 650);
    return () => clearTimeout(t);
  }, [visibleWords, words.length]);

  return (
    <div className="relative h-screen overflow-hidden" style={{ background: '#03030a' }}>

      {/* ── Three.js Canvas (full screen) ── */}
      <Canvas
        className="absolute inset-0 w-full h-full"
        flat
        gl={async (props: any) => {
          const r = new (THREE as any).WebGPURenderer(props);
          await r.init();
          return r;
        }}
      >
        <PostProcessing />
        <Scene />
      </Canvas>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, rgba(3,3,10,0.93) 30%, rgba(3,3,10,0.5) 60%, rgba(3,3,10,0.1) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, rgba(3,3,10,0.9) 0%, transparent 45%)' }} />

      {/* ── Grid mesh ── */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        backgroundImage: 'linear-gradient(rgba(192,20,42,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(192,20,42,0.035) 1px,transparent 1px)',
        backgroundSize: '70px 70px',
        maskImage: 'radial-gradient(ellipse at 28% 50%, rgba(0,0,0,0.6) 0%, transparent 58%)',
      }} />

      {/* ── Content ── */}
      <div className="relative z-20 h-full flex flex-col justify-center px-14 max-w-[640px]">

        {/* Badge */}
        <div className="word-reveal self-start inline-flex items-center gap-3 mb-9 px-5 py-2 rounded-full"
          style={{ background: 'rgba(192,20,42,0.08)', border: '1px solid rgba(192,20,42,0.25)', animationDelay: '0.1s' }}>
          <span className="badge-dot" />
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,100,120,0.9)' }}>
            OPERACIONES ACTIVAS · MEDELLÍN, CO
          </span>
        </div>

        {/* Title — word by word reveal */}
        <h1 className="font-extrabold text-white mb-6 leading-[.94]"
          style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(54px,7.5vw,90px)' }}>
          {words.map((word, i) => (
            <span
              key={i}
              className={i < visibleWords ? 'word-reveal' : 'opacity-0'}
              style={{
                animationDelay: `${i * 0.11 + (delays[i] || 0)}s`,
                display: 'inline-block',
                marginRight: '0.28em',
                // Last word gets the red gradient
                ...(i === words.length - 1 ? {
                  background: 'linear-gradient(135deg,#ff1a35 0%,#ff6b6b 50%,#ff1a35 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shine 4s linear infinite',
                } : {}),
              }}>
              {word}
            </span>
          ))}
        </h1>

        {/* Divider line */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg,#C0142A,rgba(192,20,42,0.15),transparent)',
          width: subtitleVisible ? '100%' : '0%',
          transition: 'width 0.9s ease',
          marginBottom: '28px',
          borderRadius: '2px',
        }} />

        {/* Subtitle */}
        <p className={subtitleVisible ? 'fade-up-anim' : 'opacity-0'}
          style={{
            fontFamily: "'Rajdhani',sans-serif",
            fontSize: '17px', fontWeight: 300,
            color: 'rgba(232,230,240,0.55)',
            lineHeight: 1.85, maxWidth: '430px',
            marginBottom: '44px',
            animationDelay: '0.05s',
          }}>
          {subtitle}
        </p>

        {/* Buttons */}
        <div className={`flex gap-4 flex-wrap mb-14 ${subtitleVisible ? 'fade-up-anim' : 'opacity-0'}`}
          style={{ animationDelay: '0.15s' }}>
          <button
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: '11px', letterSpacing: '2px',
              padding: '14px 32px',
              background: '#C0142A', color: '#fff',
              border: 'none', borderRadius: '6px', cursor: 'pointer',
              transition: 'all .3s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.boxShadow = '0 0 40px rgba(192,20,42,0.6)';
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.boxShadow = 'none';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}>
            DIAGNÓSTICO GRATUITO
          </button>
          <button
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: '11px', letterSpacing: '2px',
              padding: '14px 32px',
              background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '6px', cursor: 'pointer',
              transition: 'all .3s',
            }}
            onMouseEnter={e => {
              const el = e.target as HTMLElement;
              el.style.borderColor = 'rgba(192,20,42,0.5)';
              el.style.color = '#ff1a35';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const el = e.target as HTMLElement;
              el.style.borderColor = 'rgba(255,255,255,0.12)';
              el.style.color = '#fff';
              el.style.transform = 'translateY(0)';
            }}>
            Ver Servicios ↓
          </button>
        </div>

        {/* Stats */}
        <div className={`flex gap-10 ${subtitleVisible ? 'fade-up-anim' : 'opacity-0'}`}
          style={{ animationDelay: '0.25s' }}>
          {[
            { num: '24',  sup: '/7', label: 'MONITOREO SOC' },
            { num: '100', sup: '%',  label: 'CONFIDENCIAL' },
            { num: '0',   sup: 's',  label: 'TOLERANCIA AL RIESGO' },
          ].map(s => (
            <div key={s.label} className="pl-5 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ background: 'linear-gradient(to bottom, #C0142A, transparent)' }} />
              <div className="font-extrabold text-white leading-none"
                style={{ fontFamily: "'Syne',sans-serif", fontSize: '36px' }}>
                {s.num}
                <sup style={{ fontSize: '16px', color: '#ff1a35' }}>{s.sup}</sup>
              </div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '9px', letterSpacing: '2px', color: '#5a5870', marginTop: '4px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      {subtitleVisible && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 fade-up-anim"
          style={{ animationDelay: '0.5s' }}>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '9px', letterSpacing: '3px', color: '#5a5870' }}>SCROLL</span>
          <div className="w-px h-8 animate-bounce"
            style={{ background: 'linear-gradient(to bottom, #C0142A, transparent)' }} />
        </div>
      )}
    </div>
  );
}
