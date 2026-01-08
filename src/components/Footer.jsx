import React from "react";
import logo from "../assets/image/logo-2-1.png";
import { Link } from "react-router-dom";
import Brand from "./Brand";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import AddCallIcon from '@mui/icons-material/AddCall';
// src/assets/image/bg-footer.jpg
const Footer = () => {
  return (
    <footer className="footer-back bg-cover relative bg-center pb-10 text-white mt-10">
      <div className="w-[90%] mx-auto">
        <Brand />
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row flex-wrap gap-8 justify-between">
        {/* Logo Section */}
        <div className="w-full md:w-[45%] lg:w-[23%]">
          <div className="mb-4">
            <img src={logo} alt="Aspida Pharma Logo" className="w-40" />
          </div>
          <p>
            Welcome to Aspida Life Science, a fast-growing pharmaceutical and
            life sciences company incorporated in 2020 in India.
          </p>
        </div>

        {/* Information Section */}
        <div className="w-full md:w-[45%] lg:w-[23%]">
          <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
            Information
          </h3>
          <p>
            Welcome to Aspida Life Science, incorporated in 2020 in India. With
            one goal: to provide high-quality and affordable medicines to all.
          </p>
        </div>

        {/* Our Product Links */}
        <div className="w-full md:w-[45%] lg:w-[23%]">
          <h3 className="text-xl font-semibold mb-4 text-center md:text-left lg:text-center">
            Our Links
          </h3>
          <ul className="space-y-2 font-bold text-center md:text-left lg:text-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/Policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/Conditions">Terms and Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="w-full text-center md:w-[45%] lg:w-[23%]">
          {/* Header */}
          <div className="flex items-center justify-center text-center md:justify-start mb-4 lg:justify-center">
            <span className="text-xl font-semibold mr-2">Quick Contact</span>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 font-bold text-center md:text-left lg:text-center">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div><LocationOnIcon/></div>
              <p className="text-left">
                14/16/1 Second Floor Sahibabad Industrial Area, above Allieva
                Pharma Private Limited, Sahibabad, Ghaziabad, Uttar Pradesh
                201010
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
             <div><EmailIcon/></div>
              <p>info@aspidalifesciences.com</p>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
             <div><AddCallIcon/></div>
              <p>
                (+91) 9311028639
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center mt-10 text-white text-sm">
        © {new Date().getFullYear()} Aspida Life Sciences - All rights reserved.{" "}
        <a href="https://aspidalifesciences.com/">
          <span className="text-[#11F8FE] font-semibold">
            Aspida Life Sciences
          </span>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
