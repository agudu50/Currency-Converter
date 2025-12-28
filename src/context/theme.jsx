import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem("theme");
    return stored || "system";
  });

  const resolvedTheme = useMemo(() => {
    return theme === "system" ? getSystemTheme() : theme;
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = resolvedTheme === "dark";
    root.classList.toggle("dark", isDark);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [resolvedTheme, theme]);

  useEffect(() => {
    // Listen for system theme changes if using system
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const isDark = mq.matches;
      document.documentElement.classList.toggle("dark", isDark);
    };
    try {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } catch {
      // Fallback for older browsers
      mq.addListener && mq.addListener(handler);
      return () => mq.removeListener && mq.removeListener(handler);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme, toggleTheme }), [theme, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
