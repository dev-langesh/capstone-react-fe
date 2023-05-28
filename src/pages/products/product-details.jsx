import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddProduct from "./add-product";
import useMode from "../../hooks/useMode";
import ViewProduct from "../../components/products/ViewProduct";

export default function ProductDetails(props) {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  const [mode, setMode] = useMode();

  useEffect(() => {
    console.log(window.location);
    async function get() {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/${id}`
      );

      console.log(res.data);

      if (res.data) {
        setProduct(res.data);
      }
    }

    get();
  }, []);
  return (
    <div>
      {mode !== "view" ? (
        <AddProduct {...product} />
      ) : (
        <ViewProduct {...product} />
      )}
    </div>
  );
}
