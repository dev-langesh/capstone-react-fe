import axios from "axios";
import React, { useState } from "react";

export default function FilterProduct({ setProducts }) {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform filtering logic or dispatch an action

    try {
      // Filter by Category API Call
      if (category) {
        const categoryResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/products/category`,
          { category }
        );
        console.log("Filtered by category:", categoryResponse.data);

        setProducts(categoryResponse.data);
      }

      // Filter by Brand API Call
      if (brand) {
        const brandResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/products/brand`,
          { brand }
        );
        console.log("Filtered by brand:", brandResponse.data);
        setProducts(brandResponse.data);
      }
    } catch (error) {
      console.error("Error filtering:", error);
    }

    console.log("Filter submitted: Brand =", brand, "Category =", category);
  };

  async function clearFilter() {
    const api = `${process.env.REACT_APP_API_URL}/products/active`;

    const res = await axios.get(api);

    setProducts(res.data);
  }

  const inputStyle = {
    padding: "0.5rem",
    border: "2px solid #0a418e",
    borderRadius: "4px",
    marginRight: "1rem",
    width: "150px",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    margin: "6px",
    backgroundColor: "#0a418e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div className="p-4">
      <h4 className="h4">Filter Product</h4>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Brand"
          type="text"
          style={inputStyle}
          value={brand}
          onChange={handleBrandChange}
        />
        <input
          placeholder="Category"
          type="text"
          style={inputStyle}
          value={category}
          onChange={handleCategoryChange}
        />

        <button type="submit" style={buttonStyle}>
          Filter
        </button>
        <button onClick={clearFilter} type="button" style={buttonStyle}>
          Clear
        </button>
      </form>
    </div>
  );
}
