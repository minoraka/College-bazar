import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdDetailPage from "../pages/AdDetailPage";
import CreateAdPage from "../pages/CreateAdPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/ads/:id" element={<AdDetailPage />} />
      <Route path="/create" element={<CreateAdPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
}