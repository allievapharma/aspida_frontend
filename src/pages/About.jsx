import React from "react";
import Footer from "../components/Footer";
import AllProduct from "../components/AllProduct";
import Header from "../components/Header";
import FeaturedItems from "../components/FeaturedItems";
import MissTwo from "../components/MissTwo";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import AboutSection from "../components/AboutSection";

const About = () => {
  return (
    <>
      <Header />
      <div className="abt-nav-img">
        <div className="about-nav-section">
          <h1>
            <strong> About Us</strong>
          </h1>
          <p>
            <Link to="/"> Home </Link>/ About Us
          </p>
        </div>
      </div>
      <AboutSection/>
       <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <MissTwo/>
      </div>
      {/* <AllProduct /> */}
      <Brand/>
      <FeaturedItems />
      <Footer />
    </>
  );
};

export default About;
