"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BARS = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3, 0.75, 0.6, 0.95, 0.45];

export function BienvenidaSplash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ya = sessionStorage.getItem("splash-visto");
    if (!ya) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("splash-visto", "1");
      }, 2800);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "oklch(0.07 0.02 295)" }}
        >
          {/* Resplandor de fondo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full"
              style={{ background: "radial-gradient(circle, oklch(0.52 0.20 295 / 0.15) 0%, transparent 70%)" }} />
          </div>

          {/* Línea de scan */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute inset-x-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.64 0.17 295 / 0.6), transparent)" }}
              animate={{ y: ["0vh", "100vh"] }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            />
          </div>

          {/* Logo + texto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Ícono */}
            <motion.div
              className="flex h-24 w-24 items-center justify-center rounded-3xl"
              style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.64 0.17 295))", boxShadow: "0 0 60px oklch(0.52 0.20 295 / 0.5)" }}
              animate={{ boxShadow: ["0 0 40px oklch(0.52 0.20 295 / 0.4)", "0 0 80px oklch(0.52 0.20 295 / 0.7)", "0 0 40px oklch(0.52 0.20 295 / 0.4)"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Icono de ondas de sonido SVG */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M8 32 L8 16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M16 36 L16 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M24 40 L24 8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M32 36 L32 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M40 32 L40 16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </motion.div>

            {/* Nombre */}
            <div className="text-center">
              <motion.h1
                className="text-5xl font-black tracking-tight text-white"
                initial={{ opacity: 0, letterSpacing: "0.3em" }}
                animate={{ opacity: 1, letterSpacing: "-0.01em" }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Car{" "}
                <span style={{
                  background: "linear-gradient(135deg, oklch(0.64 0.17 295), oklch(0.75 0.12 300))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Audio
                </span>
              </motion.h1>
              <motion.p
                className="mt-2 text-sm tracking-[0.25em] uppercase"
                style={{ color: "oklch(0.60 0.03 295)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Audio profesional para tu vehículo
              </motion.p>
            </div>
          </motion.div>

          {/* Ecualizador animado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute bottom-16 flex items-end gap-1"
          >
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-t-sm"
                style={{
                  background: `linear-gradient(to top, oklch(0.48 0.20 295), oklch(0.70 0.14 300))`,
                  originY: 1,
                }}
                animate={{ scaleY: [h * 0.4, h, h * 0.5, h * 0.8, h * 0.3, h] }}
                transition={{
                  duration: 0.6 + (i % 4) * 0.1,
                  repeat: Infinity,
                  delay: i * 0.06,
                  ease: "easeInOut",
                }}
                initial={{ height: 40 * h }}
              />
            ))}
          </motion.div>

          {/* Bienvenido */}
          <motion.p
            className="absolute bottom-8 text-xs tracking-[0.3em] uppercase"
            style={{ color: "oklch(0.45 0.05 295)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1.2, duration: 1.2 }}
          >
            Bienvenido
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
