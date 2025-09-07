import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import Logo from "../assets/food-svgrepo-com.svg";

const navLinkClass =
  "px-3 py-2 rounded-lg text-sm font-medium transition \
   text-zinc-700 hover:bg-slate-100 \
   dark:text-zinc-200 dark:hover:bg-zinc-800";

export default function RootLayout() {
  const { state } = useCart();
  const count = state.items.reduce((n, i) => n + i.qty, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Pickel Store Logo" className="h-8 w-8" />
            <Link
              to="/"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Pickle Store
            </Link>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive
                    ? "bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive
                    ? "bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    : ""
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

      <footer className="border-t border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950 py-6 mt-12 text-center text-sm">
        <p className="text-slate-600 dark:text-zinc-400">
          © {new Date().getFullYear()} Pickle Store · Have queries? Reach us at{" "}
          <a
            href="mailto:gudurutarun@gmail.com"
            className="text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            gudurutarun@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
