import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const navLinkClass =
  "px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition";

export default function RootLayout() {
  const { state } = useCart();
  const count = state.items.reduce((n, i) => n + i.qty, 0);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Pickel Store
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-slate-100 dark:bg-slate-800" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-slate-100 dark:bg-slate-800" : ""
                }`
              }
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingCart size={18} />
                <span>Cart</span>
                {count > 0 && (
                  <span className="ml-1 rounded-full bg-emerald-500 text-white text-xs px-2 py-0.5">
                    {count}
                  </span>
                )}
              </span>
            </NavLink>

            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Pickel Store
      </footer>
    </div>
  );
}
