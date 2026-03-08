"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/ui/button";

const subscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
