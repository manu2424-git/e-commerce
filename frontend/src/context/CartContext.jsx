import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("northstar_cart")) || []; } catch { return []; }
  });

  function update(next) {
    setItems(next);
    localStorage.setItem("northstar_cart", JSON.stringify(next));
  }

  function addToCart(product, quantity = 1) {
    const existing = items.find((item) => item.product === product._id);
    const nextQuantity = Math.min(product.stock, (existing?.quantity || 0) + quantity);
    update(existing ? items.map((item) => item.product === product._id ? { ...item, quantity: nextQuantity, stock: product.stock } : item) : [
      ...items,
      { product: product._id, name: product.name, price: product.price, image: product.image, stock: product.stock, quantity: nextQuantity }
    ]);
  }

  function setQuantity(id, quantity) {
    const item = items.find((entry) => entry.product === id);
    if (!item) return;
    if (quantity < 1) return removeFromCart(id);
    update(items.map((entry) => entry.product === id ? { ...entry, quantity: Math.min(quantity, entry.stock) } : entry));
  }

  function removeFromCart(id) { update(items.filter((item) => item.product !== id)); }
  function clearCart() { update([]); }
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({ items, count, subtotal, addToCart, setQuantity, removeFromCart, clearCart }), [items, count, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { return useContext(CartContext); }