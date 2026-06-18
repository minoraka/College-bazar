import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdDetailPage from "../pages/AdDetailPage";
import CreateAdPage from "../pages/CreateAdPage";
import LoginPage from "../pages/LoginPage";

export default function Router() {
  return (  
    <Routes>
        <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/ads/:id" element={<AdDetailPage />} />
      <Route path="/create" element={<CreateAdPage />} />
    </Routes>
  );
}