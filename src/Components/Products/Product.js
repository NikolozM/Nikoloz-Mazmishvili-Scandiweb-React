import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, currencyIndex }) => {
  return (
    <div className="card">
      {product.inStock ? (
        <Link to={`/PDP/${product.id}`}>
          <img className="card--image" src={product.gallery[0]}></img>
        </Link>
      ) : (
        <img className="outStock--card--image" src={product.gallery[0]}></img>
      )}

      {product.inStock ? null : (
        <h1 className="outStock--card--txt"> OUT OF STOCK </h1>
      )}

      <h3
        className={product.inStock ? "fontSize" : "outStock--card--id--price"}>
        {product.name}
      </h3>

      <span
        className={product.inStock ? "fontSize" : "outStock--card--id--price"}>
        {product.prices[currencyIndex].currency.symbol}{" "}
        {product.prices[currencyIndex].amount}
      </span>
    </div>
  );
};

export default Product;
