import React, { useEffect, useState } from "react";
import ListProducts from "../../components/products/ListProducts";
import useMode from "../../hooks/useMode";
import FilterProduct from "../../components/products/FilterProduct";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function get() {
      let api;

      // if (mode === "admin") {
      //   api = `${process.env.REACT_APP_API_URL}/products/all`;
      // } else {
      api = `${process.env.REACT_APP_API_URL}/products/active`;
      // }

      const token = window.localStorage.getItem("access");

      const res = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      if (res.data) {
        setProducts(res.data);
      }
    }

    get();
  }, []);

  return (
    <main>
      <FilterProduct setProducts={setProducts} />
      <h1 className="h6 p-4">Available Products</h1>
      <ListProducts products={products} mode="user" />
    </main>
  );
}
