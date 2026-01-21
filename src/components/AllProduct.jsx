import React, { useEffect, useMemo, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noproduct from "../assets/image/loader/product_not_found2.png";

import { useGetProductsQuery } from "../features/productsApi";
import axiosInstance from "../utils/axiosInstance";
import { CartContext } from "../context/CartContext";

const AllProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchCartItems } = useContext(CartContext);

  /* ---------------- URL PARAMS ---------------- */
  const params = new URLSearchParams(location.search);

  const searchFromURL = params.get("search") || "";
  const brandFromURL = params.get("brand") || "";
  const pageFromURL = Number(params.get("page")) || 1;
  const categoryFromURL = params.get("category") || "";
  const subcategoryFromURL = params.get("subcategory") || "";

  /* ---------------- STATE ---------------- */
  const [searchTerm, setSearchTerm] = useState(searchFromURL);
  const [selectedBrand, setSelectedBrand] = useState(brandFromURL);
  const [page, setPage] = useState(1);
  const [brands, setBrands] = useState([]);

  const [category, setCategory] = useState(categoryFromURL);
  const [subcategory, setSubcategory] = useState(subcategoryFromURL);

  const token = localStorage.getItem("access_token");

  /* ---------------- SYNC URL → STATE ---------------- */
  useEffect(() => {
    setSearchTerm(searchFromURL);
    setSelectedBrand(brandFromURL);
    setCategory(categoryFromURL);
    setSubcategory(subcategoryFromURL);
    setPage(pageFromURL);
  }, [
    searchFromURL,
    brandFromURL,
    categoryFromURL,
    subcategoryFromURL,
    pageFromURL,
  ]);

  /* ---------------- PRODUCTS QUERY ---------------- */
  const queryArgs = useMemo(
    () => ({
      search: searchTerm,
      brand: selectedBrand,
      category,
      subcategory,
      page,
    }),
    [searchTerm, selectedBrand, category, subcategory, page],
  );

  const { data, isLoading, isFetching, error } = useGetProductsQuery(queryArgs);

  const products = data?.results || [];
  const totalCount = data?.count || 0;

  const hasNext = Boolean(data?.next);
  const hasPrev = Boolean(data?.previous);

  /* ---------------- FETCH BRANDS (BACKEND) ---------------- */
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axiosInstance.get("/brands/");
        setBrands(res.data.results || []);
      } catch (err) {
        console.error("Brand fetch failed", err);
      }
    };
    fetchBrands();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);

    const params = new URLSearchParams(location.search);
    value ? params.set("search", value) : params.delete("search");
    params.delete("page");

    navigate(`/products?${params.toString()}`);
  };

  const handleBrandChange = (slug) => {
    setSelectedBrand(slug);
    setPage(1);

    const params = new URLSearchParams(location.search);
    params.set("brand", slug);
    params.delete("page");

    navigate(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
    setPage(1);
    navigate("/products");
  };

  const updatePageInURL = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate(`/products?${params.toString()}`);
  };

  const handlePrevPage = () => {
    if (!hasPrev) return;

    const newPage = page - 1;
    setPage(newPage);
    updatePageInURL(newPage);
  };

  const handleNextPage = () => {
    if (!hasNext) return;

    const newPage = page + 1;
    setPage(newPage);
    updatePageInURL(newPage);
  };

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.warning("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axiosInstance.post("/cart/", {
        product: productId,
        quantity: 1,
      });
      toast.success("Added to cart");
      fetchCartItems?.();
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  /* ---------------- STATES ---------------- */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load products</p>;
  }

  /* ---------------- UI (UNCHANGED) ---------------- */
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6 sticky top-2">
          {/* Search */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Search</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search product..."
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
            {isFetching && (
              <p className="text-xs mt-2 animate-pulse">Updating results...</p>
            )}
          </div>

          {/* Brand */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Filter by Brand</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand.slug} className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand.slug}
                    onChange={() => handleBrandChange(brand.slug)}
                  />
                  {brand.name}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="w-full bg-gray-200 py-2 rounded-md text-sm"
          >
            Clear Filters
          </button>
        </aside>

        {/* Products */}
        <main className="lg:col-span-3">
          {products.length === 0 ? (
            <>
              <p className="text-center">No products found</p>
              <img src={noproduct} alt="" />
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="myFadeup group bg-white shadow rounded-xl hover:border hover:border-[#017F80] transition"
                >
                  <Link to={`/products/${product.slug}`}>
                    <div className="w-full h-64 items-center justify-center overflow-hidden relative">
                      <img
                        src={product.images?.[0]?.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                      />{" "}
                    </div>
                  </Link>
                  <div className="p-3">
                    <Link to={`/products/${product.slug}`}>
                      <h3 className="font-bold text-sm">{product.name}</h3>
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
          {(hasNext || hasPrev) && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={handlePrevPage}
                disabled={!hasPrev}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-gray-600 font-medium">Page {page}</span>

              <button
                onClick={handleNextPage}
                disabled={!hasNext}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AllProduct;
