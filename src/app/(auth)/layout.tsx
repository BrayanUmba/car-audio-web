import Link from "next/link";
import { Volume2, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
            style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.64 0.17 295))" }}
          >
            <Volume2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-sm">
            Car{" "}
            <span style={{
              background: "linear-gradient(135deg, oklch(0.64 0.17 295), oklch(0.75 0.12 300))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Audio
            </span>
          </span>
        </Link>

        <ThemeToggle />
      </header>
      {children}
    </>
  );
}
