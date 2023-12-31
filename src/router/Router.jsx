import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import ProductDetails from "../pages/ProductDetails";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
// import Order from "../pages/Order";
import Shop from "../pages/Shop";
import ProtectedRoute from "./ProtectedRoute";
import Order from "../pages/Order";
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="home/:id" element={<ProductDetails />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </>
  );
}

export default Router;
