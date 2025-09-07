import { formatCurrency } from "../utils/currency";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";
export default function ProductCard({ product }) {
  const { state, add, updateQty } = useCart();
  const inCart = state.items.find((i) => i.id === product.id);
  const qty = inCart?.qty || 0;

  const inc = () => updateQty(product.id, qty + 1);
  const dec = () => {
    if (qty <= 1) {
      updateQty(product.id, 0);
    } else {
      updateQty(product.id, qty - 1);
    }
  };

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-card transition hover:-translate-y-0.5">
      <div className="aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/600x450?text=Pickle";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {product.quantity || "—"} • {product.category}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {formatCurrency(product.price)}
          </span>

          {!inCart ? (
            <button
              onClick={() => {
                add(product);
                toast.success("Added to cart");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-300/60 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300 transition"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          ) : (
            <div className="inline-flex items-center gap-2">
              <button
                onClick={dec}
                className="rounded-lg border border-slate-300 dark:border-slate-700 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-6 text-center text-sm font-medium">
                {qty}
              </span>
              <button
                onClick={inc}
                className="rounded-lg border border-slate-300 dark:border-slate-700 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
              <span className="ml-1 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm">
                <Check size={16} /> Added
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
