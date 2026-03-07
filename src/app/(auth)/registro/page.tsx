"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import Link from "next/link";
import { registro } from "./actions";

export default function RegistroPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await registro(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 h-72 w-72 rounded-full bg-red-500/10 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <Card className="relative w-full max-w-md border-white/5 bg-white/[0.03] backdrop-blur-xl">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/25">
            <Volume2 className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
          <p className="text-sm text-muted-foreground">
            Únete a la comunidad Car Audio
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                <p className="text-sm text-red-400 text-center">{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre"
                className="bg-white/5 border-white/10 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@correo.com"
                className="bg-white/5 border-white/10 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                minLength={6}
                className="bg-white/5 border-white/10 focus:border-primary"
                required
              />
            </div>
            <Button
              className="w-full h-11 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-0 text-white font-semibold shadow-lg shadow-red-500/25"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
