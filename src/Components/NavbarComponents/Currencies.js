import React from "react"

export default function Currencies(props) {

    return (
        <div onClick={()=>props.changeCurrency(props.label)}>

            <span style={{paddingRight:"5px"}}>{props.symbol}</span>
            {props.label}
            
        </div>
    )
}