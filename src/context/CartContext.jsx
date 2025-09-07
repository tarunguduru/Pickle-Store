import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = { items: [] };

function init(initial) {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : initial;
  } catch {
    return initial;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "UPDATE_QTY":
      if (action.payload.qty <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const add = (product) =>
    dispatch({
      type: "ADD",
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        priceAtAdd: product.price,
      },
    });

  const remove = (id) => dispatch({ type: "REMOVE", payload: id });
  const updateQty = (id, qty) =>
    dispatch({
      type: "UPDATE_QTY",
      payload: {
        id,
        qty: Math.max(0, Number.isFinite(Number(qty)) ? Number(qty) : 0),
      },
    });
  const clear = () => dispatch({ type: "CLEAR" });

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.priceAtAdd * i.qty,
    0
  );
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{ state, add, remove, updateQty, clear, subtotal, tax, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
