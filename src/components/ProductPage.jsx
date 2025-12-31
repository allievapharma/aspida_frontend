import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import redimgbg from "../assets/image/background/green.webp";
import {
  useGetProductBySlugQuery,
  useAddToCartMutation,
} from "../features/productsApi";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RichText from "../components/RichText";

const ProductPage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { slug } = useParams();

  const { data: product, isLoading, error } = useGetProductBySlugQuery(slug);
  const [addToCart] = useAddToCartMutation();

  // Image zoom state
  const [selectedImage, setSelectedImage] = useState(null);
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const [showZoom, setShowZoom] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  const token = localStorage.getItem("access");

  // Redirect if no token (not logged in)
  // useEffect(() => {
  //   if (!token) {
  //     console.log("Please login first");
  //     navigate("/Login");
  //   }
  // }, [token, navigate]);

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      console.log(data);
      setCartItems(data.results || []);
    } catch (error) {
      console.log("Error loading cart:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Add to Cart
  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.warning("Please login first to add items to cart!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cart/",
        { product: productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("🛒 Added to Cart Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      fetchCartItems();
    } catch (error) {
      toast.error(error.response?.data?.detail || "❌ Failed to add to cart", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
  };

  // Loading State
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading...</p>
      </div>
    );

  // Error State
  if (error || !product)
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Product not found
      </div>
    );

  const currentImage =
    selectedImage || product?.images?.[0]?.image || "/placeholder.jpg";

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div className="main-bg-light">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-light sm:p-6 mx-auto">
        <div className="aspida-max-w flex flex-col md:flex-row gap-8">
          {/* LEFT: Product Images */}
          <div className="md:w-1/2 flex flex-col justify-start">
            <div className="sticky top-24">
              <div className="relative">
                {/* Zoom Window */}
                {showZoom && (
                  <div
                    className="zoomproduct absolute z-10 top-0 right-[-48vw] xl:right-[-580px] w-[400px] lg:w-[550px] h-[400px] hidden md:block border border-[#017F80] rounded-lg bg-no-repeat shadow-lg"
                    style={{
                      backgroundImage: `url(${currentImage})`,
                      backgroundSize: "200%",
                      backgroundPosition,
                    }}
                  />
                )}

                {/* Main Image */}
                <div
                  className="product-img relative border border-[#017F80] rounded-lg overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setShowZoom(true)}
                  onMouseLeave={() => setShowZoom(false)}
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="rounded-lg w-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-4">
                  {product?.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.image}
                      alt={`Thumbnail ${index}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                        currentImage === img.image
                          ? "border-[#017F80]"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(img.image)}
                    />
                  ))}
                </div>

                {/* Product Assurance Section */}
                <div className="mt-5 relative border border-dashed border-[#017F80] p-3 max-w-lg rounded-lg overflow-hidden">
                  <img
                    src={redimgbg}
                    alt=""
                    className="absolute opacity-20 w-[80px] top-[-21px] left-[-19px]"
                  />
                  <div className="flex justify-around">
                    <AssuranceItem
                      icon={<VerifiedUserIcon className="text-[#017F80]" />}
                      text="Authentic Products"
                    />
                    <AssuranceItem
                      icon={
                        <WhereToVoteIcon className="text-[#017F80] rotate-180" />
                      }
                      text="Quality Checked"
                    />
                    <AssuranceItem
                      icon={<AssuredWorkloadIcon className="text-[#017F80]" />}
                      text="Secure Payment"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            {/* Product Details Table */}
            <ProductDetailsTable product={product} />

            {/* Price Section */}
            <PriceDisplay product={product} />

            {/* Add to Cart / Compare */}
            <div className="flex gap-4">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="mt-6 px-6 py-3 bg-[#017F80] text-white rounded-lg w-1/2 hover:bg-[#025f5f] transition"
              >
                Add To Cart
              </button>
              <button className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg w-1/2 hover:bg-gray-800 transition">
                Compare
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-4 text-gray-600 text-sm">
              <p>🌍 Free shipping worldwide</p>
              <p>🔒 100% Secured Payment</p>
            </div>

            {/* Description */}
            <ProductDescription product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Separated Components
const AssuranceItem = ({ icon, text }) => (
  <div className="text-center">
    <div className="bg-[#E5F9F8] p-4 rounded-full">{icon}</div>
    <h2>{text}</h2>
  </div>
);

const ProductDetailsTable = ({ product }) => (
  <div className="overflow-x-auto mt-8 mb-5">
    <table className="min-w-full text-left">
      <tbody>
        <DetailRow label="Brand Name" value={product.brand} />
        <DetailRow label="Composition" value={product.salt_compositions} />
        <DetailRow label="Manufacturer" value={product.manufacturer} />
        <DetailRow label="Form" value={product.form} />
        <DetailRow label="Country Of Origin" value={product.country} />
        <DetailRow label="Packing" value={product.packing} />
      </tbody>
    </table>
  </div>
);

const DetailRow = ({ label, value }) => (
  <tr>
    <td className="px-4 py-2 font-bold">{label}:</td>
    <td className="px-4 py-2">{value}</td>
  </tr>
);

const PriceDisplay = ({ product }) => (
  <>
    <div className="flex items-center gap-3 mt-4">
      <span className="text-3xl font-bold">₹{product.selling_price}</span>
      <span className="line-through text-gray-500">₹{product.base_price}</span>
      <span className="text-green-600">
        Save {product.discount_percentage.toFixed(2)}%
      </span>
    </div>
    <p>(Inclusive of all taxes)</p>
  </>
);

const ProductDescription = ({ product }) => (
  <div className="mt-12">
    <h2 className="text-xl font-bold px-3 py-2 mb-2 bg-[#E5F9F8]">
      Description 
    </h2>
    <p className="text-gray-700 px-5 mb-6"><RichText html={product.description} /></p>

    <h2 className="text-xl font-bold px-3 py-2 mb-2 bg-[#E5F9F8]">
      Benefits 
    </h2>
    <p className="text-gray-700 px-5 mb-6"> <RichText html={product.benefits} /></p>

    <h2 className="text-xl font-bold px-3 py-2 mb-2 bg-[#E5F9F8]">
      Directions for Use
    </h2>
    <p className="text-gray-700 px-5 mb-6"> <RichText html={product.uses} /></p>

    <h2 className="text-xl font-bold px-3 py-2 mb-2 bg-[#E5F9F8]">
      Side Effects
    </h2>
    <p className="text-gray-700 px-5 mb-6"> <RichText html={product.side_effects} /></p>

    <h2 className="text-xl font-bold px-3 py-2 mb-2 bg-[#E5F9F8]">
      Key Dosage
    </h2>
    <p className="text-gray-700"><RichText html={product.dosage}  /></p>
    <h2 className="text-xl font-bold px-3 py-2 mb-2 bg-[#E5F9F8]">
      Storage Conditions
    </h2>
    <p className="text-gray-700 px-5"><RichText html={product.storage}    /></p>
  </div>
);

export default ProductPage;
