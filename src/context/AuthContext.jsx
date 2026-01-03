import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_BASE = "http://127.0.0.1:8000";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    user: null,
    loading: true,
  });

  // -------------------------------
  // Load token on app start
  // -------------------------------
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuth((prev) => ({ ...prev, accessToken: token }));
      fetchUserProfile(token);
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // -------------------------------
  // Fetch user profile
  // -------------------------------
  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get(`${API_BASE}/auth/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAuth({
        accessToken: token,
        user: res.data,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch user profile");
      logout();
    }
  };

  // -------------------------------
  // Login (after register / login)
  // -------------------------------
  const login = async (accessToken) => {
    localStorage.setItem("access_token", accessToken);

    setAuth((prev) => ({
      ...prev,
      accessToken,
      loading: true,
    }));

    await fetchUserProfile(accessToken);
  };

  // -------------------------------
  // Logout
  // -------------------------------
  const logout = () => {
    localStorage.removeItem("access_token");
    setAuth({
      accessToken: null,
      user: null,
      loading: false,
    });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};
