import React from "react";
import {AppContext} from "../App";

function Info ({image,title, description}) {
    const {setOpenCart} = React.useContext(AppContext);
    return(
        <div>
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                <img className="mb-20" width="120px" height="120px" src={image} alt="image"/>
                <h2>{title}</h2>
                <p className="opacity-6">{description}</p>
                <button onClick={() => setOpenCart(false)} className="greyButton">
                <img src="/photo/arrow.svg" width={30} height={30} alt="Arrow" />
                Go back
                </button>
            </div>

        </div>
    )
}
export default Info
