import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/image/logo-2-1.png";
import facebook from "../assets/image/Socialmedial/facebook_2626269.png";
import instagram from "../assets/image/Socialmedial/instagram_2626270.png";
import twitter from "../assets/image/Socialmedial/letter-x_5119120.png";
import linkedin from "../assets/image/Socialmedial/linkedin_4782336.png";
import signpng from "../assets/image/signin/login-animate.gif";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.key); // Save auth token
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError("Invalid credentials, please try again!");
    }
  };

  return (
    <div className="sign-back p-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center items-center bg-[#045E67] rounded-xl">
          <div className="w-full bg-[#045E67] p-4 rounded-t-xl justify-center flex-col hidden md:flex">
            <div className="w-full bg-[#045E67] p-4 rounded-t-xl flex justify-center">
              <img src={logo} alt="" />
            </div>
            <img
              src={signpng}
              alt=""
              className="h-[250px] rounded-t-xl mix-blend-multiply"
            />
          </div>

          <div className="bg-white shadow-lg rounded-xl text-center w-full max-w-md">
            <div className="w-full bg-[#045E67] p-4 rounded-t-xl flex justify-center block md:hidden">
              <img src={logo} alt="" />
            </div>
            <div className="p-8  text-center">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Sign In
              </h2>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:outline-none focus:ring-teal-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition"
                >
                  Sign In
                </button>
              </form>
              <div className="text-center mt-4">
                <Link
                  to="/reset-password"
                  className="text-teal-600 hover:underline text-sm"
                >
                  Forgot password?
                </Link>
              </div>
              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link
                  to="/Signup"
                  className="text-teal-600 hover:underline font-medium"
                >
                  Sign Up
                </Link>
              </p>
              <div className="top-header-social-sign items-center gap-4 justify-center mt-6 py-5 flex">
                <img src={facebook} alt="" />
                <img src={instagram} alt="" />
                <img src={twitter} alt="" />
                <img src={linkedin} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
