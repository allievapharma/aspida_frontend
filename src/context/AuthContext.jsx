import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    access: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth((prev) => ({ ...prev, access: token }));
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/auth/user/profile/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAuth((prev) => ({ ...prev, user: res.data }));
    } catch (err) {
      console.log("Failed to fetch user profile");
    }
  };

  const login = async (accessToken) => {
    localStorage.setItem("token", accessToken);
    setAuth((prev) => ({ ...prev, access: accessToken }));
    await fetchUserProfile(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ access: null, user: null });
    window.location.href = "/Login";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
