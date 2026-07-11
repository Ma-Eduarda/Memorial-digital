import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; 
import MainLayout from "./layout/MainLayout";
import HomePage from "../src/pages/HomePage";
import AllMemorialsPage from "../src/pages/AllMemorialsPage";
import MemorialPage from "../src/pages/MemorialPage";
import MapPage from "../src/pages/MapPage";
import AdminDashboard from "../src/pages/Adm/AdminDashboard";
import AdminMemoriais from "../src/pages/Adm/AdminMemoriais";
import AdminRelatorios from "./pages/Adm/AdminRelatorios";
import AdminConfig from "./pages/Adm/AdminConfig";

function App() {
  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path="memoriais/:id" element={<MemorialPage />} />
          <Route path="memoriais" element={<AllMemorialsPage />} />
          <Route path="/mapa" element={<MapPage />} />
        </Route>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/memoriais" element={<AdminMemoriais />} />
        <Route path="admin/relatorios" element={<AdminRelatorios />} />
        <Route path="admin/configuracoes" element={<AdminConfig />} />
      </Routes>
    </>
  );
}

export default App;