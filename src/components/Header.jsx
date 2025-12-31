import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo-2-1.png";
import GoogleTranslate from "./GoogleTranslate";
import facebook from "../assets/image/Socialmedial/facebook_2626269.png";
import instagram from "../assets/image/Socialmedial/instagram_2626270.png";
import twitter from "../assets/image/Socialmedial/letter-x_5119120.png";
import linkedin from "../assets/image/Socialmedial/linkedin_4782336.png";
import gmail from "../assets/image/Socialmedial/gmail_5968534.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import profile from "../assets/image/signin/profilelogo.avif";
import { useSelector } from "react-redux";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);

  const placeholders = [
    "Search for products...",
    "Search for brands...",
    "Search for categories...",
    "Search for offers...",
  ];
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/categories/"),
          axios.get("http://127.0.0.1:8000/brands/"),
        ]);

        setCategories(catRes.data.results || catRes.data || []);
        setBrands(brandRes.data.results || brandRes.data || []);
      } catch (error) {
        console.error("Header API error:", error);
      }
    };

    fetchHeaderData();
  }, []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  // ⭐ Get cart items from global CartContext
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <div className="top-header aspida-max-w bg-white">
        <div className="topp-head flex justify-between items-center gap-4 text-black font-semibold">
          <div className="flex justify-center items-center gap-2">
            <img src={gmail} alt="" className="w-[15px] md:w-[25px]" />
            <p>info@aspida.com</p>
          </div>

          <div className="top-header-social items-center gap-4 hidden md:flex">
            <img src={facebook} alt="" />
            <img src={instagram} alt="" />
            <img src={twitter} alt="" />
            <img src={linkedin} alt="" />
          </div>

          <p>
            <GoogleTranslate />
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#05535F] to-[#008080] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 aspida-max-w">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2 font-bold text-xl">
              <img src={logo} alt="" className="w-[120px] md:w-[170px] p-1" />
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-[26px] items-center text-white font-bold ml-[10px] mr-[10px] whitespace-nowrap">
            <Link to="/products" className="transition">
              All Medicine
            </Link>

            {/* Dropdown */}
            <div className="groups block py-3 relative cursor-pointer whitespace-nowrap">
              <div className="flex">
                <p>categories</p>
                <p className="arrow-ro">
                  <ArrowDropDownIcon />
                </p>
              </div>
              <div className="dropdown hidden p-2 mt-2 space-y-1 absolute bg-white text-black rounded shadow-lg">
                {categories.length === 0 ? (
                  <p className="px-2 py-1 text-sm text-gray-400">
                    No categories
                  </p>
                ) : (
                  categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products?category=${cat.slug}`}
                      className="block px-2 py-2 hover:bg-[#E5F9F8]"
                    >
                      {cat.name}
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="groups block py-3 relative cursor-pointer">
              <div className="flex">
                <p>Brand</p>
                <p className="arrow-ro">
                  <ArrowDropDownIcon />
                </p>
              </div>
              <div className="dropdown hidden whitespace-nowrap p-2 mt-2 space-y-1 absolute bg-white text-black rounded shadow-lg">
                {/* <p className="py-2 px-2 hover:bg-[#E5F9F8]">Capelieva-DT 500</p>
                <p className="py-2 px-2 hover:bg-[#E5F9F8]">Dasalieva</p>
                <p className="py-2 px-2 hover:bg-[#E5F9F8]">Empalieva-25</p> */}
                {brands.length === 0 ? (
                  <p className="px-2 py-1 text-sm text-gray-400">No brands</p>
                ) : (
                  brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      to={`/products?brand=${brand.slug}`}
                      className="block px-2 py-2 hover:bg-[#E5F9F8]"
                    >
                      {brand.name}
                    </Link>
                  ))
                )}
              </div>
            </div>

            <Link to="/about" className="whitespace-nowrap">
              About Us
            </Link>
            <Link to="/contact">Contact</Link>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex justify-center max-w-[400px] w-full"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder={placeholders[index]}
                className="border px-3 py-2 rounded w-full"
              />
            </form>
          </nav>

          {/* Right Section (Cart + Profile) */}
          <div className="text-white font-bold flex items-center gap-4 hidden md:flex">
            {/* Cart */}
            <Link to="/cart">
              <div className="p-[10px] relative bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointer">
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                    {cartItems.length}
                  </span>
                )}
                <AddShoppingCartIcon className="text-3xl text-[#008080]" />
              </div>
            </Link>

            {/* Profile / Login */}
            <button className="hidden md:block text-[#017F80] p-[2px] rounded-md hover:text-[#025f5f] transition">
              <nav>
                {auth?.user ? (
                  <div className="relative groups block py-2 cursor-pointer whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <img
                        src={profile}
                        alt=""
                        className="w-[40px] rounded-full object-cover"
                      />
                    </div>

                    <div className="absolute dropdown hidden whitespace-nowrap -left-8 p-2 mt-2 mb-2 bg-white text-black rounded shadow-lg">
                      <Link to="/profile">
                        <p className="py-2 px-2 hover:bg-[#E5F9F8]">Profile</p>
                      </Link>
                      <button
                        onClick={logout}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/Login">
                    <button className="hidden md:block bg-white text-[#017F80] p-[11px] rounded-md hover:text-[#025f5f] transition">
                      Sign In
                    </button>
                  </Link>
                )}
              </nav>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Search + Cart Row */}
        <div className="flex justify-between bg-white p-3 md:hidden">
          <form action="" className="flex justify-center max-w-[600px] w-full">
            <input
              type="text"
              placeholder={placeholders[index]}
              className="border px-3 py-2 rounded w-full"
            />
          </form>

          <Link to="/cart">
            <div className="p-[10px] relative bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointer text-[#017F80]">
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                  {cartItems.length}
                </span>
              )}
              <AddShoppingCartIcon className="text-3xl" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white text-black shadow-lg border-t border-cyan-600">
            <a href="/" className="block px-6 py-3">
              Home
            </a>

            <div className="groups block px-6 py-3">
              <p>Service</p>
              <div className="dropdown hidden pl-6 mt-2 space-y-1">
                <p className="py-2 px-2">Medicine 1</p>
                <p className="py-2 px-2">Medicine 2</p>
                <p className="py-2 px-2">Medicine 3</p>
              </div>
            </div>

            <a href="/about" className="block px-6 py-3">
              About Us
            </a>
            <a href="/contact" className="block px-6 py-3">
              Contact
            </a>

            <button className="w-full bg-cyan-600 text-white py-3 font-semibold hover:bg-cyan-500 transition">
              Book Now
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
