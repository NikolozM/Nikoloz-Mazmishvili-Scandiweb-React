import React from "react";

export default function RenderAttr(item){
    if ( item.displayValue === "Medium"){
        return (<span>M</span>);
    }else if( item.displayValue === "Small"){
        return (<span>S</span>);
    }else if( item.displayValue === "Large"){
        return (<span>L</span>);
    }else if( item.displayValue === "Extra Large"){
        return (<span>XL</span>);
    } else {
        return (item.displayValue);
    }
}