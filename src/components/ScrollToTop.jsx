// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi route change hoga, page top pe scroll hoga
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Smooth scrolling (chahe to 'auto' kar sakte ho)
    });
  }, [pathname]);

  return null;
}
