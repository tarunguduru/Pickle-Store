import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";
import toast from "react-hot-toast";

export default function Cart() {
  const { state, remove, updateQty, subtotal, tax, total, clear } = useCart();

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {!state.items.length && (
        <p className="text-slate-500 dark:text-slate-400">Cart is empty 🛒</p>
      )}

      {state.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 py-3"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {formatCurrency(item.priceAtAdd)} × {item.qty}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={item.qty}
              min="1"
              className="w-16 rounded border border-slate-300 dark:border-slate-700 px-2 py-1 text-sm bg-white dark:bg-slate-800"
              onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
            />
            <button
              onClick={() => remove(item.id)}
              className="text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {state.items.length > 0 && (
        <div className="mt-6 space-y-2">
          <p>Subtotal: {formatCurrency(subtotal)}</p>
          <p>Tax (5%): {formatCurrency(tax)}</p>
          <p className="font-semibold">Total: {formatCurrency(total)}</p>
          <button
            onClick={() => {
              clear();
              toast.success("Cart cleared");
            }}
            className="mt-4 rounded-lg bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
