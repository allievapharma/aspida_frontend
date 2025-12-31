import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("access");

  // ------------------------------
  // 1️⃣ Fetch all cart items
  // ------------------------------
  const fetchCartItems = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCartItems(data.results || []);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // ------------------------------
  // 2️⃣ Update item quantity
  // ------------------------------
  const updateItemQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;

    try {
      await fetch(`http://127.0.0.1:8000/cart/${itemId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      });

      fetchCartItems(); // refresh
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // ------------------------------
  // 3️⃣ Remove item
  // ------------------------------
  const removeItem = async (itemId) => {
    try {
      await fetch(`http://127.0.0.1:8000/cart/${itemId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCartItems(); // refresh
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ------------------------------
  // 4️⃣ Add to cart (optional)
  // ------------------------------
  const addToCart = async (productId) => {
    try {
      await fetch("http://127.0.0.1:8000/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product: productId }),
      });

      fetchCartItems();
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCartItems,
        updateItemQuantity,
        removeItem,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
