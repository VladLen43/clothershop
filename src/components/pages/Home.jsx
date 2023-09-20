import Card from "../Card";
import React from "react";
import {AppContext} from "../../App";

function Home({clotherItems,
                  searchClother,
                  clotherCartItems,
                  setSearchClother,
                  onChangeSearchInput,
                  onAddToCart,
                  onAddToFavorite,
                  isLoading}) {

    const {isItemAdded} = React.useContext(AppContext);
const renderItems = () => {

    const filteredItems = clotherItems.filter((item) => item.name.toLowerCase().includes(searchClother.toLowerCase()));
    return(isLoading ? [...Array(8)] : filteredItems).map((item,index) =>(
                    <Card key = {index}
                          loading = {isLoading}
                          favorited={clotherCartItems.some(obj => Number(obj.id) === Number(item.id))}
                          cartAdded = {isItemAdded(item &&item.id)}
                          onPlus = {(item) => onAddToCart(item)}
                          onFavorite = {(item) => onAddToFavorite(item) }
                          {...item}
                    />));
        };

    return(
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>{searchClother ? `Search request: "${searchClother}"` : 'All'}</h1>
                <div className='search-block d-flex'>
                    <img width={25} height={25} src='/photo/search.svg' alt='search'/>
                    <input value={searchClother} onChange={onChangeSearchInput} placeholder='Search...' />
                    {searchClother && <img onClick={() => setSearchClother('')} className='clearInput cu-p' src='/photo/close.svg'></img>}
                </div>
            </div>
            <div className='d-flex flex-wrap'>
            {renderItems()}
            </div>
        </div>
    )
}
export default Home