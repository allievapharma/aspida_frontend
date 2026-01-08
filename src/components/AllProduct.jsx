import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../features/productsApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";

const AllProduct = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchFromURL = params.get("search") || "";
  // const categoryFromURL = params.get("category"); // 👈 NEW
  const categoryFromURL = params.get("category") || "";
  const brandFromURL = params.get("brand");

  const token = localStorage.getItem("access_token"); // 🔹 Add this line

  const [searchTerm, setSearchTerm] = useState(searchFromURL);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const { fetchCartItems } = useContext(CartContext);

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromURL ? [categoryFromURL] : []
  );

  useEffect(() => {
    if (categoryFromURL) {
      setSelectedCategories([categoryFromURL]);
      setPage(1);
    }
  }, [categoryFromURL]);

  useEffect(() => {
    if (brandFromURL) {
      setSelectedBrands(brandFromURL.split(",")); // support multiple brands
    }
  }, [brandFromURL]);

  // 🔹 Fetch data from API using RTK Query
  const { data, isLoading, isFetching, error } = useGetProductsQuery({
    searchTerm,
    brands: selectedBrands,
    category: categoryFromURL,
    page,
  });

  // 🔹 Extract products and pagination info
  const products = data?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // 🔹 Update available brands from fetched products
  useEffect(() => {
    if (products.length > 0) {
      const uniqueBrands = [
        ...new Set(products.map((p) => p.brand || p.category || "Unknown")),
      ];
      setBrands(uniqueBrands);
    }
  }, [products]);

  // 🔹 Handle brand filter toggle
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1);
  };

  // 🔹 Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setSelectedCategories([]); // 👈 ADD
    setPage(1);
    navigate("/products"); // 👈 RESET URL
  };

  console.log("Products Data:", data);

  // Add to Cart
  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.warning("Please login first to add items to cart!", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "https://aspidalifesciences.com/api/cart/",
        { product: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("🛒 Added to Cart Successfully!");
      if (fetchCartItems) fetchCartItems();
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      toast.error(error.response?.data?.detail || "❌ Failed to add to cart", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // 🔹 Handle pagination
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));

  // 🔹 Handle loading & error
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>Failed to load products. Please try again.</p>
      </div>
    );
  }

  // 🔹 Render UI
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6 sticky top-2">
          {/* Search */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Search</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search product..."
              className="w-full border border-[#017F80] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#017F80] outline-none"
            />
            {isFetching && (
              <p className="text-xs text-[#017F80] mt-2 animate-pulse">
                Updating results...
              </p>
            )}
          </div>

          {/* Brand Filter */}
          {/* <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Filter by Brand</h3>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {brands.length > 0 ? (
                brands.map((brand, idx) => (
                  <label key={idx} className="flex items-center text-sm">
                    <Link
                      key={brand.slug}
                      to={`/products?brand=${brand.slug}`}
                      className="block px-2 py-2 hover:bg-[#E5F9F8]"
                    >
                      {brand.name}

                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="mr-2"
                      />
                    </Link>
                    {brand}
                  </label>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No brands found</p>
              )}
            </div>
          </div> */}

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full bg-gray-200 py-2 rounded-md text-sm hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="flex flex-col items-center">
              <img
                src="src/assets/image/loader/product_not_found2.png"
                alt="Not Found"
                className="mx-auto object-contain"
              />
              <p className="mt-4 text-gray-500">No products found</p>
            </div>
          ) : (
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <div className="myFadeup bg-white group shadow-md rounded-xl overflow-hidden flex flex-col hover:border hover:border-[#017F80] transition">
                  <Link key={product.id} to={`/products/${product.slug}`}>
                    <div className="w-full h-64 items-center justify-center overflow-hidden relative">
                      <img
                        src={product.images?.[0]?.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.discount_percentage && (
                        <span className="absolute bottom-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          {parseFloat(product.discount_percentage).toFixed(1)}%
                          Off
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="px-4 pb-4 flex flex-col flex-grow">
                    <Link key={product.id} to={`/products/${product.slug}`}>
                      <h3 className="font-bold text-sm mt-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p>{product.salt_compositions}</p>

                      <div className="mt-2 text-[#017F80]">
                        <span className=" text-l font-bold">
                          ₹ {product.base_price}
                        </span>
                        {/* <span className="text-[#017F80] text-base font-bold ml-2">
                          ₹{product.selling_price}
                        </span> */}
                      </div>
                    </Link>
                    <div className="flex gap-4 w-full mt-4">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={isLoading}
                        className="px-4 py-2 bg-[#017F80] text-white rounded-lg w-[50%] hover:bg-[#025f5f] transition"
                      >
                        Add
                      </button>
                      <Link key={product.id} to={`/products/${product.slug}`}>
                        <button className="px-4 py-2 bg-[#017F80] text-white rounded-lg w-[100%] hover:bg-[#025f5f] transition">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-4 py-2 border rounded-md text-sm ${
                  page > 1
                    ? "text-[#017F80] border-[#017F80] hover:bg-[#017F80] hover:text-white transition"
                    : "text-gray-400 border-gray-200 cursor-not-allowed"
                }`}
              >
                &lt; Prev
              </button>

              <span className="text-gray-600 font-medium">
                Page {page} of {totalPages || 1}
              </span>

              <button
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className={`px-4 py-2 border rounded-md text-sm ${
                  page < totalPages
                    ? "text-[#017F80] border-[#017F80] hover:bg-[#017F80] hover:text-white transition"
                    : "text-gray-400 border-gray-200 cursor-not-allowed"
                }`}
              >
                Next &gt;
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AllProduct;
