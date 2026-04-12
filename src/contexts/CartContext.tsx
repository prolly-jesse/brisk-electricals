import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (name: string) => void;
  updateQty: (name: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
  total: 0,
  count: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) return prev.map((i) => (i.name === item.name ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { ...item, qty }];
    });
  };

  const updateQty = (name: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (name: string) => setItems((prev) => prev.filter((i) => i.name !== name));
  const clearCart = () => setItems([]);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
};
