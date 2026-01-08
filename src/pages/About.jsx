import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import AboutSection from "../components/AboutSection";
import Mission from "../components/Mission";

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
      <Mission/>
      <Footer />
    </>
  );
};

export default About;
