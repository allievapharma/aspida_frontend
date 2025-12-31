import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Productdetails from "./pages/Productdetails";
import ScrollToTop from "./components/ScrollToTop";
import Products from "./pages/Products";
import { useGetCartQuery } from "../src/features/productsApi";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import ErrorBoundary from "./components/ErrorBoundary"; // ✅ ADD THIS

function App() {
  useGetCartQuery();

  return (
    <>
      <ScrollToTop />

      {/* ✅ ERROR BOUNDARY ADDED */}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Productdetails />} />
          <Route path="/brand/:name" element={<Productdetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/Signup" element={<Signup />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
