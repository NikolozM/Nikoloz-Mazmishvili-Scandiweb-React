import React from "react";
import LayoutItem from "./LayoutItem";
import { Link } from "react-router-dom";

const CartLayout = ({ cartItem, setQuantity, quantity, currencyIndex }) => {
  let total = 0;
  let symbol;
  if (cartItem.length > 0) {
    return (
      <div
        style={{
          width: "325px",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
          padding: "32px 16px 32px 16px",
        }}>
        <div
          style={{
            margin: "0",
            marginBottom: "32px",
            fontFamily: "Raleway",
            fontSize: "16px",
            fontWeight: "700",
          }}>
          {quantity > 1 ? (
            <p>My bag, {quantity} items</p>
          ) : (
            <p>My bag, {quantity} item</p>
          )}
        </div>

        <div className="scrollBar">
          {cartItem.map(
            (item) => (
              (total += item.price[0][currencyIndex] * item.count),
              (symbol = item.symbol[0][currencyIndex]),
              (
                <LayoutItem
                key={item.individualId}
                  item={item}
                  setQuantity={setQuantity}
                  currencyIndex={currencyIndex}
                />
              )
            )
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}>
          <span style={{ fontFamily: "Roboto" }}>Total</span>
          <span style={{ fontFamily: "Roboto" }}>
            {symbol} {Math.floor(total)}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "30px",
          }}>
          <Link to={"/Cart"}>
            {" "}
            <button
              style={{
                width: "200px",
                backgroundColor: "white",
                border: "2px solid black",
                color: "black",
                cursor: "pointer",
              }}>
              <h5>VIEW BAG</h5>
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: "325px",
          height: "425px",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "center",
        }}>
        <h2
          style={{
            marginBottom: "64px",
            fontFamily: "Raleway",
            fontSize: "24px",
            fontWeight: "700",
          }}>
          CART IS EMTPY
        </h2>
      </div>
    );
  }
};
export default CartLayout;
