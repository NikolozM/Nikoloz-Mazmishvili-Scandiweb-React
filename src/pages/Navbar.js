import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Categories from "../Components/NavbarComponents/Categories";
import Currencies from "../Components/NavbarComponents/Currencies";
import logo from "../assets/a-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import CartLayout from "../Components/CartLayout/CartLayout";

function Navbar({
  chooseCategory,
  changeCurrency,
  currencySign,
  cartItem,
  setQuantity,
  quantity,
  currencyIndex,
}) {
  const LOAD_CATEGORIES = gql`
    query LOAD_CATEGORIES {
      categories {
        name
      }
      currencies {
        label
        symbol
      }
    }
  `;
  const { error, loading, data } = useQuery(LOAD_CATEGORIES);

  const [categories, setCategories] = useState([]);

  const [arrow, setArrow] = useState(faCaretDown);

  const [currencies, setCurrencies] = useState([]);

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      setCurrencies(null);
    }
  }, [data]);

  function changeArrow() {
    if (arrow === faCaretDown) {
      setArrow(faCaretUp);
      setCurrencies(
        data.currencies.map((prev) => (
          <Currencies
            symbol={prev.symbol}
            label={prev.label}
            changeCurrency={changeCurrency}
          />
        ))
      );
    } else if (arrow === faCaretUp) {
      setArrow(faCaretDown);
      setCurrencies(null);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <div className="flex spaceBetween navBarHeight">
        <div>
          <Categories categories={categories} chooseCategory={chooseCategory} />
        </div>

        <div style={{ margin: "auto" }}>
          <img className="logo" src={logo} />
        </div>

        <div
          style={{
            display: "flex",
            paddingRight: "150px",
            alignItems: "center",
          }}>
          <div style={{ display: "flex", paddingLeft: "100px" }}>
            <FontAwesomeIcon
              style={{ alignItems: "center" }}
              icon={currencySign}
            />
            <FontAwesomeIcon
              style={{ padding: "5px", alignItems: "end", cursor: "pointer" }}
              onClick={changeArrow}
              icon={arrow}
            />
            <div
              className="Currencies"
              style={{
                display: arrow === faCaretDown ? "none" : "flex",
                cursor: "pointer",
              }}>
              {currencies}
            </div>
          </div>

          <div style={{ paddingLeft: "22px" }}>
            <FontAwesomeIcon
              onClick={() => setShowCart((prev) => !prev)}
              icon={faShoppingCart}
              style={{ alignItems: "start", cursor: "pointer" }}
            />
            <div
              style={{
                display: showCart ? "flex" : "none",
                position: "absolute",
                left: "70%",
                top: "70px",
                backgroundColor: "rgba(255,255,255,1)",
                right: "1px",
                zIndex: "1",
                maxWidth: "325px",
              }}>
              <CartLayout
                cartItem={cartItem}
                setQuantity={setQuantity}
                quantity={quantity}
                currencyIndex={currencyIndex}
              />
            </div>
            <div
              style={{ position: "absolute", top: "17px", marginLeft: "8px" }}>
              <div
                style={{
                  position: "relative",
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                  margin: "0",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "0.9em",
                  textAlign: "center",
                }}>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translate(-50%,+5%)",
                    fontFamily: "Roboto",
                  }}>
                  {quantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
