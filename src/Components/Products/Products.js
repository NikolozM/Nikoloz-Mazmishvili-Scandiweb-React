import React from "react";
import Product from "./Product";

const Products = ({ products, currencyIndex }) => {
  return (
    <div className="cards-list">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          currencyIndex={currencyIndex}
        />
      ))}
    </div>
  );
};
export default Products;
