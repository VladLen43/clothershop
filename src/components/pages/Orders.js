import Card from "../Card";
import React from "react";
import {AppContext} from "../../App";

function Orders({onAddToFavorite}) {
    const {clotherCartItems} = React.useContext(AppContext)
    return(
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>My orders</h1>
                <div className='search-block d-flex'>
                    <img width={25} height={25} src='/photo/search.svg' alt='search'/>
                </div>
            </div>
            <div className='d-flex flex-wrap'>
                {
                    clotherCartItems.map((item,index) =>(
                        <Card key = {index}
                              id={item.id}
                              name={item.name}
                              photo={item.photo}
                              price={item.price}
                              favorited={true}
                              onFavorite={onAddToFavorite} />))
                }
            </div>
        </div>
    )
}
export default Orders