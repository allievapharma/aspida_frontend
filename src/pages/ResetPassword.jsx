import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();


  const [step, setStep] = useState(1);

  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ----------------------------------
     🔴 UNIVERSAL ERROR HANDLER
  ---------------------------------- */
  const getErrorMessage = (data) => {
    if (!data) return "Something went wrong";

    if (typeof data === "string") return data;

    if (data.detail) return data.detail;

    if (Array.isArray(data.non_field_errors)) return data.non_field_errors[0];

    if (typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      const value = data[firstKey];

      if (Array.isArray(value)) return value[0];
      if (typeof value === "string") return value;

      return JSON.stringify(value);
    }

    return "Something went wrong";
  };

  /* ----------------------------------
     STEP 1 – SEND OTP
  ---------------------------------- */
  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("auth/user/password/forgot/", {
        identifier,
      });

      setSuccess(res.data.message || "OTP sent successfully");
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data
          ? getErrorMessage(err.response.data)
          : "OTP service failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     STEP 2 – RESET PASSWORD
  ---------------------------------- */
  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("auth/user/password/reset/", {
        identifier,
        otp,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setSuccess(res.data.message || "Password reset successful");

      setIdentifier("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data
          ? getErrorMessage(err.response.data)
          : "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" sign-back min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {error && (
          <p className="text-red-600 text-center mb-3 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-center mb-3 text-sm">{success}</p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter Your Email Id"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-lg"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={resetPassword} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-lg"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-4">
          Back to{" "}
          <Link to="/login" className="text-teal-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
