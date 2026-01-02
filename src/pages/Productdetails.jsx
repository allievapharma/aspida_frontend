import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductBySlugQuery } from "../features/productsApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductPage from "../components/ProductPage";
import FeaturedItems from "../components/FeaturedItems";
import Whatsapp from "../components/Whatsapp";
import CartPage from "../components/CartPage";

const Productdetails = () => {
  const { slug, name } = useParams(); // slug for product, name for brand
  const isBrandPage = Boolean(name);
  const brand = name || ""; // use brand if on brand page

  // Fetch product details if slug exists
  const { data: product, isLoading: productLoading } = useGetProductBySlugQuery(slug, {
    skip: !slug, // skip query if no slug (i.e., on brand page)
  });

  // If on product page and brand is undefined, take from product
  const productBrand = product?.brand || brand;

  return (
    <div>
      <Header />

      {slug && <ProductPage product={product} loading={productLoading} />}

      {/* Featured items by brand */}
      <FeaturedItems brand={productBrand} />

      <Footer />
      <CartPage />
      <Whatsapp />
    </div>
  );
};

export default Productdetails;
