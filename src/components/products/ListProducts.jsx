import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ListProducts({ products }) {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-around">
      {products.map((product) => {
        return <ProductCard {...product} key={product._id} />;
      })}
    </div>
  );
}
