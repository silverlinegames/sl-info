"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
    go: 0,
    hover: false,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip on real touch devices; headless "pointer: none" still allows tilt.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * max,
      ry: (px - 0.5) * max * 1.4,
      gx: px * 100,
      gy: py * 100,
      go: 1,
      hover: true,
    });
  };

  const onLeave = () =>
    setTilt((t) => ({ ...t, rx: 0, ry: 0, go: 0, hover: false }));

  return (
    <div
      ref={ref}
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.hover
          ? "transform 90ms ease-out"
          : "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      {glare ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.08), transparent 45%)`,
            opacity: tilt.go,
            transition: "opacity 500ms ease",
          }}
        />
      ) : null}
    </div>
  );
}
