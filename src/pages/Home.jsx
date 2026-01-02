import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import Header from "../components/Header";
import Line from "../components/Line";
import Testimonial from "../components/Testimonial";
import Experience from "../components/Experience";
import FeaturedItems from "../components/FeaturedItems";
import Whatsapp from "../components/Whatsapp";
import Loader from "../components/Loader";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [brandGroups, setBrandGroups] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/products/");
        const allProducts = response.data.results || [];

        // 🔹 Group by brand
        const grouped = allProducts.reduce((acc, item) => {
          if (!item.brand) return acc;
          if (!acc[item.brand]) acc[item.brand] = [];
          acc[item.brand].push(item);
          return acc;
        }, {});

        // 🔹 Filter brands with at least 4 products
        const validBrands = Object.entries(grouped)
          .filter(([_, products]) => products.length >= 1)
          .map(([brand, products]) => ({ brand, products }));

        // 🔹 Pick 4 random brands
        const randomFourBrands = validBrands
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setBrandGroups(randomFourBrands);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <Header />
      <Slider />
      <Experience />
    

      {/* 🔹 Show 4 random brands, each with 4 products */}
      {brandGroups.map(({ brand }) => (
        <>
        <FeaturedItems key={brand} brand={brand} />
        <Line />
        </>
      ))}

        <Testimonial />
      <Footer />
      <Whatsapp />
    </div>
  );
};

export default Home;
