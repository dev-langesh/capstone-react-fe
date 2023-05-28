import React, { useEffect } from "react";
import CartTable from "../../components/cart/CartTable";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItems } from "../../features/cartSlice";

export default function CartHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function get() {
      const token = window.localStorage.getItem("access");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/cart/all/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      if (res.data) {
        dispatch(addItems(res.data));
      }
    }

    get();
  }, []);

  return (
    <div>
      <h1 className="h4 text-primary p-4 text-center">Cart</h1>
      <main className="d-flex align-items-center justify-content-center">
        <div
          style={{
            width: "800px",
          }}
        >
          <CartTable />
        </div>
      </main>
    </div>
  );
}
