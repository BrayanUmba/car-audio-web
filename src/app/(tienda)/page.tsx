"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Volume2, Headphones, Speaker, Radio, Truck,
  Shield, Wrench, Star, ArrowRight, Zap, ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const categorias = [
  { nombre: "Parlantes",      slug: "parlantes",      icon: Volume2,    descripcion: "Sonido cristalino",  color: "from-purple-500 to-purple-700",    glow: "oklch(0.52 0.20 295 / 0.25)" },
  { nombre: "Amplificadores", slug: "amplificadores", icon: Zap,        descripcion: "Potencia máxima",    color: "from-purple-500 to-purple-800",  glow: "oklch(0.45 0.20 280 / 0.25)" },
  { nombre: "Subwoofers",     slug: "subwoofers",     icon: Speaker,    descripcion: "Bajos profundos",    color: "from-purple-600 to-purple-700",  glow: "oklch(0.50 0.18 295 / 0.25)" },
  { nombre: "Radios",         slug: "radios",         icon: Radio,      descripcion: "Multimedia total",   color: "from-purple-500 to-purple-700",     glow: "oklch(0.60 0.16 295 / 0.25)" },
  { nombre: "Accesorios",     slug: "accesorios",     icon: Headphones, descripcion: "Complementos pro",   color: "from-purple-500 to-purple-500",    glow: "oklch(0.65 0.14 300 / 0.25)" },
];

const beneficios = [
  { icon: Truck,  titulo: "Envío gratis",    desc: "En compras superiores a $200.000",        num: "01" },
  { icon: Shield, titulo: "Garantía total",  desc: "Todos los productos con garantía",         num: "02" },
  { icon: Wrench, titulo: "Instalación",     desc: "Servicio profesional de instalación",      num: "03" },
  { icon: Star,   titulo: "Calidad premium", desc: "Solo las mejores marcas del mercado",      num: "04" },
];

