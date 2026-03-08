"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "./actions";
import { motion } from "framer-motion";

const EQ_BARS = [0.5, 0.9, 0.6, 1, 0.4, 0.8, 0.7, 0.5, 0.95, 0.6, 0.75, 0.45, 0.85, 0.55, 0.7];

function CarAudioAnimation() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-8 py-12 select-none"
      style={{ background: "linear-gradient(160deg, oklch(0.07 0.025 255) 0%, oklch(0.13 0.03 255) 100%)" }}
    >
      {/* Rejilla de fondo */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(oklch(0.64 0.17 255) 1px, transparent 1px), linear-gradient(90deg, oklch(0.64 0.17 255) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Resplandor central */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, oklch(0.52 0.20 255 / 0.18) 0%, transparent 70%)" }} />

      {/* ── Carro SVG con puerta animada ── */}
      <div className="relative w-full max-w-sm mb-8">
        {/* Silueta del carro */}
        <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
          {/* Carrocería */}
          <path d="M20 95 Q20 110 35 110 L285 110 Q300 110 300 95 L300 80 L260 80 L240 50 Q230 35 200 32 L130 32 Q100 35 85 50 L60 80 L20 80 Z"
            fill="oklch(0.20 0.04 255)" stroke="oklch(0.40 0.12 255)" strokeWidth="1.5" />
          {/* Techo */}
          <path d="M90 80 L95 55 Q105 38 130 35 L200 35 Q220 38 230 55 L235 80 Z"
            fill="oklch(0.16 0.03 255)" stroke="oklch(0.35 0.10 255)" strokeWidth="1" />
          {/* Ventana trasera */}
          <path d="M170 78 L172 55 Q176 42 190 40 L205 40 Q215 42 218 55 L220 78 Z"
            fill="oklch(0.28 0.08 220 / 0.7)" stroke="oklch(0.50 0.12 220)" strokeWidth="0.8" />
          {/* Rueda trasera */}
          <circle cx="75" cy="110" r="22" fill="oklch(0.12 0.01 255)" stroke="oklch(0.35 0.08 255)" strokeWidth="2" />
          <circle cx="75" cy="110" r="12" fill="oklch(0.22 0.04 255)" stroke="oklch(0.50 0.12 255)" strokeWidth="1.5" />
          <circle cx="75" cy="110" r="4" fill="oklch(0.60 0.15 255)" />
          {/* Rueda delantera */}
          <circle cx="245" cy="110" r="22" fill="oklch(0.12 0.01 255)" stroke="oklch(0.35 0.08 255)" strokeWidth="2" />
          <circle cx="245" cy="110" r="12" fill="oklch(0.22 0.04 255)" stroke="oklch(0.50 0.12 255)" strokeWidth="1.5" />
          <circle cx="245" cy="110" r="4" fill="oklch(0.60 0.15 255)" />
          {/* Faro delantero */}
          <ellipse cx="287" cy="83" rx="10" ry="6" fill="oklch(0.80 0.10 220 / 0.9)" />
          <ellipse cx="287" cy="83" rx="6" ry="4" fill="white" />
          {/* Faro trasero */}
          <ellipse cx="33" cy="88" rx="8" ry="5" fill="oklch(0.55 0.18 255 / 0.8)" />
        </svg>

        {/* ── Puerta animada (perspectiva que se abre) ── */}
        <motion.div
          className="absolute"
          style={{
            top: "28%", left: "34%",
            width: "28%", height: "52%",
            transformOrigin: "right center",
            background: "linear-gradient(135deg, oklch(0.22 0.05 255), oklch(0.18 0.03 255))",
            border: "1px solid oklch(0.40 0.12 255 / 0.6)",
            borderRadius: "4px 4px 4px 4px",
          }}
          animate={{
            rotateY: [0, -45, -45, 0],
            x: [0, -8, -8, 0],
          }}
          transition={{
            duration: 4,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        >
          {/* Manija de la puerta */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-1 rounded-full"
            style={{ background: "oklch(0.60 0.15 255)" }} />
          {/* Ventana de la puerta */}
          <div className="absolute top-1 left-1 right-3 h-[45%] rounded-sm opacity-70"
            style={{ background: "oklch(0.28 0.08 220 / 0.5)", border: "1px solid oklch(0.50 0.12 220 / 0.4)" }} />
        </motion.div>

        {/* Luz interior que aparece al abrir la puerta */}
        <motion.div
          className="absolute rounded-full blur-2xl pointer-events-none"
          style={{
            top: "20%", left: "30%",
            width: "40%", height: "60%",
            background: "radial-gradient(circle, oklch(0.70 0.15 255 / 0.6) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 4, times: [0, 0.3, 0.7, 1], repeat: Infinity, repeatDelay: 1 }}
        />
      </div>

      {/* ── Display de radio ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative w-full max-w-xs rounded-xl p-4 mb-6"
        style={{ background: "oklch(0.10 0.02 255)", border: "1px solid oklch(0.30 0.10 255 / 0.5)" }}
      >
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <motion.div className="absolute inset-x-0 h-px opacity-40"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.64 0.17 255), transparent)" }}
            animate={{ y: [0, 80] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono" style={{ color: "oklch(0.64 0.17 255)" }}>CAR AUDIO</span>
          <span className="text-xs font-mono" style={{ color: "oklch(0.45 0.08 255)" }}>● LIVE</span>
        </div>
        <div className="flex items-end gap-1 h-8">
          {EQ_BARS.map((h, i) => (
            <motion.div key={i}
              className="flex-1 rounded-t-sm"
              style={{
                background: `linear-gradient(to top, oklch(0.48 0.20 255), oklch(0.70 0.14 220))`,
                originY: 1,
                minHeight: 2,
              }}
              animate={{ scaleY: [h * 0.3, h, h * 0.5, h * 0.8, h * 0.2, h] }}
              transition={{ duration: 0.5 + (i % 5) * 0.12, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
              initial={{ height: 32 * h }}
            />
          ))}
        </div>
      </motion.div>

      {/* Texto inferior */}
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <h2 className="text-2xl font-black text-white">Car <span className="text-gradient">Audio</span></h2>
        <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: "oklch(0.45 0.06 255)" }}>
          Audio profesional
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo — animación del carro */}
      <div className="hidden lg:flex lg:w-1/2">
        <CarAudioAnimation />
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12"
        style={{ background: "oklch(0.09 0.018 255)" }}
      >
        {/* Resplandor de fondo en mobile */}
        <div className="absolute inset-0 lg:hidden pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 30%, oklch(0.52 0.20 255 / 0.10) 0%, transparent 70%)" }} />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md space-y-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 255), oklch(0.64 0.17 255))", boxShadow: "0 0 24px oklch(0.52 0.20 255 / 0.4)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 18 L3 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M8 18 L8 6"  stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M13 18 L13 3" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M18 18 L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M23 18 L23 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold">Car <span className="text-gradient">Audio</span></span>
          </div>

          {/* Encabezado */}
          <div>
            <h1 className="text-3xl font-black text-white">Bienvenido</h1>
            <p className="mt-2 text-muted-foreground">Inicia sesión para continuar</p>
          </div>

          {/* Formulario */}
          <form action={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "oklch(0.52 0.20 255 / 0.10)", border: "1px solid oklch(0.52 0.20 255 / 0.25)" }}>
                <p className="text-center" style={{ color: "oklch(0.70 0.14 255)" }}>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Correo electrónico</Label>
              <Input id="email" name="email" type="email" placeholder="tu@correo.com" required
                className="h-12 bg-white/5 border-white/10 focus:border-blue-500 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
              <Input id="password" name="password" type="password" required
                className="h-12 bg-white/5 border-white/10 focus:border-blue-500 rounded-xl" />
            </div>

            <Button type="submit" disabled={loading}
              className="w-full h-12 font-semibold rounded-xl border-0 text-white btn-ford"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                  Ingresando...
                </span>
              ) : "Iniciar sesión"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="font-medium hover:underline" style={{ color: "oklch(0.64 0.17 255)" }}>
              Regístrate
            </Link>
          </p>

          {/* Separador decorativo */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "oklch(1 0 0 / 0.07)" }} />
            <span className="text-xs text-muted-foreground">Car Audio © 2025</span>
            <div className="flex-1 h-px" style={{ background: "oklch(1 0 0 / 0.07)" }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
