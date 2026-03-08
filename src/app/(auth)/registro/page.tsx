"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { registro } from "./actions";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const BARS = [0.4, 0.8, 0.55, 1, 0.65, 0.9, 0.45, 0.75, 0.5, 0.95, 0.6, 0.35, 0.85, 0.7, 0.5, 0.9, 0.4, 0.6];
const WAVES = [1, 0.7, 0.45, 0.25];

function AudioPanel({ dark }: { dark: boolean }) {
  const bg   = dark ? "oklch(0.07 0.025 255)" : "oklch(0.92 0.02 240)";
  const bar1 = dark ? "oklch(0.48 0.20 255)" : "oklch(0.42 0.18 255)";
  const bar2 = dark ? "oklch(0.70 0.14 220)" : "oklch(0.55 0.14 220)";
  const text = dark ? "oklch(0.97 0.005 240)" : "oklch(0.15 0.02 255)";
  const sub  = dark ? "oklch(0.45 0.06 255)" : "oklch(0.45 0.08 255)";
  const glow = dark ? "oklch(0.52 0.20 255 / 0.18)" : "oklch(0.52 0.20 255 / 0.10)";
  const ring = dark ? "oklch(0.30 0.10 255 / 0.5)" : "oklch(0.60 0.12 255 / 0.4)";

  return (
    <motion.div
      key={dark ? "dark" : "light"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex h-full flex-col items-center justify-center gap-10 px-10 py-14 select-none overflow-hidden"
      style={{ background: bg }}
    >
      {/* Rejilla */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(oklch(0.52 0.20 255) 1px,transparent 1px),linear-gradient(90deg,oklch(0.52 0.20 255) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

      {/* Resplandor */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 55%, ${glow} 0%, transparent 70%)` }} />

      {/* Logo + nombre */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl"
          style={{ background: `linear-gradient(135deg, ${bar1}, ${bar2})`, boxShadow: `0 0 50px ${glow}` }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M3 18L3 10"   stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M7 18L7 5"    stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M12 18L12 2"  stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M17 18L17 7"  stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M21 18L21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black" style={{ color: text }}>
            Car{" "}
            <span style={{
              background: `linear-gradient(135deg, ${bar1}, ${bar2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Audio</span>
          </h2>
          <p className="text-xs mt-1 tracking-[0.25em] uppercase" style={{ color: sub }}>
            Audio profesional
          </p>
        </div>
      </motion.div>

      {/* Ecualizador grande */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="flex items-end gap-[3px] h-24">
        {BARS.map((h, i) => (
          <motion.div key={i}
            className="w-3 rounded-t-sm"
            style={{ background: `linear-gradient(to top, ${bar1}, ${bar2})`, originY: 1 }}
            animate={{ scaleY: [h * 0.3, h, h * 0.5, h * 0.85, h * 0.2, h] }}
            transition={{ duration: 0.5 + (i % 5) * 0.12, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
            initial={{ height: 96 * h }}
          />
        ))}
      </motion.div>

      {/* Ondas concéntricas */}
      <div className="relative flex items-center justify-center">
        {WAVES.map((s, i) => (
          <motion.div key={i}
            className="absolute rounded-full border"
            style={{ borderColor: `oklch(0.52 0.20 255 / ${0.25 - i * 0.05})` }}
            animate={{ scale: [s, s + 0.3], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
            initial={{ width: 40, height: 40 }}
          />
        ))}
        <div className="h-10 w-10 rounded-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${bar1}, ${bar2})`, border: `1px solid ${ring}` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill="white"/>
            <path d="M12 2C6.48 2 2 6.48 2 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 2C17.52 2 22 6.48 22 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function RegistroPage() {
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const dark = resolvedTheme !== "light";

  const bg   = dark ? "oklch(0.09 0.018 255)" : "oklch(0.95 0.01 240)";
  const text = dark ? "oklch(0.97 0.005 240)" : "oklch(0.10 0.02 255)";
  const sub  = dark ? "oklch(0.55 0.04 255)"  : "oklch(0.40 0.05 255)";

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setInfo(null);
    const result = await registro(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.info) {
      setInfo(result.info);
      setLoading(false);
    } else if (result?.redirect) {
      router.push(result.redirect);
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo — audio */}
      <div className="hidden lg:flex lg:w-[45%]">
        <AnimatePresence mode="wait">
          <AudioPanel key={dark ? "d" : "l"} dark={dark} />
        </AnimatePresence>
      </div>

      {/* Panel derecho — formulario */}
      <motion.div
        className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-14 relative"
        animate={{ backgroundColor: bg }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 255), oklch(0.64 0.17 255))" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 18L3 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M7 18L7 5"  stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M12 18L12 2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M17 18L17 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M21 18L21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-lg font-bold" style={{ color: text }}>Car <span style={{ background: "linear-gradient(135deg,oklch(0.48 0.20 255),oklch(0.64 0.17 255))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Audio</span></span>
          </div>

          <div>
            <h1 className="text-3xl font-black" style={{ color: text }}>Crear cuenta</h1>
            <p className="mt-2" style={{ color: sub }}>Únete a la comunidad Car Audio</p>
          </div>

          <form action={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "oklch(0.55 0.22 27 / 0.12)", border: "1px solid oklch(0.55 0.22 27 / 0.35)" }}>
                <p className="text-center" style={{ color: "oklch(0.65 0.20 27)" }}>{error}</p>
              </div>
            )}
            {info && (
              <div className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "oklch(0.60 0.15 145 / 0.12)", border: "1px solid oklch(0.60 0.15 145 / 0.35)" }}>
                <p className="text-center" style={{ color: "oklch(0.60 0.15 145)" }}>{info}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="nombre" style={{ color: text }}>Nombre completo</Label>
              <Input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required
                className="h-12 rounded-xl"
                style={{ background: dark ? "oklch(1 0 0 / 0.05)" : "oklch(0 0 0 / 0.04)", borderColor: dark ? "oklch(1 0 0 / 0.10)" : "oklch(0 0 0 / 0.12)", color: text }} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: text }}>Correo electrónico</Label>
              <Input id="email" name="email" type="email" placeholder="tu@correo.com" required
                className="h-12 rounded-xl"
                style={{ background: dark ? "oklch(1 0 0 / 0.05)" : "oklch(0 0 0 / 0.04)", borderColor: dark ? "oklch(1 0 0 / 0.10)" : "oklch(0 0 0 / 0.12)", color: text }} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" style={{ color: text }}>Contraseña</Label>
              <Input id="password" name="password" type="password" minLength={6} required
                className="h-12 rounded-xl"
                style={{ background: dark ? "oklch(1 0 0 / 0.05)" : "oklch(0 0 0 / 0.04)", borderColor: dark ? "oklch(1 0 0 / 0.10)" : "oklch(0 0 0 / 0.12)", color: text }} />
            </div>

            <Button type="submit" disabled={loading}
              className="w-full h-12 font-semibold rounded-xl border-0 text-white"
              style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 255), oklch(0.60 0.18 255))", boxShadow: "0 4px 20px oklch(0.52 0.20 255 / 0.35)" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                  Creando cuenta...
                </span>
              ) : "Registrarse"}
            </Button>
          </form>

          <p className="text-center text-sm" style={{ color: sub }}>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-medium hover:underline"
              style={{ color: "oklch(0.64 0.17 255)" }}>
              Inicia sesión
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: dark ? "oklch(1 0 0 / 0.07)" : "oklch(0 0 0 / 0.08)" }} />
            <span className="text-xs" style={{ color: sub }}>Car Audio © 2025</span>
            <div className="flex-1 h-px" style={{ background: dark ? "oklch(1 0 0 / 0.07)" : "oklch(0 0 0 / 0.08)" }} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
