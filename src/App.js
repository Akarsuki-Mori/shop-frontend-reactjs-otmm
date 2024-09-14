import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import ProductEntry from "./pages/product/ProductEntry";
import ProductList from "./pages/product/ProductList";
import Schedular from "./pages/test/MonthlyScheduler";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectToMainPage />} />
          <Route path="*" element={<RedirectToMainPage />} />
          <Route path="/products/entry" element={<ProductEntry />}></Route>
          <Route path="/products/entry/:id" element={<ProductEntry />}></Route>
          <Route path="/products/list" element={<ProductList />}></Route>

          <Route path="/calendar" element={<Schedular />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function RedirectToMainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/products/list');
  }, [navigate]);

  return null;
}

export default App;
