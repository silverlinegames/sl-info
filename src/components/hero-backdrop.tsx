"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo 3D del hero, 100% CSS (sin WebGL).
 * Sustituye a la antigua escena de three.js para mantener la página ligera:
 * - Rejilla en perspectiva con movimiento hacia el espectador
 * - Fragmentos plateados flotando con rotación 3D
 * - Chispas con parpadeo
 * - Parallax sutil que sigue al ratón
 */

const CLIP_CRYSTAL = "polygon(50% 0%, 100% 38%, 78% 100%, 22% 100%, 0% 38%)";
const CLIP_DIAMOND = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
const CLIP_SHARD = "polygon(20% 0%, 100% 30%, 78% 100%, 0% 64%)";

type ShardDef = {
  top: string;
  left?: string;
  right?: string;
  size: number;
  depth: number;
  delay: number;
  duration: number;
  clip: string;
  /** Solo visible a partir de sm (en móvil estorban junto al texto) */
  sm?: boolean;
};

const SHARDS: ShardDef[] = [
  { top: "13%", left: "6%", size: 46, depth: 26, delay: 0, duration: 13, clip: CLIP_CRYSTAL, sm: true },
  { top: "24%", right: "7%", size: 64, depth: 34, delay: 1.6, duration: 16, clip: CLIP_DIAMOND, sm: true },
  { top: "55%", left: "10%", size: 34, depth: 18, delay: 3.1, duration: 12, clip: CLIP_SHARD, sm: true },
  { top: "64%", right: "10%", size: 44, depth: 22, delay: 0.8, duration: 15, clip: CLIP_CRYSTAL, sm: true },
  { top: "38%", right: "28%", size: 28, depth: 15, delay: 2.2, duration: 11, clip: CLIP_SHARD, sm: true },
  { top: "12%", left: "8%", size: 22, depth: 12, delay: 4.0, duration: 12, clip: CLIP_SHARD },
  { top: "79%", right: "9%", size: 30, depth: 14, delay: 1.2, duration: 14, clip: CLIP_DIAMOND },
];

const SPARKS: {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}[] = [
  { top: "16%", left: "18%", size: 2, delay: 0, duration: 4.2 },
  { top: "22%", left: "62%", size: 3, delay: 1.1, duration: 5.4 },
  { top: "10%", left: "42%", size: 2, delay: 2.3, duration: 4.6 },
  { top: "30%", left: "78%", size: 2, delay: 0.6, duration: 5.8 },
  { top: "34%", left: "30%", size: 3, delay: 3.2, duration: 4.4 },
  { top: "44%", left: "12%", size: 2, delay: 1.8, duration: 5.1 },
  { top: "48%", left: "88%", size: 2, delay: 2.7, duration: 4.8 },
  { top: "58%", left: "22%", size: 2, delay: 0.3, duration: 5.6 },
  { top: "62%", left: "70%", size: 3, delay: 3.6, duration: 4.5 },
  { top: "70%", left: "46%", size: 2, delay: 1.4, duration: 5.2 },
  { top: "74%", left: "86%", size: 2, delay: 2.0, duration: 4.9 },
  { top: "82%", left: "30%", size: 2, delay: 0.9, duration: 5.5 },
  { top: "86%", left: "58%", size: 3, delay: 2.9, duration: 4.3 },
  { top: "28%", left: "52%", size: 2, delay: 4.1, duration: 5.7 },
];

export function HeroBackdrop() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const nodes = Array.from(
      el.querySelectorAll<HTMLElement>("[data-depth]")
    );
    if (nodes.length === 0) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      for (const n of nodes) {
        const d = Number(n.dataset.depth ?? 0);
        n.style.transform = `translate3d(${(-cx * d).toFixed(2)}px, ${(
          -cy *
          d *
          0.6
        ).toFixed(2)}px, 0)`;
      }
      if (Math.abs(tx - cx) > 0.0005 || Math.abs(ty - cy) > 0.0005) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Resplandor del horizonte */}
      <div className="absolute inset-x-0 top-[58%] h-28 bg-[radial-gradient(ellipse_55%_100%_at_50%_0%,rgba(200,204,216,0.10),transparent_72%)]" />

      {/* Suelo de rejilla en perspectiva */}
      <div className="sl-grid-floor" />

      {/* Fragmentos plateados flotando */}
      {SHARDS.map((s, i) => (
        <div
          key={i}
          data-depth={s.depth}
          className={`absolute ${s.sm ? "hidden sm:block" : ""}`}
          style={{ top: s.top, left: s.left, right: s.right }}
        >
          <div
            className="sl-shard"
            style={{
              width: s.size,
              height: s.size,
              clipPath: s.clip,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        </div>
      ))}

      {/* Chispas */}
      {SPARKS.map((p, i) => (
        <span
          key={i}
          className="sl-spark"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
