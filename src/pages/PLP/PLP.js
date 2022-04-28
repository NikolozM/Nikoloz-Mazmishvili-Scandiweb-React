import Products from "../../Components/Products/Products";
import React from "react";

function PLP({products,currencyIndex,renderCategoryName,getIndex,showCart}) {
 return (
    <div>
        <h1 className="renderCategoryName">
             {renderCategoryName}
             </h1>
    <Products
         products = {products} currencyIndex={currencyIndex} getIndex={getIndex}
        />
        </div>
 )
}
export default PLP;