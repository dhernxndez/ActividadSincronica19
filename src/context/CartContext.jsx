import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const STORAGE_KEY = 'pwa-catalogo-carrito';
const CartContext = createContext(null);

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...state,
        {
          id: action.product.id,
          title: action.product.title,
          price: action.product.price,
          thumbnail: action.product.thumbnail,
          quantity: 1
        }
      ];
    }
    case 'increment':
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case 'decrement':
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    case 'remove':
      return state.filter((item) => item.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items,
      totalItems,
      totalPrice,
      addItem: (product) => dispatch({ type: 'add', product }),
      increment: (id) => dispatch({ type: 'increment', id }),
      decrement: (id) => dispatch({ type: 'decrement', id }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clearCart: () => dispatch({ type: 'clear' })
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
