import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo-2-1.png";

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    login_input: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const getErrorMessage = (data) => {
    if (!data) return "Something went wrong";

    // If backend wraps error inside "error"
    if (data.error) {
      return getErrorMessage(data.error);
    }

    // String error
    if (typeof data === "string") {
      return data;
    }

    // DRF standard
    if (data.detail) {
      return data.detail;
    }

    // Non field errors
    if (Array.isArray(data.non_field_errors)) {
      return data.non_field_errors[0];
    }

    // Field-specific errors (otp, password, etc.)
    if (typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      const value = data[firstKey];

      if (Array.isArray(value)) return value[0];
      if (typeof value === "string") return value;

      // nested object
      return JSON.stringify(value);
    }

    return "Something went wrong";
  };

  console.log(error)

  // 🔹 STEP 1 – SEND OTP
  const sendOTP = async () => {
    if (!formData.login_input) {
      return setError("Email is required.");
    }

    try {
      setLoading(true);
      const res = await fetch(
        "http://127.0.0.1:8000/auth/user/register/request-otp/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login_input: formData.login_input }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const msg = Object.values(data)[0];
        throw new Error(Array.isArray(msg) ? msg[0] : msg);
      }

      setSuccess("OTP sent successfully!");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 STEP 2 – VERIFY OTP, REGISTER & AUTO LOGIN
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/auth/user/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(getErrorMessage(data));
      }

      // SUCCESS → AUTO LOGIN
      const loginRes = await fetch("http://127.0.0.1:8000/auth/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.login_input,
          password: formData.password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(getErrorMessage(loginData));
      }

      localStorage.setItem("access_token", loginData.access);
      localStorage.setItem("refresh_token", loginData.refresh);

     navigate("/Login", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-back p-2">
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8">
          <div className="bg-[#045E67] p-3 mb-4 rounded flex justify-center">
            <img src={logo} alt="logo" className="w-[200px]" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">Registration</h2>

          {error && (
            <p className="text-red-600 text-center text-sm mb-2">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-center text-sm mb-2">{success}</p>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <input
                type="email"
                name="login_input"
                placeholder="Enter Your Email Id"
                value={formData.login_input}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
              />

              <button
                onClick={sendOTP}
                disabled={loading}
                className="w-full bg-teal-600 text-white py-2 rounded"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-3">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />

              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={formData.password2}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white py-2 rounded"
              >
                {loading ? "Creating..." : "Verify OTP & Register"}
              </button>
            </form>
          )}

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
