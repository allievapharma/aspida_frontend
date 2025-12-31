import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchProducts = (url = "http://127.0.0.1:8000/products/") => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        const results = res.data.results || [];
        setProducts(results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setTotalCount(res.data.count || 0);

        // Extract unique brands
        const uniqueBrands = [
          ...new Set(results.map((p) => p.brand || p.category || "Unknown")),
        ];
        setBrands(uniqueBrands);
      })
      .catch((err) => console.error("API Error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (direction) => {
    if (direction === "next" && nextPage) {
      setCurrentPage((prev) => prev + 1);
      fetchProducts(nextPage);
    } else if (direction === "prev" && prevPage) {
      setCurrentPage((prev) => prev - 1);
      fetchProducts(prevPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products found</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link key={product.id} to={`/products/${product.slug}`}>
                <div className="bg-white shadow-md rounded-xl overflow-hidden hover:border hover:border-[#017F80] transition">
                  <div className="w-full h-60 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.images?.[0]?.image || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-contain p-3 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <h3 className="font-semibold text-sm mb-1">
                      {product.name}
                    </h3>
                    <div className="text-[#017F80] font-bold">
                      ₹{product.selling_price}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination UI */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={!prevPage}
              className={`px-4 py-2 border rounded-md text-sm ${
                prevPage
                  ? "text-[#017F80] border-[#017F80] hover:bg-[#017F80] hover:text-white transition"
                  : "text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
            >
              &lt; Prev
            </button>

            <span className="text-gray-600 font-medium">
              Page {currentPage} of {Math.ceil(totalCount / pageSize)}
            </span>

            <button
              onClick={() => handlePageChange("next")}
              disabled={!nextPage}
              className={`px-4 py-2 border rounded-md text-sm ${
                nextPage
                  ? "text-[#017F80] border-[#017F80] hover:bg-[#017F80] hover:text-white transition"
                  : "text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
            >
              Next &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProduct;
