import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/Currency";
import toast from "react-hot-toast";

export default function Cart() {
  const { state, remove, updateQty, subtotal, tax, total, clear } = useCart();

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-400">
        Your Cart
      </h2>

      {!state.items.length && (
        <p className="text-zinc-500 dark:text-zinc-400">Cart is empty 🛒</p>
      )}

      {state.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 py-3"
        >
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-400">
              {item.name}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {formatCurrency(item.priceAtAdd)} × {item.qty}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={item.qty}
              min="1"
              className="w-16 rounded border border-zinc-300 dark:border-zinc-700 
                         px-2 py-1 text-sm 
                         bg-white text-zinc-700 
                         dark:bg-zinc-900 dark:text-zinc-100"
              onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
            />
            <button
              onClick={() => remove(item.id)}
              className="text-red-600 dark:text-red-400 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {state.items.length > 0 && (
        <div className="mt-6 space-y-2 text-zinc-800 dark:text-zinc-400">
          <p>Subtotal: {formatCurrency(subtotal)}</p>
          <p>Tax (5%): {formatCurrency(tax)}</p>
          <p className="font-semibold">Total: {formatCurrency(total)}</p>

          <button
            onClick={() => {
              clear();
              toast.success("Cart cleared");
            }}
            className="mt-4 rounded-lg bg-red-500 text-white px-4 py-2 text-sm 
                       hover:bg-red-600 dark:hover:bg-red-400/90"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
