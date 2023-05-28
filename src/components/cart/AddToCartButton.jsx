import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cartSlice";
import axios from "axios";
import Swal from "sweetalert2";

const AddToCartButton = (props) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    dispatch(addItem(props));

    const token = window.localStorage.getItem("access");

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/cart/add/`,
      { ...props },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    Swal.fire("Item added to cart");
  };

  return (
    <button className="cart-btn" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
