"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Volume2,
  Headphones,
  Speaker,
  Radio,
  Truck,
  Shield,
  Wrench,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const categorias = [
  {
    nombre: "Parlantes",
    slug: "parlantes",
    icon: Volume2,
    descripcion: "Sonido cristalino",
    color: "from-red-500 to-orange-500",
  },
  {
    nombre: "Amplificadores",
    slug: "amplificadores",
    icon: Zap,
    descripcion: "Potencia máxima",
    color: "from-orange-500 to-yellow-500",
  },
  {
    nombre: "Subwoofers",
    slug: "subwoofers",
    icon: Speaker,
    descripcion: "Bajos profundos",
    color: "from-red-600 to-red-400",
  },
  {
    nombre: "Radios",
    slug: "radios",
    icon: Radio,
    descripcion: "Multimedia total",
    color: "from-purple-500 to-pink-500",
  },
  {
    nombre: "Accesorios",
    slug: "accesorios",
    icon: Headphones,
    descripcion: "Complementos pro",
    color: "from-blue-500 to-cyan-500",
  },
];

const beneficios = [
  {
    icon: Truck,
    titulo: "Envío gratis",
    desc: "En compras superiores a $200.000",
  },
  {
    icon: Shield,
    titulo: "Garantía total",
    desc: "Todos los productos con garantía",
  },
  {
    icon: Wrench,
    titulo: "Instalación",
    desc: "Servicio profesional de instalación",
  },
  {
    icon: Star,
    titulo: "Calidad premium",
    desc: "Solo las mejores marcas del mercado",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        {/* Fondo con gradientes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-red-500/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-red-600/5 blur-[80px]" />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-1.5 bg-white/5 border-white/10 text-sm">
              <Zap className="h-3.5 w-3.5 mr-1.5 text-orange-400" />
              Nuevos productos disponibles
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Lleva tu{" "}
              <span className="text-gradient">sonido</span>
              <br />
              al siguiente nivel
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Parlantes, amplificadores, subwoofers y radios de las mejores
              marcas. Audio profesional para tu vehículo con instalación experta.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/productos"
                className={`${buttonVariants({ size: "lg" })} bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-0 text-white px-8 h-12 text-base font-semibold shadow-lg shadow-red-500/25`}
              >
                Ver catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#categorias"
                className={`${buttonVariants({ variant: "outline", size: "lg" })} h-12 px-8 text-base border-white/10 hover:bg-white/5`}
              >
                Explorar categorías
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16">
              {[
                { valor: "500+", label: "Productos" },
                { valor: "2,000+", label: "Clientes felices" },
                { valor: "5", label: "Años de experiencia" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl sm:text-4xl font-black text-gradient">
                    {stat.valor}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section id="categorias" className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl font-bold"
            >
              Explora por categoría
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-3 text-muted-foreground text-lg"
            >
              Encuentra exactamente lo que necesitas
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categorias.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <Link href={`/productos?categoria=${cat.slug}`}>
                  <Card className="group relative overflow-hidden border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="flex flex-col items-center gap-3 p-6 sm:p-8">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} shadow-lg transition-transform group-hover:scale-110`}
                      >
                        <cat.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base">
                        {cat.nombre}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {cat.descripcion}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER DESTACADO */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-white text-center lg:text-left">
                <Badge className="mb-4 bg-white/20 text-white border-0">
                  Oferta especial
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                  Hasta 30% OFF
                </h2>
                <p className="mt-3 text-white/80 text-lg max-w-md">
                  En toda nuestra línea de amplificadores. Potencia tu sonido a
                  precio increíble.
                </p>
              </div>
              <Link
                href="/productos?categoria=amplificadores"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 font-bold text-red-600 shadow-xl hover:bg-white/90 transition-colors"
              >
                Comprar ahora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map((b, i) => (
              <motion.div
                key={b.titulo}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <Card className="border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-all">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20">
                      <b.icon className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">{b.titulo}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {b.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl font-bold"
            >
              ¿Listo para mejorar tu sonido?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto"
            >
              Explora nuestro catálogo completo y encuentra el equipo perfecto
              para tu vehículo.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-8">
              <Link
                href="/productos"
                className={`${buttonVariants({ size: "lg" })} bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-0 text-white px-10 h-12 text-base font-semibold shadow-lg shadow-red-500/25`}
              >
                Ver todos los productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
