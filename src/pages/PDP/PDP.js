import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import RenderAttr from "../../Components/RenderAttr";

function PDP({ currencyIndex, setCartItem, setQuantity, cartItem }) {
  const { id } = useParams();

  const LOAD_PRODUCT = gql`
  
    query LOAD_PRODUCT {
      product(id: "${id}"){
        id,
        name,
        gallery,
        description,
        attributes{
          id
          name
          type
          items{
            displayValue
            id
          }
        }
        prices{
          currency{
            label
            symbol
          }
          amount
        }
        brand
      }
    }
    `;
  const { error, loading, data } = useQuery(LOAD_PRODUCT);
  const [mainImage, setMainImage] = useState([]);
  const [cartAttributes, setCartAttributes] = useState([]);

  useEffect(() => {
    if (data) {
      setMainImage(data.product.gallery[0]);
    }
  }, [data]);

  const images = [];
  let description;
  // we are using individualId to remove individual items.
  let individualId = cartItem.length;
  let name;
  let bottomname;
  let cartImg;
  let symbol = [];
  let price = [];
  let attributevalue = [];
  // we are using count and price to update total price
  const count = 1;

  if (data) {
    for (let i = 0; i < data.product.gallery.length; i++) {
      images.push(
        <img
          key={i}
          src={data.product.gallery[i]}
          onClick={() => setMainImage(data.product?.gallery[i])}
        />
      );
    }
    description = data.product.description?.replace(
      new RegExp("<[^>]*>", "g"),
      ""
    );

    name = data.product.name.split(" ", 1);
    bottomname = data.product.name.substr(data.product.name.indexOf(" ") + 1);
    cartImg = data.product.gallery[0];
    symbol.push(data.product.prices.map((prev) => prev.currency.symbol));
    price.push(data.product.prices.map((prev) => prev.amount));
  }

  // objet to ADD to Cart
  let obj = {
    individualId,
    name,
    bottomname,
    cartImg,
    symbol,
    price,
    cartAttributes,
    count,
  };

  // if product does not have attributes item adding without att choosing, but if it has , choosing att is mandatory.
  function addItemCart() {
    if (data?.product?.attributes == false) {
      setCartItem((prevCartItem) => [...prevCartItem, obj]);
      setQuantity((prev) => prev + 1);
    } else if (
      data?.product?.attributes.length > 0 &&
      data?.product?.attributes.length === cartAttributes.length
    ) {
      setCartItem((prevCartItem) => [...prevCartItem, obj]);
      setQuantity((prev) => prev + 1);
    } else {
      setCartItem((prevCartItem) => prevCartItem);
      setQuantity((prev) => prev);
    }
  }

  return (
    <div className="parent-cont">
      <div className="product-page-grid">
        <div className="product-pictures">
          <div className="more-pics">{images}</div>
          <div className="main-pic">
            <img src={mainImage} />
          </div>
        </div>

        <div className="product-description">
          <div>
            <h1 style={{ width: "70%", fontWeight: "600" }}>
              {name}
              <span></span>
            </h1>
            <h1 style={{ width: "70%", fontWeight: "400", marginTop: "-15px" }}>
              {bottomname}
              <span></span>
            </h1>
          </div>


          {/* start attr render */}
          <div>
            {data?.product?.attributes?.map((prev) => {
              return (
                <ul key={prev.id}>
                  <h4
                    style={{
                      fontFamily: "Roboto",
                      textTransform: "uppercase",
                    }}>
                    {prev.name} {prev.name ? <span>:</span> : null}
                  </h4>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {prev.items.map((item) => {
                      const modifyAttributes = [...cartAttributes];
                      return (
                        <li
                          key={item.id}
                          onClick={() => {
                            const sameItem = modifyAttributes.find(
                              (atr) => atr.name === prev.name
                            );
                            const attributesToAdd = {
                              name: prev.name,
                              displayValue: item.displayValue,
                            };
                            const sameItemIndex =
                              modifyAttributes.indexOf(sameItem);
                            const valueIndex = modifyAttributes.indexOf(
                              item.displayValue
                            );
                            sameItem
                              ? modifyAttributes.splice(
                                  sameItemIndex,
                                  1,
                                  attributesToAdd
                                )
                              : modifyAttributes.push(attributesToAdd);
                            setCartAttributes(modifyAttributes);
                          }}
                          style={
                            prev.name === "Color"
                              ? { backgroundColor: item.id }
                              : null
                          }>
                          {prev.name === "Color" ? null : (
                            <span style={{ fontFamily: "Roboto" }}>
                              {RenderAttr(item)}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </div>
                </ul>
              );
            })}
          </div>
          {/* attr render END*/}
          <div>
            <h4
              style={{
                maxWidth: "63px",
                margin: "5px",
                background: "red",
                display: "inline",
              }}>
              {attributevalue}
            </h4>
          </div>
          <div style={{ marginBottom: "10px", fontFamily: "Roboto" }}>
            <strong>PRICE:</strong>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <span>
              <h2 style={{ display: "inline" }}>
                {data?.product.prices[currencyIndex].currency.symbol}
              </h2>
            </span>
            <span>
              <h2 style={{ display: "inline" }}>
                {data?.product.prices[currencyIndex].amount}
              </h2>
            </span>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <button onClick={addItemCart} className="add-to-cart-btn">
              ADD TO CART
            </button>
          </div>

          <h3 style={{ fontFamily: "Roboto", fontWeight: "400" }}>
            {description}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PDP;
