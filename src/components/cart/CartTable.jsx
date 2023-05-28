import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { increaseQuantity, removeItem } from "../../features/cartSlice";
import axios from "axios";
import Swal from "sweetalert2";

const CartComponent = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const ct = useSelector((state) => state.cart.value);

  useEffect(() => {
    setCart(ct);
  }, [ct]);

  useEffect(() => {
    let tt = 0;

    console.log(cart);

    cart.forEach((item) => {
      tt += item.subtotal;
    });

    setTotal(tt);
  }, [cart]);

  const handleIncreaseQuantity = (productId, quantity) => {
    dispatch(increaseQuantity({ id: productId, quantity }));
  };

  const handleRemoveItem = async (productId) => {
    dispatch(removeItem({ id: productId }));

    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/cart/remove/${productId}`
    );

    console.log(res.data);
  };

  async function placeOrder() {
    const token = window.localStorage.getItem("access");

    cart.forEach(async (product) => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders/create`,
        { ...product },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      Swal.fire(res.data);
    });
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleIncreaseQuantity(item._id, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.subtotal}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="d-flex align-items-center justify-content-between py-3 px-6">
        <p className="d-flex align-items-center " style={{ marginTop: "20px" }}>
          <h4 className="h6 px-3">Total</h4>
          <h6 className="h6">{total} $</h6>
        </p>

        <Button onClick={placeOrder} variant="contained" color="primary">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartComponent;
