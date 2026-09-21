import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { Login, Register } from "./pages/AuthPages";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

export default function App() {
  return <Routes><Route element={<Layout />}><Route path="/" element={<Home />} /><Route path="/products/:id" element={<ProductDetails />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/cart" element={<Cart />} /><Route element={<ProtectedRoute />}><Route path="/checkout" element={<Checkout />} /><Route path="/orders" element={<Orders />} /></Route><Route element={<ProtectedRoute admin />}><Route path="/admin" element={<Admin />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes>;
}