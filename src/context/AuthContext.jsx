import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuth((prev) => ({ ...prev, accessToken: token }));
      fetchUserProfile();
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axiosInstance.get("/auth/user/profile/");
      setAuth({
        accessToken: localStorage.getItem("access_token"),
        user: res.data,
        loading: false,
      });
    } catch (error) {
      logout();
    }
  };

  const login = async (accessToken) => {
    localStorage.setItem("access_token", accessToken);
    setAuth((prev) => ({ ...prev, accessToken, loading: true }));
    await fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAuth({ accessToken: null, user: null, loading: false });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};
