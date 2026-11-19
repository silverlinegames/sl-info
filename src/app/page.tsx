"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  Boxes,
  CircleCheck,
  Gauge,
  Handshake,
  Heart,
  Layers,
  Megaphone,
  Menu,
  ScrollText,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  Trophy,
  Twitch,
  Users,
  Wallet,
  Youtube,
  Rocket,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/tilt-card";
import { HeroBackdrop } from "@/components/hero-backdrop";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/* ---------------------------------- data ---------------------------------- */

/** Prefija las rutas de assets con el basePath (necesario en GitHub Pages). */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${BASE_PATH}${path}`;

const NAV_LINKS = [
  { href: "#edr", label: "EDR" },
  { href: "#filosofia", label: "Filosofía" },
  { href: "#inversion", label: "Inversión" },
  { href: "#ventas", label: "Ventas" },
  { href: "#crecimiento", label: "Crecimiento" },
  { href: "#equipo", label: "Equipo" },
  { href: "#ruta", label: "Ruta" },
];

const PILLARS = [
  {
    icon: Sparkles,
    title: "Originalidad",
    text: "Cada idea nace dentro del estudio. Nada de clones: juegos con identidad propia.",
  },
  {
    icon: Layers,
    title: "Todos los géneros",
    text: "Historia, cooperativo, acción y más. No nos encasillamos: cada juego explora lo que su idea pide.",
  },
  {
    icon: Gauge,
    title: "Accesibles",
    text: "Mecánicas claras que cualquiera disfruta desde el primer minuto, sin sacrificar profundidad.",
  },
  {
    icon: TrendingUp,
    title: "Evolución",
    text: "Con cada proyecto subimos el listón: más técnica, más creatividad, más ambición.",
  },
];

const GENRES = [
  { icon: BookOpen, label: "Historia" },
  { icon: Users, label: "Cooperativo" },
  { icon: Swords, label: "Acción" },
];

const PHASES = [
  {
    phase: "Fase 1 · Ahora",
    icon: Wallet,
    title: "Arranque del desarrollo",
    cost: "$1,745",
    costDetail: "Suscripción de Claude",
    text: "La herramienta con la que desarrollaremos EDR, nuestro primer juego: programación, diseño e iteración asistida por IA desde el primer día.",
    contribution: "Aporte inicial de $435 MXN por socio",
  },
  {
    phase: "Fase 2 · Al terminar el juego",
    icon: Rocket,
    title: "Publicación en Steam",
    cost: "$1,745",
    costDetail: "Tarifa única de Steam Direct",
    text: "La tarifa que pide Steam para publicar EDR en su tienda. Solo se paga cuando el juego esté terminado y listo para el mundo.",
    contribution: "Aporte de $435 MXN por socio al lanzar",
  },
];

const STATS = [
  { value: "$1,745", label: "Suscripción de Claude", sub: "Fase 1 · Desarrollo" },
  { value: "$1,745", label: "Publicación en Steam", sub: "Fase 2 · Lanzamiento" },
  { value: "$435", label: "Por socio en cada fase", sub: "Entre 4 socios" },
  { value: "$870", label: "Inversión total por socio", sub: "Fase 1 + Fase 2" },
];

/** Plan de ventas: matemática de ingresos con la meta de 100 copias (precio medio $7.50 USD). */
const SALES_MATH = [
  { value: "$750", label: "Ingresos brutos", sub: "100 copias × $7.50 USD" },
  { value: "−$225", label: "Comisión de Steam", sub: "30% estándar de la tienda" },
  { value: "$525", label: "Ingresos netos", sub: "Lo que recibe el estudio" },
];

/** Plan de ventas: escalera de metas por copias vendidas (neto tras el 30% de Steam). */
const SALES_MILESTONES = [
  {
    icon: Rocket,
    step: "Meta 1",
    copies: "100",
    title: "Despegue",
    net: "$350 – $700 USD netos",
    text: "La meta mínima por juego: valida el título, cubre la tarifa de Steam Direct y supera la inversión inicial completa del estudio.",
    current: true,
  },
  {
    icon: TrendingUp,
    step: "Meta 2",
    copies: "500",
    title: "Crecimiento",
    net: "$1,750 – $3,500 USD netos",
    text: "El juego ya se paga solo con holgura: financia el desarrollo completo del siguiente título y herramientas nuevas.",
    current: false,
  },
  {
    icon: Trophy,
    step: "Meta 3",
    copies: "1,000+",
    title: "Consolidación",
    net: "$3,500 – $7,000 USD netos",
    text: "El estudio se sostiene por sí mismo: presupuesto para proyectos más ambiciosos, marketing propio y espacio para crecer.",
    current: false,
  },
];

/** Plan de ventas: acciones para alcanzar las primeras 100 copias. */
const SALES_ACTIONS = [
  {
    icon: Heart,
    title: "Lista de deseos desde temprano",
    text: "La página de Steam de cada juego se publicará desde las primeras fases de desarrollo: cada lista de deseos es un comprador asegurado al que Steam avisa el día del lanzamiento.",
  },
  {
    icon: Youtube,
    title: "Claves para creadores",
    text: "Las keys gratis que daremos a YouTubers y streamers generan vídeos y directos: la publicidad más honesta que existe para un juego nuevo.",
  },
  {
    icon: BadgeDollarSign,
    title: "Precio de impulso",
    text: "A $5–10 USD comprar el juego es una decisión de segundos — perfecta para el tráfico que traigan los creadores de contenido.",
  },
  {
    icon: Megaphone,
    title: "Promoción constante",
    text: "Las cuentas del estudio mantienen cada título visible antes, durante y después del lanzamiento, con avances y detrás de cámaras.",
  },
];

const GROWTH = [
  {
    icon: Youtube,
    extraIcon: Twitch,
    title: "Regalar EDR a creadores",
    text: "Buscaremos YouTubers y streamers pequeños y les daremos EDR gratis para que lo prueben y lo compartan con su audiencia. Cada vídeo y cada directo nos acerca a nuevos jugadores.",
  },
  {
    icon: Megaphone,
    title: "Promoción directa",
    text: "Nuestro Director de Marketing abrirá una cuenta dedicada a promocionar el estudio: avances del desarrollo de EDR, detrás de cámaras y cada nuevo lanzamiento.",
  },
];

const FLOW_STEPS = [
  { icon: Swords, title: "EDR terminado" },
  { icon: Handshake, title: "Claves gratis para creadores" },
  { icon: Youtube, title: "Vídeos y directos" },
  { icon: Users, title: "Nuevos jugadores" },
];

const TEAM = [
  {
    icon: Swords,
    name: "Alvaro",
    role: "Director de Gameplay y Desarrollo",
    ceo: true,
    text: "Dirige el diseño de mecánicas y el desarrollo técnico de nuestros juegos.",
  },
  {
    icon: Boxes,
    name: "Alaniz",
    role: "Director de Animación y Modelaje 3D",
    ceo: false,
    text: "Da forma y movimiento a los mundos de Silverline: personajes, modelos y animación.",
  },
  {
    icon: ScrollText,
    name: "Adán",
    role: "Director de Narrativa y Lore",
    ceo: false,
    text: "Historiador y guionista del estudio: escribe las historias y construye el universo de nuestros juegos.",
  },
  {
    icon: Megaphone,
    name: "Ragnar",
    role: "Director de Marketing",
    ceo: false,
    text: "Lidera la promoción del estudio y la conexión con creadores de contenido y la comunidad.",
  },
];

const ROADMAP = [
  {
    step: "01",
    title: "Empezar simple, con identidad",
    text: "Proyectos accesibles y con ideas propias — como EDR, que mezcla historia, cooperativo y acción.",
  },
  {
    step: "02",
    title: "Más nivel técnico y creativo",
    text: "Cada juego terminado nos permite subir la exigencia: mejores sistemas, mejor arte y narrativas más profundas.",
  },
  {
    step: "03",
    title: "Un estudio en crecimiento",
    text: "La experiencia acumulada y nuestra comunidad nos llevan a proyectos cada vez más ambiciosos.",
  },
];

/* --------------------------------- helpers -------------------------------- */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <FadeIn className="mx-auto max-w-2xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-zinc-500">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-[0_10px_24px_rgba(0,0,0,0.9)] sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </FadeIn>
  );
}

const cardBase =
  "h-full rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)] transition-colors duration-300 hover:border-zinc-600/70 [transform-style:preserve-3d]";

/* ---------------------------------- page ---------------------------------- */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-300">
      {/* ------------------------------- header ------------------------------ */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/60 bg-black/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#inicio"
            className="flex items-center gap-2.5"
            aria-label="Silverline Games — ir al inicio"
          >
            <Image
              src={asset("/silverline-emblem.webp")}
              alt="Emblema del dragón de Silverline Games"
              width={140}
              height={200}
              className="h-9 w-auto mix-blend-screen"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="text-sm font-extrabold tracking-[0.18em] text-zinc-100">
                SILVERLINE
              </span>
              <span className="mt-1 text-[9px] font-semibold tracking-[0.55em] text-zinc-500">
                GAMES
              </span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 text-zinc-300 hover:bg-zinc-900 hover:text-white lg:hidden"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-zinc-800 bg-black p-0"
            >
              <SheetHeader className="border-b border-zinc-900 p-4">
                <SheetTitle className="flex items-center gap-2.5">
                  <Image
                    src={asset("/silverline-emblem.webp")}
                    alt=""
                    width={140}
                    height={200}
                    className="h-8 w-auto mix-blend-screen"
                  />
                  <span className="flex flex-col leading-none">
                    <span className="text-xs font-extrabold tracking-[0.18em] text-zinc-100">
                      SILVERLINE
                    </span>
                    <span className="mt-1 text-[8px] font-semibold tracking-[0.55em] text-zinc-500">
                      GAMES
                    </span>
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Menú de navegación de Silverline Games
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-3" aria-label="Navegación móvil">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[48px] items-center rounded-lg px-4 text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* -------------------------------- hero ------------------------------- */}
        <section
          id="inicio"
          className="relative overflow-hidden"
          aria-label="Presentación de Silverline Games"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-160px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-zinc-500/10 blur-[130px]" />
            <div className="absolute left-1/2 top-1/3 h-[280px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[110px]" />
          </div>

          {/* Fondo 3D (CSS puro, sin WebGL) */}
          <HeroBackdrop />

          {/* soft vignette to keep content readable over the 3D scene */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_52%,rgba(0,0,0,0.5),transparent_72%)]"
          />

          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <Image
                src={asset("/silverline-logo.webp")}
                alt="Silverline Games: emblema del dragón plateado y nombre del estudio"
                width={900}
                height={491}
                priority
                className="sl-float h-auto w-64 mix-blend-screen drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:w-80 md:w-[26rem] lg:w-[28rem]"
              />
            </motion.div>

            <h1 className="sr-only">Silverline Games</h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="mt-8 text-xl font-bold text-zinc-100 sm:text-2xl"
            >
              Estudio independiente de videojuegos
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="mt-3 max-w-xl text-balance text-sm leading-relaxed text-zinc-400 sm:text-base"
            >
              Historia, cooperativo, acción y más. Creamos juegos originales
              de todos los géneros y subimos el nivel con cada título — el
              primero, EDR, ya está en camino.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <Button
                asChild
                className="h-12 rounded-full bg-gradient-to-b from-zinc-50 to-zinc-400 px-7 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(228,228,231,0.15)] hover:from-white hover:to-zinc-300"
              >
                <a href="#edr">Descubrir EDR</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-zinc-700 bg-black/50 px-7 text-sm font-semibold text-zinc-200 backdrop-blur hover:bg-zinc-900 hover:text-white"
              >
                <a href="#inversion">Conocer el plan</a>
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            >
              {[
                { icon: Users, label: "4 socios fundadores" },
                { icon: Layers, label: "Historia · Co-op · Acción" },
                { icon: Sparkles, label: "100% originales" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500"
                >
                  <Icon className="h-4 w-4 text-zinc-400" aria-hidden />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.a
            href="#edr"
            aria-label="Desplazarse a la sección de EDR"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-zinc-600 transition-colors hover:text-zinc-300 sm:block"
          >
            <ArrowDown className="h-5 w-5 animate-bounce" aria-hidden />
          </motion.a>
        </section>

        {/* --------------------------------- EDR ------------------------------- */}
        <section
          id="edr"
          className="relative scroll-mt-20 overflow-hidden border-t border-zinc-900 py-20 sm:py-24"
          aria-labelledby="edr-title"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-140px] top-1/4 h-[360px] w-[420px] rounded-full bg-zinc-500/[0.07] blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
              <FadeIn className="order-2 text-center lg:order-1 lg:text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-zinc-500">
                  Nuestro primer juego
                </p>
                <h2
                  id="edr-title"
                  className="mt-3 bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-7xl font-black tracking-[0.06em] text-transparent drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)] sm:text-8xl"
                >
                  EDR
                </h2>

                <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                  {GENRES.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-4 py-2 text-sm font-semibold text-zinc-300 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)]"
                    >
                      <Icon className="h-4 w-4 text-zinc-400" aria-hidden />
                      {label}
                    </li>
                  ))}
                </ul>

                <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-zinc-400 lg:mx-0">
                  EDR marca el arranque de Silverline Games: una experiencia
                  que combina historia, juego cooperativo y acción. Es la
                  primera prueba de nuestra filosofía — algo accesible, pero
                  con identidad propia — y el proyecto con el que daremos el
                  salto a Steam.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
                  <span className="flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-200">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-300" />
                    </span>
                    En desarrollo
                  </span>
                  <span className="text-xs text-zinc-500">
                    Fase 1 de nuestro plan · Desarrollado con Claude
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="order-1 lg:order-2">
                <TiltCard max={10} className="mx-auto w-full max-w-[280px] sm:max-w-[320px]">
                  <div className="sl-float [transform-style:preserve-3d]">
                    {/* deck layers */}
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-2xl border border-zinc-800/70 bg-zinc-950/80"
                      style={{
                        transform:
                          "translateZ(-52px) rotateY(-2deg) rotateX(1deg)",
                        opacity: 0.55,
                      }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-2xl border border-zinc-700/60 bg-zinc-950/60"
                      style={{
                        transform:
                          "translateZ(-26px) rotateY(-8deg) rotateX(3.5deg)",
                        opacity: 0.75,
                      }}
                    />
                    {/* glow */}
                    <div
                      aria-hidden
                      className="absolute -inset-12 rounded-[3rem] bg-zinc-400/15 blur-3xl"
                    />

                    <div
                      style={{ transform: "rotateY(-14deg) rotateX(6deg)" }}
                      className="relative flex aspect-[3/4] flex-col items-center justify-between rounded-2xl border border-zinc-600/50 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-6 shadow-[0_60px_120px_-40px_rgba(0,0,0,1)] [transform-style:preserve-3d]"
                    >
                      <Image
                        src={asset("/silverline-emblem.webp")}
                        alt="Emblema del dragón de Silverline Games"
                        width={140}
                        height={200}
                        className="mt-2 h-24 w-auto mix-blend-screen [transform:translateZ(34px)]"
                      />

                      <div className="[transform:translateZ(50px)]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-zinc-500">
                          Silverline Games
                        </p>
                        <p className="mt-1 bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-6xl font-black tracking-[0.08em] text-transparent drop-shadow-[0_14px_30px_rgba(0,0,0,0.9)]">
                          EDR
                        </p>
                      </div>

                      <div className="w-full [transform:translateZ(26px)]">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                        <ul className="mt-3 flex items-center justify-center gap-4 text-zinc-500">
                          {GENRES.map(({ icon: Icon, label }) => (
                            <li
                              key={label}
                              className="flex flex-col items-center gap-1.5"
                            >
                              <Icon className="h-4 w-4" aria-hidden />
                              <span className="text-[8px] font-semibold uppercase tracking-[0.18em]">
                                {label}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-center text-[9px] font-semibold tracking-[0.5em] text-zinc-600">
                          MUY PRONTO EN STEAM
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ------------------------------ filosofía ---------------------------- */}
        <section
          id="filosofia"
          className="scroll-mt-20 border-t border-zinc-900 bg-zinc-950/40 py-20 sm:py-24"
          aria-labelledby="filosofia-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="filosofia-title"
              eyebrow="Nuestra filosofía"
              title="Simples de aprender, imposibles de soltar"
              description="Silverline Games nace como un estudio independiente fundado por cuatro amigos. No nos encasillamos en un solo género: empezamos con juegos simples pero originales y subimos el nivel técnico y creativo con cada proyecto."
            />
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {PILLARS.map(({ icon: Icon, title, text }, i) => (
                <FadeIn key={title} delay={i * 0.08}>
                  <TiltCard max={7}>
                    <article className={cardBase}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 [transform:translateZ(28px)]">
                        <Icon className="h-5 w-5 text-zinc-400" aria-hidden />
                      </div>
                      <h3 className="mt-5 text-base font-bold text-zinc-100">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {text}
                      </p>
                    </article>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ inversión ---------------------------- */}
        <section
          id="inversion"
          className="scroll-mt-20 py-20 sm:py-24"
          aria-labelledby="inversion-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="inversion-title"
              eyebrow="Plan de inversión"
              title="Una inversión clara, dividida entre cuatro"
              description="El estudio arranca con dos gastos definidos. Al dividirlos entre los cuatro socios, el plan queda al alcance de todos: primero $435 pesos cada uno para arrancar, y otros $435 cuando EDR esté listo para publicarse."
            />

            {/* stats */}
            <FadeIn className="mt-12">
              <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/60 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)] lg:grid-cols-4">
                {STATS.map(({ value, label, sub }, i) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center px-4 py-7 text-center ${
                      i % 2 === 0 ? "border-r border-zinc-800/80" : ""
                    } ${i < 2 ? "border-b border-zinc-800/80 lg:border-b-0" : ""} ${
                      i === 1 ? "lg:border-r" : ""
                    }`}
                  >
                    <dt className="order-2 mt-2 text-xs font-medium text-zinc-400 sm:text-sm">
                      {label}
                    </dt>
                    <dd className="order-1 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] sm:text-4xl">
                      {value}
                      <span className="text-sm font-semibold sm:text-base"> MXN</span>
                    </dd>
                    <p className="order-3 mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      {sub}
                    </p>
                  </div>
                ))}
              </dl>
            </FadeIn>

            {/* phases */}
            <div className="mt-8 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-6">
              {PHASES.map(
                (
                  {
                    phase,
                    icon: Icon,
                    title,
                    cost,
                    costDetail,
                    text,
                    contribution,
                  },
                  i
                ) => (
                  <Fragment key={phase}>
                    <FadeIn delay={i * 0.12} className="flex-1">
                      <TiltCard max={6}>
                        <article className={cardBase}>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 [transform:translateZ(28px)]">
                              <Icon className="h-5 w-5 text-zinc-400" aria-hidden />
                            </div>
                            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                              {phase}
                            </span>
                          </div>
                          <h3 className="mt-5 text-lg font-bold text-zinc-100">
                            {title}
                          </h3>
                          <p className="mt-3 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent [transform:translateZ(20px)]">
                            {cost}
                            <span className="text-sm font-semibold"> MXN</span>
                          </p>
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                            {costDetail}
                          </p>
                          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                            {text}
                          </p>
                          <p className="mt-5 flex items-center gap-2 border-t border-zinc-800/80 pt-4 text-sm font-semibold text-zinc-200">
                            <CircleCheck
                              className="h-4 w-4 shrink-0 text-zinc-400"
                              aria-hidden
                            />
                            {contribution}
                          </p>
                        </article>
                      </TiltCard>
                    </FadeIn>
                    {i === 0 && (
                      <div
                        aria-hidden
                        className="flex shrink-0 justify-center py-1 md:py-0"
                      >
                        <ArrowDown className="h-5 w-5 text-zinc-600 md:hidden" />
                        <ArrowRight className="hidden h-6 w-6 text-zinc-600 md:block" />
                      </div>
                    )}
                  </Fragment>
                )
              )}
            </div>

            <FadeIn className="mt-8">
              <p className="flex items-center justify-center gap-2.5 rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-5 py-4 text-center text-sm text-zinc-400">
                <CircleCheck className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                <span>
                  Sin deudas ni inversionistas externos: el estudio se financia
                  con el aporte de sus cuatro fundadores.
                </span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* -------------------------------- ventas ----------------------------- */}
        <section
          id="ventas"
          className="relative scroll-mt-20 overflow-hidden border-t border-zinc-900 py-20 sm:py-24"
          aria-labelledby="ventas-title"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-160px] top-1/3 h-[340px] w-[420px] rounded-full bg-zinc-500/[0.06] blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="ventas-title"
              eyebrow="Plan de ventas"
              title="Precio accesible, meta clara"
              description="Venderemos nuestros juegos en Steam a un precio de $5 a $10 USD, y cada título arrancará con la misma meta mínima para empezar a ganar: 100 copias vendidas. Este es el plan que convierte a Silverline en un estudio que se financia a sí mismo."
            />

            {/* precio + meta */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <FadeIn>
                <TiltCard max={6}>
                  <article className={cardBase}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 [transform:translateZ(28px)]">
                        <BadgeDollarSign
                          className="h-5 w-5 text-zinc-400"
                          aria-hidden
                        />
                      </div>
                      <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Precio por juego
                      </span>
                    </div>
                    <p className="mt-5 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] [transform:translateZ(20px)] sm:text-5xl">
                      $5–10 <span className="text-base font-semibold">USD</span>
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                      En Steam, para todos nuestros juegos
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                      Un precio pensado para un estudio nuevo: sin franquicias
                      ni nombre hecho, comprar nuestro juego debe ser una
                      decisión fácil. Entre $5 y $10 USD es una compra por
                      impulso — menos que una salida a comer — y aún así deja
                      margen real tras la comisión de Steam. EDR saldrá dentro
                      de este rango, y cada juego definirá su precio según su
                      alcance.
                    </p>
                  </article>
                </TiltCard>
              </FadeIn>

              <FadeIn delay={0.1}>
                <TiltCard max={6}>
                  <article className={cardBase}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 [transform:translateZ(28px)]">
                        <Target className="h-5 w-5 text-zinc-400" aria-hidden />
                      </div>
                      <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Meta mínima por juego
                      </span>
                    </div>
                    <p className="mt-5 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] [transform:translateZ(20px)] sm:text-5xl">
                      100 <span className="text-base font-semibold">copias</span>
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                      El número con el que empezamos a ganar
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                      ¿Por qué 100? Porque es una meta realista para un primer
                      título: alcanza para validar que el juego funciona, cubrir
                      la tarifa de Steam Direct, recuperar la inversión inicial
                      y acumular las primeras reseñas que empujan más ventas.
                      Cada juego nuevo arrancará con esta misma meta —
                      empezando por EDR.
                    </p>
                  </article>
                </TiltCard>
              </FadeIn>
            </div>

            {/* matemática de ingresos */}
            <FadeIn className="mt-4 sm:mt-6">
              <dl className="grid grid-cols-1 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/60 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)] sm:grid-cols-3">
                {SALES_MATH.map(({ value, label, sub }, i) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center px-4 py-6 text-center ${
                      i < SALES_MATH.length - 1
                        ? "border-b border-zinc-800/80 sm:border-b-0 sm:border-r"
                        : ""
                    }`}
                  >
                    <dt className="order-2 mt-2 text-xs font-medium text-zinc-400 sm:text-sm">
                      {label}
                    </dt>
                    <dd className="order-1 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] sm:text-4xl">
                      {value}
                    </dd>
                    <p className="order-3 mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      {sub}
                    </p>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-center text-xs text-zinc-600">
                Ejemplo con la meta de 100 copias al precio medio de $7.50 USD.
              </p>
            </FadeIn>

            {/* escalera de metas */}
            <FadeIn className="mt-14">
              <h3 className="text-center text-lg font-bold text-zinc-100 sm:text-xl">
                La escalera: de 100 copias a un estudio que se sostiene solo
              </h3>
            </FadeIn>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
              {SALES_MILESTONES.map(
                (
                  { icon: Icon, step, copies, title, net, text, current },
                  i
                ) => (
                  <FadeIn key={step} delay={i * 0.1}>
                    <TiltCard max={7}>
                      <article
                        className={`${cardBase} relative ${
                          current ? "border-zinc-600/80" : ""
                        }`}
                      >
                        {current ? (
                          <span className="absolute -top-3 left-5 rounded-full border border-zinc-500 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-200 shadow-[0_0_24px_rgba(228,228,231,0.12)]">
                            Objetivo inicial
                          </span>
                        ) : null}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 [transform:translateZ(28px)]">
                            <Icon
                              className="h-5 w-5 text-zinc-400"
                              aria-hidden
                            />
                          </div>
                          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                            {step}
                          </span>
                        </div>
                        <p className="mt-5 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent [transform:translateZ(20px)]">
                          {copies}
                          <span className="ml-1.5 text-sm font-semibold text-zinc-500">
                            copias
                          </span>
                        </p>
                        <h4 className="mt-1 text-base font-bold text-zinc-100">
                          {title}
                        </h4>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                          {net}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                          {text}
                        </p>
                      </article>
                    </TiltCard>
                  </FadeIn>
                )
              )}
            </div>

            {/* cómo llegar a 100 */}
            <FadeIn className="mt-14">
              <h3 className="text-center text-lg font-bold text-zinc-100 sm:text-xl">
                ¿Cómo llegamos a las primeras 100 ventas?
              </h3>
            </FadeIn>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {SALES_ACTIONS.map(({ icon: Icon, title, text }, i) => (
                <FadeIn key={title} delay={i * 0.07}>
                  <div className="flex h-full gap-4 rounded-2xl border border-zinc-800/70 bg-zinc-950/50 px-5 py-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.95)]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 [transform:translateZ(20px)]">
                      <Icon className="h-5 w-5 text-zinc-400" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-zinc-100">{title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                        {text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* nota final */}
            <FadeIn className="mt-8">
              <p className="flex items-center justify-center gap-2.5 rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-5 py-4 text-center text-sm text-zinc-400">
                <CircleCheck
                  className="h-4 w-4 shrink-0 text-zinc-500"
                  aria-hidden
                />
                <span>
                  La tarifa de Steam Direct ($100 USD ≈ $1,745 MXN) se recupera
                  con menos de 30 copias vendidas. Con la meta de 100 copias —
                  entre $350 y $700 USD netos — el estudio recupera su inversión
                  inicial completa y genera ganancia para financiar el siguiente
                  juego.
                </span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ----------------------------- crecimiento --------------------------- */}
        <section
          id="crecimiento"
          className="scroll-mt-20 border-t border-zinc-900 bg-zinc-950/40 py-20 sm:py-24"
          aria-labelledby="crecimiento-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="crecimiento-title"
              eyebrow="Estrategia de crecimiento"
              title="¿Cómo vamos a crecer?"
              description="Un buen juego no basta: hay que darlo a conocer. Nuestra estrategia combina a los creadores de contenido con la promoción directa del estudio."
            />

            <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
              {GROWTH.map(({ icon: Icon, extraIcon: ExtraIcon, title, text }, i) => (
                <FadeIn key={title} delay={i * 0.1}>
                  <TiltCard max={7}>
                    <article className={cardBase}>
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 [transform:translateZ(28px)]">
                          <Icon className="h-5 w-5 text-zinc-400" aria-hidden />
                        </div>
                        {ExtraIcon ? (
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 [transform:translateZ(28px)]">
                            <ExtraIcon className="h-5 w-5 text-zinc-400" aria-hidden />
                          </div>
                        ) : null}
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-zinc-100">
                        {title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                        {text}
                      </p>
                    </article>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>

            {/* flow */}
            <FadeIn className="mt-10">
              <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-3">
                {FLOW_STEPS.map(({ icon: Icon, title }, i) => (
                  <Fragment key={title}>
                    <li className="flex flex-1 items-center gap-3.5 rounded-xl border border-zinc-800/70 bg-zinc-950/50 px-5 py-4 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.95)]">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xs font-bold text-zinc-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                        <span className="text-sm font-semibold text-zinc-200">
                          {title}
                        </span>
                      </div>
                    </li>
                    {i < FLOW_STEPS.length - 1 && (
                      <li aria-hidden className="flex shrink-0 justify-center py-0.5 lg:py-0">
                        <ArrowDown className="h-4 w-4 text-zinc-600 lg:hidden" />
                        <ArrowRight className="hidden h-5 w-5 text-zinc-600 lg:block" />
                      </li>
                    )}
                  </Fragment>
                ))}
              </ol>
            </FadeIn>
          </div>
        </section>

        {/* -------------------------------- equipo ----------------------------- */}
        <section
          id="equipo"
          className="scroll-mt-20 py-20 sm:py-24"
          aria-labelledby="equipo-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="equipo-title"
              eyebrow="El equipo"
              title="Cuatro socios, un mismo dragón"
              description="Silverline Games está formado por cuatro socios fundadores. Cada uno lidera un área del estudio."
            />

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
              {TEAM.map(({ icon: Icon, name, role, ceo, text }, i) => (
                <FadeIn key={name} delay={i * 0.08}>
                  <TiltCard max={8}>
                    <article className={`${cardBase} flex flex-col`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-xl bg-gradient-to-b from-zinc-500/60 to-zinc-800 p-px [transform:translateZ(30px)]">
                          <div className="flex h-14 w-14 items-center justify-center rounded-[11px] bg-black">
                            <Icon className="h-6 w-6 text-zinc-300" aria-hidden />
                          </div>
                        </div>
                        {ceo ? (
                          <span className="rounded-full border border-zinc-600/80 bg-zinc-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300">
                            CEO
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-5 text-xl font-extrabold text-zinc-100 [transform:translateZ(16px)]">
                        {name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold leading-snug text-zinc-400">
                        {role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                        {text}
                      </p>
                    </article>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------- ruta ------------------------------- */}
        <section
          id="ruta"
          className="scroll-mt-20 border-t border-zinc-900 bg-zinc-950/40 py-20 sm:py-24"
          aria-labelledby="ruta-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="ruta-title"
              eyebrow="Ruta de desarrollo"
              title="Empezar simple, crecer sin límite"
              description="Nuestro plan creativo avanza por etapas: cada juego terminado nos prepara para el siguiente reto."
            />

            <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
              {ROADMAP.map(({ step, title, text }, i) => (
                <FadeIn key={step} delay={i * 0.1}>
                  <TiltCard max={7}>
                    <article className={`${cardBase} relative`}>
                      <span
                        aria-hidden
                        className="absolute right-5 top-4 bg-gradient-to-b from-zinc-700 to-zinc-900 bg-clip-text text-5xl font-extrabold text-transparent [transform:translateZ(24px)]"
                      >
                        {step}
                      </span>
                      <h3 className="mt-2 max-w-[75%] text-lg font-bold leading-snug text-zinc-100">
                        {title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                        {text}
                      </p>
                    </article>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------- CTA -------------------------------- */}
        <section
          className="relative overflow-hidden border-t border-zinc-900 py-20 sm:py-28"
          aria-label="EDR próximamente en Steam"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500/[0.08] blur-[120px]" />
          </div>
          <FadeIn className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
            <Image
              src={asset("/silverline-emblem.webp")}
              alt=""
              width={140}
              height={200}
              className="mx-auto h-20 w-auto mix-blend-screen drop-shadow-[0_18px_40px_rgba(0,0,0,0.9)]"
            />
            <h2 className="mt-8 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] sm:text-4xl">
              EDR, muy pronto en Steam
            </h2>
            <p className="mx-auto mt-4 max-w-md text-balance text-sm leading-relaxed text-zinc-400 sm:text-base">
              Nuestro primer juego ya está en camino. El dragón apenas
              despierta — y el viaje apenas comienza.
            </p>
            <Button
              asChild
              className="mt-8 h-12 rounded-full bg-gradient-to-b from-zinc-50 to-zinc-400 px-8 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(228,228,231,0.15)] hover:from-white hover:to-zinc-300"
            >
              <a href="#edr">Volver a EDR</a>
            </Button>
          </FadeIn>
        </section>
      </main>

      {/* -------------------------------- footer ------------------------------ */}
      <footer className="mt-auto border-t border-zinc-900 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="flex items-center gap-2.5">
                <Image
                  src={asset("/silverline-emblem.webp")}
                  alt="Emblema de Silverline Games"
                  width={140}
                  height={200}
                  className="h-10 w-auto mix-blend-screen"
                />
                <span className="flex flex-col leading-none">
                  <span className="text-sm font-extrabold tracking-[0.18em] text-zinc-100">
                    SILVERLINE
                  </span>
                  <span className="mt-1 text-[9px] font-semibold tracking-[0.55em] text-zinc-500">
                    GAMES
                  </span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
                Estudio independiente de videojuegos. Historia, cooperativo,
                acción y más.
              </p>
            </div>

            <nav
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
              aria-label="Navegación del pie de página"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 border-t border-zinc-900 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <p className="text-center text-xs text-zinc-600">
              © 2026 Silverline Games. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
