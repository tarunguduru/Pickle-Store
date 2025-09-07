import { useEffect, useState } from "react";

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
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
      className="inline-flex items-center gap-2 rounded-xl border
                 border-zinc-300/70 bg-white/70
                 px-3 py-2 text-sm text-zinc-700 shadow hover:bg-zinc-50 transition
                 dark:border-zinc-700/70 dark:bg-zinc-900/70
                 dark:text-zinc-100 dark:hover:bg-zinc-800"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {/* Make sure the icon inherits current text color */}
      <span className="i-lucide-moon-star text-current" />
      <span className="hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"} mode
      </span>
    </button>
  );
}
