"use client";

import { useState } from "react";
import { X, Zap } from "lucide-react";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 animate-gradient text-white">
      <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium">
        <Zap className="h-4 w-4 animate-pulse" />
        <span>
          Envío gratis en compras superiores a $200.000 COP
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline font-bold">
          Hasta 30% OFF en amplificadores
        </span>
        <Zap className="h-4 w-4 animate-pulse" />
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
