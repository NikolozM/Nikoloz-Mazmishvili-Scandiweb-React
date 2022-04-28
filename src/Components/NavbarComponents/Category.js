import React from "react";
import {Link} from "react-router-dom";

const Category = (props) => {

    return (
            <section className="navbar">

                <Link className="text-decoration" to= {"/"}>
                    <p onClick={()=>props.chooseCategory(props.name)}>{props.category.name.toUpperCase()}</p>
                </Link>
                
                </section>
    )
}
export default Category;