import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Underline from "../assets/image/underline/underline.svg";
import axiosInstance from "../utils/axiosInstance";

const FeaturedItems = ({ brand }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    if (!brand) return; // prevent fetching if brand undefined

    setLoading(true);
    try {
      const response = await axiosInstance.get("/products/", {
        params: {
          subcategory: "",
          brand_name: brand,
          manufacturer: "",
          bestseller: "unknown",
          prescription_required: "unknown",
          available: "unknown",
          country: "",
        },
      });

      setProducts(response.data.results || []);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [brand]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 animate-pulse">Loading featured items...</p>
      </div>
    );
  }

  const getRandomProducts = (arr, count = 4) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProducts = getRandomProducts(products, 4);

  console.log("FeaturedItems - brand:", brand, "products:", products);

  return (
    <section className="myFadeup bg-white py-12 sm:py-16 lg:py-15">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md ">
          <h5 className="under-line text-2xl font-bold text-gray-900 sm:text-3xl">
            {brand}
            <img src={Underline} alt="" />
          </h5>
          {/* <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            Showing featured products from brand: <strong>{brand}</strong>
          </p> */}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8 lg:mt-10 lg:gap-4 lg:grid-cols-4">
          {randomProducts.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between group border border-white shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05),_0px_0px_0px_1px_rgba(0,0,0,0.08)] rounded-xl p-4 sm:p-6 hover:border hover:border-[#017F80]"
            >
              <div className="relative overflow-hidden w-full h-45 sm:h-56 md:h-64 lg:h-60 xl:h-72 mx-auto rounded-lg">
                <img
                  className="object-contain w-full h-full transition-all duration-300"
                  src={item.images?.[0]?.image || "/placeholder.jpg"}
                  alt={item.name}
                />
                {item.discount_percentage && (
                  <span className="absolute z-[99] bottom-0 right-0 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {parseFloat(item.discount_percentage).toFixed(1)}% Discount
                  </span>
                )}
              </div>

              {item.bestseller && (
                <span className="absolute z-[99] top-2 left-2 bg-[#00A098] text-white text-xs font-semibold p-2 rounded-[15px_0_15px_0]">
                  Best Seller
                </span>
              )}
              <Link to={`/products/${item.slug}`} title={item.name}>
                <div className="flex items-start justify-between mt-4 space-x-4">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                      {item.name}
                    </h3>
                    <p>{item.salt_compositions}</p>
                  </div>

                  <div className="text-right">
                    {/* <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                      ₹{item.selling_price}
                    </p> */}
                    <h5 className="text-sm text-[#00A098]">
                      <strong>MRP</strong>
                    </h5>
                    {item.base_price && (
                      <del className="mt-0.5 text-bold  sm:text-sm font-bold no-underline">
                        ₹{item.base_price}
                      </del>
                    )}
                  </div>
                </div>

                <div className="w-full text-center bg-[#017F80] text-white py-2 my-4 rounded-lg hover:bg-[#025f5f] transition-colors duration-300">
                  <button>Read More</button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
