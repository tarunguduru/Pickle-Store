import { useEffect, useState } from "react";

const getInitialTheme = () => {
  // localStorage first
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  // then system preference
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  )?.matches;
  return prefersDark ? "dark" : "light";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/60 px-3 py-2 text-sm shadow hover:shadow-md transition"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <span className="i-lucide-moon-star" />
      <span className="hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"} mode
      </span>
    </button>
  );
}
