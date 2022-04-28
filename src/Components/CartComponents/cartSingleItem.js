import React from "react";
import RenderAttr from "../RenderAttr";
const CartSingleItem= ({item,setQuantity,currencyIndex,setCartItem,cartItem}) => {
    const copyCartItem = [...cartItem];

    function deleteItem(){
       if(item.count === 0) {
           for(let i = 0 ; i < copyCartItem.length; i ++ ){
            if ( item.individualId === copyCartItem[i].individualId){
                copyCartItem.splice(i,1);
                setCartItem(copyCartItem);
                 }
            }
        }
    }

    return (
        <div style={{display:"flex",position:"relative",alignItems:"center",justifyContent: "space-between", borderBottom:"2px solid #E5E5E5",borderTop:"2px solid #E5E5E5"}}>
            <div>

            <h3 style={{fontFamily: 'Raleway',fontSize: "30px", fontWeight:"600",marginTop:"24px",marginBottom:"16px"}}>{item.name}</h3>
            <h3 style={{fontFamily: 'Raleway',fontSize: "30px", fontWeight:"400",marginBottom:"20px"}}>{item.bottomname}</h3>


            <h3 style={{fontFamily: 'Raleway',fontSize: "24px", fontWeight:"700",marginBottom:"20px",display:"inline"}}>
               <span>{item.symbol[0][currencyIndex]}</span></h3>

            <h3 style={{fontFamily: 'Raleway',fontSize: "24px", fontWeight:"700",marginBottom:"20px",display:"inline"}}>
               <span>{item.price[0][currencyIndex]}</span></h3>

                <div style={{}}>
            {item.cartAttributes.map(item=>{
                return (
                <ul style={{listStyle: "none", paddingLeft:"0px"}}>
                    <h4 style={{fontFamily: 'Raleway',fontSize: "18px", fontWeight:"700 bold",marginBottom:"25px"}}>{item.name}</h4>

                        <li style={item.name === "Color" ? {backgroundColor:item.displayValue,width:"32px",height:"32px",marginTop:"-17px",border: "1px solid black"} : null }>
                              {item.name === "Color" ? <p style={{opacity:"0",alignItems:"center",justifyContent:"center"}}>.</p> : <h4 className="cart--attribute--name" >{RenderAttr(item)}</h4>}
                        </li>

                </ul>
                )})}
            </div>

            </div>

            <div onClick={()=> {
                setQuantity((prev)=> prev + 1);
                item.count = item.count + 1;
            }}
            style={{position:"absolute",top:"24px",right:"20%",border: "1px solid #1D1F22",cursor:"pointer"}}>

            <h2 style={{margin:"0",padding:"15px 15px 15px 15px",alignItems:"center"}}>
                +
                </h2>
            </div>
            <div>
                <h1 style={{position:"absolute",top:"46%",right:"21%",transform:"translate(+0%, -50%)",fontSize:"24px",fontFamily: 'Raleway'}}>
                    {item.count}
                    </h1>
            </div>

            <div onClick={()=>{
                    setQuantity((prev)=> prev - 1);
                    item.count = item.count - 1;
                    deleteItem();
                }}
                style={{position:"absolute",bottom:"24px",right:"20%",border: "1px solid #1D1F22",cursor:"pointer"}}>
            <h2 style={{margin:"0",padding:"15px 17px 15px 17px",alignItems:"center"}}>
                -
                </h2>
            </div>

            <div>
            <img  className="cart--image" src={item.cartImg}></img>
            </div>

        </div>
    )
}

export default CartSingleItem;