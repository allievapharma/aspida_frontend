import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";

const Cart = () => {
  const { cartItems, fetchCartItems, updateItemQuantity, removeItem } =
    useContext(CartContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      await fetchCartItems();
      setLoading(false);
    };
    loadCart();
  }, []);

  if (loading) return <h3 className="text-center mt-10">Loading Cart...</h3>;

  // ================= CALCULATE TOTALS ==================
  const calculateTotals = () => {
    let mrp = 0;
    let selling = 0;

    cartItems.forEach((item) => {
      mrp += item.product_detail.base_price * item.quantity;
      selling += item.product_detail.selling_price * item.quantity;
    });

    const gstRate = 0.05; // 5%
    const gstAmount = selling * gstRate;

    return {
      mrpTotal: mrp,
      sellingTotal: selling,
      productDiscount: mrp - selling,
      gstAmount,
      totalPayable: selling + gstAmount,
      deliveryFee: 69,
      platformFee: 9,
      totalSavings: mrp - selling + 69 + 9,
    };
  };

  const {
    mrpTotal,
    sellingTotal,
    productDiscount,
    gstAmount,
    totalPayable,
    deliveryFee,
    platformFee,
    totalSavings,
  } = calculateTotals();

  return (
    <>
      <Header />
      <div className="aspida-max-w  ">
        <h2 className="text-3xl font-bold mb-6 text-center">My Cart</h2>

        {/* EMPTY CART */}
        {cartItems.length === 0 && (
          <div className="flex justify-center">
            <img
              src="src/assets/image/loader/nocart.jpg"
              alt="no cart"
              className="w-72"
            />
          </div>
        )}
        <div className=" block justify-between p-6 md:flex">
          <div className="w-full mr-6">
            {/* CART ITEMS */}
            {cartItems.length > 0 &&
              cartItems.map((item) => {
                const { base_price, selling_price, name, image } =
                  item.product_detail;

                const discount = Math.round(
                  ((base_price - selling_price) / base_price) * 100
                );

                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4"
                  >
                    {/* LEFT: PRODUCT IMAGE + DETAILS */}
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://aspidalifesciences.com${image}`}
                        alt={name}
                        className="w-20 h-20 rounded-md object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">{name}</h3>

                        <div className="block gap-2 items-center sm:flex">
                          <p className="font-bold text-[18px]">
                            ₹{selling_price}
                          </p>
                          <p className="line-through text-gray-500">
                            ₹{base_price}
                          </p>
                        </div>

                        <p className="text-green-600">Save {discount}%</p>
                      </div>
                    </div>

                    {/* MIDDLE: QUANTITY BUTTONS */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* RIGHT: ITEM PRICE */}
                    <p className="w-24 text-right font-bold">
                      ₹{selling_price * item.quantity}
                    </p>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      X
                    </button>
                  </div>
                );
              })}
          </div>

          {/* PAYMENT DETAILS */}
          <div className="w-[350px] m-[0 0 0 auto] ">
            {cartItems.length > 0 && (
              <div className="sticky top-[70px]">
                <div className="bg-white shadow-md rounded-xl p-5 max-w-md ml-auto ">
                  <h2 className="font-semibold text-lg mb-4">
                    Payment details
                  </h2>

                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>MRP Total</span>
                    <span>₹{mrpTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>Product Discount</span>
                    <span className="text-green-600">
                      -₹{productDiscount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>GST (5%)</span>
                    <span>₹{gstAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>Delivery Fee</span>
                    <span>
                      <span className="line-through text-gray-400">
                        ₹{deliveryFee}
                      </span>
                      <span className="text-green-600 ml-1 font-medium">
                        FREE
                      </span>
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700 mb-4">
                    <span>Platform Fee</span>
                    <span>
                      <span className="line-through text-gray-400">
                        ₹{platformFee}
                      </span>
                      <span className="text-green-600 ml-1 font-medium">
                        FREE
                      </span>
                    </span>
                  </div>

                  <hr className="my-3" />

                  <div className="flex justify-between text-black font-semibold text-lg">
                    <span>Total Payable</span>
                    <span>₹{totalPayable.toFixed(2)}</span>
                  </div>
                </div>

                {/* SAVINGS */}
                <div className="max-w-md ml-auto mt-4 bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg text-center font-medium">
                  You saved a total of ₹{totalSavings.toFixed(2)}
                </div>

                {/* CHECKOUT BUTTON */}
                <div className="text-right mt-6">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg mt-2">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
