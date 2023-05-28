import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ModeContext } from "../../context/ModeContext";
import useMode from "../../hooks/useMode";

export default function AddProduct(props) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  const [mode, setMode] = useMode();

  useEffect(() => {
    if (mode !== "add") {
      setFormData({
        ...props,
        id: props._id,
      });
    }
  }, [props]);

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.brand ||
      !formData.category ||
      !formData.description ||
      !formData.name ||
      !formData.price ||
      !formData.quantity
    ) {
      Swal.fire("Fill all the fields");
      return;
    }

    const token = window.localStorage.getItem("access");

    let api;
    let res;

    if (mode === "update") {
      api = `${process.env.REACT_APP_API_URL}/products/update`;

      res = await axios.put(api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else if (mode === "add") {
      api = `${process.env.REACT_APP_API_URL}/products/add`;

      res = await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    console.log(res.data);

    if (res.data === "You don't have the access rights to do this action.") {
      Swal.fire("You don't have access");
    } else {
      window.location.href = "/admin";
    }
  }

  async function deleteProduct() {
    let api = `${process.env.REACT_APP_API_URL}/products/delete/${props._id}`;

    let res = await axios.post(api, formData);

    console.log(res.data);

    if (res.data === "You don't have the access rights to do this action.") {
      Swal.fire("You don't have access");
    } else {
      window.location.href = "/admin";
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="custom-product-form">
            <h2 style={{ color: "#0a418e" }} className="h4">
              {mode === "update" ? "Update Product" : "Product details"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="column d-flex justify-content-between">
                <div className="p-2">
                  <div className="form-group">
                    <label htmlFor="email">Name</label>
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input
                      type="brand"
                      className="form-control"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Enter brand"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                      type="category"
                      className="form-control"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter category"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Enter available quantity"
                    />
                  </div>

                  {mode !== "view" && (
                    <button type="submit" className="btn btn-primary btn-block">
                      {mode === "update" ? "Update" : "Add Product"}
                    </button>
                  )}
                </div>

                <div className="p-2 d-flex flex-column justify-content-start align-items-start">
                  <textarea
                    onChange={handleChange}
                    placeholder="Description"
                    name="description"
                    className="p-2 "
                    cols="30"
                    rows="5"
                    value={formData.description}
                  ></textarea>
                  <br />
                  <div className="form-group">
                    <label htmlFor="password">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Enter URL of image"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price in $"
                    />
                  </div>

                  {mode === "update" && mode !== "view" && (
                    <>
                      <button
                        type="button"
                        onClick={deleteProduct}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <a href="/admin" className="btn btn-primary">
                    Back
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
