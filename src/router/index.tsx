import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home";
import Search from "../pages/search";
import Favorites from "../pages/favorites";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favorites" element={<Favorites />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PublicRoutes;
