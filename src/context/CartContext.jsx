import { createContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ------------------------------
  // 1️⃣ Fetch all cart items
  // ------------------------------
  const fetchCartItems = async () => {
    try {
      const res = await axiosInstance.get("/cart/");
      setCartItems(res.data.results || []);
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
      await axiosInstance.patch(`/cart/${itemId}/`, {
        quantity: newQty,
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
      await axiosInstance.delete(`/cart/${itemId}/`);

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
      await axiosInstance.post("/cart/", {
        product: productId,
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
