import React, {useEffect, useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import PLP from "./pages/PLP/PLP";
import PDP from "./pages/PDP/PDP";
import Cart from "./pages/Cart/Cart";
import Navbar from "./pages/Navbar";
import { Routes, Route, } from "react-router-dom";

import {faYenSign, faPoundSign, faAustralSign, faRubleSign} from "@fortawesome/free-solid-svg-icons";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";


function App() {
const [category,setCategory]= useState("all");

const LOAD_PRODUCTS = gql `

query LOAD_PRODUCTS{
    category (input: {title:"${category}"}){
      products {
        id
        name
        inStock
        category
        gallery
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    },
    categories{
      name
    },
    currencies{
      label
      symbol
    }
  }
  `
    const {error, loading, data} = useQuery(LOAD_PRODUCTS);
    const [products, setProducts] = useState([])
    const [renderCategoryName, setRenderCategoryName] = useState('ALL');
    const [currencyIndex,setCurrencyIndex] = useState(0);
    const [currencySign, setCurrencySign] = useState(faDollarSign);
    // Cart page quantity and totalPrice
    const [quantity, setQuantity] = useState(0);
    const[cartItem,setCartItem] = useState([]);

    useEffect(() =>{
        if (data){
            setProducts(data.category.products);
        }
    }, [data]);

// onClick chooses category and renders items by category. This func goes by props to category
const chooseCategory =(name) => {
    setCategory(name);
    setRenderCategoryName(name.toUpperCase());
    }

// Changes currency index and passing changed index to product by props
     function changeCurrency(label){
        if (label ==="GBP"){
             setCurrencyIndex(1)
             setCurrencySign(faPoundSign)
        }else if (label ==="USD"){
             setCurrencyIndex(0)
             setCurrencySign(faDollarSign)
        }else if (label ==="AUD"){
             setCurrencyIndex(2)
             setCurrencySign(faAustralSign)
        }else if (label ==="JPY"){
             setCurrencyIndex(3)
             setCurrencySign(faYenSign)
        }else if (label="RUB"){
             setCurrencyIndex(4)
             setCurrencySign(faRubleSign)
        }
             }


    
    return (
        <div>
            <Navbar
        chooseCategory={chooseCategory} changeCurrency = {changeCurrency} currencySign={currencySign}
        cartItem={cartItem} setQuantity={setQuantity} quantity={quantity} currencyIndex={currencyIndex}
        />
        <Routes>
            <Route path="/" element = {<PLP
        products = {products} currencyIndex = {currencyIndex} renderCategoryName = {renderCategoryName} 
        />}
        />

        <Route path= "/PDP/:id" element = {<PDP currencyIndex = {currencyIndex} setCartItem={setCartItem}
        cartItem ={cartItem}setQuantity={setQuantity} />}/>

        <Route path= "/Cart" element = {<Cart cartItem={cartItem} setQuantity={setQuantity} 
         quantity={quantity} currencyIndex={currencyIndex} setCartItem={setCartItem}/>}/>
        </Routes>
        </div>
    )
}

export default App;