const BARS = [0.4, 0.7, 1, 0.55, 0.85, 0.45, 0.95, 0.6, 0.75, 0.5, 0.9, 0.35, 0.8, 0.65, 0.5];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center py-20 lg:py-0">
        {/* Fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-full"
            style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, oklch(0.52 0.20 295 / 0.10) 0%, transparent 60%)" }} />
          <div className="absolute top-0 right-0 h-full w-full"
            style={{ background: "radial-gradient(ellipse 60% 50% at 80% 30%, oklch(0.64 0.17 295 / 0.07) 0%, transparent 55%)" }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(oklch(0.64 0.17 295) 1px, transparent 1px), linear-gradient(90deg, oklch(0.64 0.17 295) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Texto izquierdo */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Badge className="mb-6 px-4 py-1.5 gap-1.5 text-sm font-medium"
                  style={{ background: "oklch(0.52 0.20 295 / 0.12)", border: "1px solid oklch(0.52 0.20 295 / 0.25)", color: "oklch(0.72 0.14 295)" }}>
                  <Zap className="h-3.5 w-3.5" />
                  Nuevos productos disponibles
                </Badge>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                Lleva tu{" "}
                <span style={{
                  background: "linear-gradient(135deg, oklch(0.64 0.17 295), oklch(0.75 0.12 300))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>sonido</span>
                <br />al siguiente nivel
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Parlantes, amplificadores, subwoofers y radios de las mejores marcas.
                Audio profesional con instalación experta.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/productos"
                  className={`${buttonVariants({ size: "lg" })} border-0 text-white px-8 h-12 text-base font-semibold shadow-lg`}
                  style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.60 0.18 295))", boxShadow: "0 4px 24px oklch(0.52 0.20 295 / 0.40)" }}>
                  Ver catálogo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="#categorias"
                  className={`${buttonVariants({ variant: "outline", size: "lg" })} h-12 px-8 text-base`}
                  style={{ borderColor: "oklch(0.52 0.20 295 / 0.30)", background: "oklch(0.52 0.20 295 / 0.05)" }}>
                  Explorar categorías
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-14 flex gap-8">
                {[
                  { valor: "500+",   label: "Productos" },
                  { valor: "2K+",    label: "Clientes" },
                  { valor: "5 años", label: "Experiencia" },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                    <p className="text-2xl sm:text-3xl font-black"
                      style={{ background: "linear-gradient(135deg, oklch(0.64 0.17 295), oklch(0.75 0.12 300))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {stat.valor}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual derecho — ecualizador 3D */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-[420px] h-[420px] flex items-center justify-center">
                {/* Anillos */}
                {[1, 0.75, 0.5].map((s, i) => (
                  <motion.div key={i}
                    className="absolute rounded-full border"
                    style={{
                      width: `${420 * s}px`, height: `${420 * s}px`,
                      borderColor: `oklch(0.52 0.20 295 / ${0.08 + i * 0.04})`,
                      background: i === 2 ? "oklch(0.52 0.20 295 / 0.03)" : "transparent",
                    }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
                  />
                ))}

                {/* Ecualizador central */}
                <div className="relative z-10 rounded-3xl p-10 flex flex-col items-center gap-6"
                  style={{ background: "oklch(0.12 0.02 295 / 0.8)", backdropFilter: "blur(20px)", border: "1px solid oklch(1 0 0 / 0.07)", boxShadow: "0 0 80px oklch(0.52 0.20 295 / 0.20)" }}>

                  {/* Logo */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.64 0.17 295))", boxShadow: "0 0 40px oklch(0.52 0.20 295 / 0.50)" }}>
                    <Volume2 className="h-8 w-8 text-white" />
                  </div>

                  {/* Barras */}
                  <div className="flex items-end gap-1 h-20">
                    {BARS.map((h, i) => (
                      <motion.div key={i}
                        className="w-2.5 rounded-t"
                        style={{ background: `linear-gradient(to top, oklch(0.48 0.20 295), oklch(0.70 0.14 300))`, originY: 1 }}
                        animate={{ scaleY: [h * 0.3, h, h * 0.5, h * 0.9, h * 0.2, h] }}
                        transition={{ duration: 0.5 + (i % 5) * 0.1, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                        initial={{ height: 80 * h }}
                      />
                    ))}
                  </div>

                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Car Audio Pro</p>
                </div>

                {/* Puntos orbitando */}
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <motion.div key={i}
                    className="absolute h-2.5 w-2.5 rounded-full"
                    style={{
                      background: `oklch(${0.50 + i * 0.04} 0.18 ${295 - i * 5})`,
                      top: "50%", left: "50%",
                      transformOrigin: "0 0",
                      boxShadow: `0 0 8px oklch(0.52 0.20 295 / 0.6)`,
                    }}
                    animate={{ rotate: [deg, deg + 360] }}
                    transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear" }}
                    initial={{ x: Math.cos(deg * Math.PI / 180) * 180, y: Math.sin(deg * Math.PI / 180) * 180 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ──────────────────────────────────── */}
      <section id="categorias" className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium tracking-[0.2em] uppercase mb-3"
              style={{ color: "oklch(0.64 0.17 295)" }}>
              Catálogo
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-5xl font-black">Explora por categoría</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Encuentra exactamente lo que necesitas para tu vehículo
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {categorias.map((cat, i) => (
              <motion.div key={cat.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Link href={`/productos?categoria=${cat.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2"
                    style={{
                      background: "oklch(0.13 0.018 295 / 0.7)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid oklch(1 0 0 / 0.06)",
                    }}>
                    {/* Glow hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${cat.glow} 0%, transparent 70%)` }} />
                    {/* Border glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{ boxShadow: `inset 0 1px 0 ${cat.glow}` }} />

                    <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                      style={{ boxShadow: `0 8px 20px ${cat.glow}` }}>
                      <cat.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="relative z-10 text-center">
                      <h3 className="font-bold text-sm sm:text-base">{cat.nombre}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{cat.descripcion}</p>
                    </div>
                    <ChevronRight className="relative z-10 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER OFERTA ───────────────────────────────── */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16"
              style={{ background: "linear-gradient(135deg, oklch(0.25 0.15 295), oklch(0.42 0.20 295) 50%, oklch(0.32 0.18 295))" }}>
              {/* Efectos */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 h-full w-1/2"
                  style={{ background: "radial-gradient(ellipse 80% 80% at 80% 50%, oklch(0.70 0.12 300 / 0.25) 0%, transparent 60%)" }} />
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                {/* Ecualizador decorativo */}
                <div className="absolute right-8 bottom-0 flex items-end gap-1 opacity-20">
                  {[0.4, 0.8, 0.6, 1, 0.7, 0.5, 0.9].map((h, i) => (
                    <div key={i} className="w-3 rounded-t bg-white" style={{ height: `${h * 80}px` }} />
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-white text-center lg:text-left">
                  <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                    style={{ background: "oklch(1 0 0 / 0.15)", border: "1px solid oklch(1 0 0 / 0.2)" }}>
                    Oferta especial
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">Hasta 30% OFF</h2>
                  <p className="mt-3 text-white/75 text-lg max-w-md">En toda nuestra línea de amplificadores. Tiempo limitado.</p>
                </div>
                <Link href="/productos?categoria=amplificadores"
                  className="shrink-0 inline-flex h-14 items-center gap-2 rounded-2xl bg-white px-10 font-bold text-lg shadow-2xl hover:bg-white/90 transition-all hover:scale-105"
                  style={{ color: "oklch(0.36 0.18 295)" }}>
                  Comprar ahora <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFICIOS ──────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium tracking-[0.2em] uppercase mb-3"
              style={{ color: "oklch(0.64 0.17 295)" }}>
              Por qué elegirnos
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-5xl font-black">Todo incluido</motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {beneficios.map((b, i) => (
              <motion.div key={b.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <div className="group relative overflow-hidden rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "oklch(0.13 0.018 295 / 0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid oklch(1 0 0 / 0.06)",
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, oklch(0.64 0.17 295 / 0.6), transparent)" }} />

                  <span className="text-5xl font-black opacity-[0.06] absolute top-4 right-5 select-none">{b.num}</span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                    style={{ background: "oklch(0.52 0.20 295 / 0.15)", border: "1px solid oklch(0.52 0.20 295 / 0.20)" }}>
                    <b.icon className="h-5 w-5" style={{ color: "oklch(0.64 0.17 295)" }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{b.titulo}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl text-center py-20 px-6"
            style={{ background: "oklch(0.13 0.018 295 / 0.7)", backdropFilter: "blur(20px)", border: "1px solid oklch(1 0 0 / 0.06)" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.52 0.20 295 / 0.08) 0%, transparent 70%)" }} />
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.64 0.17 295 / 0.5), transparent)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.64 0.17 295 / 0.3), transparent)" }} />
            </div>
            <div className="relative">
              <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4"
                style={{ color: "oklch(0.64 0.17 295)" }}>
                Empieza hoy
              </p>
              <h2 className="text-3xl sm:text-5xl font-black mb-4">¿Listo para mejorar tu sonido?</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
                Explora nuestro catálogo completo y encuentra el equipo perfecto para tu vehículo.
              </p>
              <Link href="/productos"
                className={`${buttonVariants({ size: "lg" })} border-0 text-white px-12 h-14 text-base font-semibold`}
                style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.60 0.18 295))", boxShadow: "0 4px 32px oklch(0.52 0.20 295 / 0.45)" }}>
                Ver todos los productos <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
