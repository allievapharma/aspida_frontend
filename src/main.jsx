// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { Provider } from "react-redux";
import { store } from "../src/app/store.js";
import { AuthProvider } from "./context/AuthContext.jsx"; // <-- import your AuthProvider
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(

    <Router>
      <Provider store={store}>
        <AuthProvider> {/* <-- Wrap entire app with AuthProvider */}
          <CartProvider>
           <App />
          </CartProvider>
        </AuthProvider>
      </Provider>
    </Router>
);
