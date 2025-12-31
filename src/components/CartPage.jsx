import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} from "../features/productsApi";

const CartPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  if (isLoading) {
    return <div className="text-center mt-20">Loading cart...</div>;
  }

  const cartItems = data?.items || [];

  if (cartItems.length === 0) {
    return <div className="text-center mt-20">Your cart is empty</div>;
  }

  /* ---------------- HANDLERS ---------------- */

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id).unwrap();
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  const handleQuantity = async (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    try {
      await updateCartItem({
        id: item.id,
        quantity: newQty,
      }).unwrap();
    } catch (err) {
      console.error("Quantity update error:", err);
    }
  };

  /* ---------------- PRICE CALCULATION ---------------- */

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.selling_price * item.quantity,
    0
  );

  const gst = subtotal * 0.05;
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + gst + delivery;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-lg hover:shadow-lg transition"
          >
            <img
              src={item.product.images?.[0]?.image || "/placeholder.jpg"}
              alt={item.product.name}
              className="w-28 h-28 object-contain rounded"
            />

            <div className="flex-1">
              <h2 className="font-bold text-lg">{item.product.name}</h2>
              <p className="text-gray-500">
                ₹{item.product.selling_price}
              </p>

              {item.product.discount_percentage && (
                <p className="text-green-600">
                  {item.product.discount_percentage}% OFF
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantity(item, -1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => handleQuantity(item, 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => handleRemove(item.id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ---------------- SUMMARY ---------------- */}
      <div className="mt-6 p-6 border rounded-lg max-w-md ml-auto">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>GST (5%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{delivery.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full py-3 bg-[#017F80] text-white rounded-lg hover:bg-[#025f5f] transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
