import React, { useContext, useEffect } from "react";
import ListProducts from "../../components/products/ListProducts";
import { ModeContext } from "../../context/ModeContext";
import useMode from "../../hooks/useMode";

export default function AdminDashboard() {
  const [mode, setMode] = useMode();

  useEffect(() => {
    setMode("update");
  }, []);

  useEffect(() => {
    console.log(mode);
  });

  function goToAddProductPage() {
    console.log(mode);
    setMode("add");
    window.location.href = "/products/add-product";
  }

  return (
    <div>
      <div className="p-3">
        <button
          className="add-product-btn p-2 text-decoration-none text-white"
          onClick={goToAddProductPage}
        >
          Add Product
        </button>
      </div>

      <main>
        <h1 className="h6 p-4">Available Products</h1>
        <ListProducts mode="admin" />
      </main>
    </div>
  );
}
