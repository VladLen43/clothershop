import logo from './logo.svg';
import './App.css';
import 'macro-css'
import Card from "./components/Card";
import Header from "./components/Header";
import CartRight from "./components/CartRight/CardRight";
import React from "react";
import {Route, Routes} from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from "axios";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import Orders from "./components/pages/Orders";

export const AppContext = React.createContext({})

function App() {
    const [openCart, setOpenCart] = React.useState(false);
    const [searchClother, setSearchClother] = React.useState('');
    const [clotherCartItems, setClotherCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [clotherItems, setClotherItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const clother = [
            {
                "id": 1,
                "photo": "/items/1.jpg",
                "name": "New cool short top",
                "price": "17000"
            },
            {
                "id": 2,
                "photo": "/items/2.jpg",
                "name": "Black Jacket",
                "price": "34000"
            },
            {
                "id": 3,
                "photo": "/items/3.jpg",
                "name": "Black T-Shirt",
                "price": "18000"
            },
            {
                "id": 4,
                "photo": "/items/4.jpg",
                "name": "Cream Dress",
                "price": "75000"
            },
            {
                "id": 5,
                "photo": "/items/skirt.jpg",
                "name": "Beige Skirt",
                "price": "30000"
            },
            {
                "id": 6,
                "photo": "/items/sweetshot.jpg",
                "name": "Black Sweetshot",
                "price": "75000"
            },
            {
                "id": 7,
                "photo": "/items/greyjacket.jpg",
                "name": "Grey Jacket",
                "price": "65000"
            },
            {
                "id": 8,
                "photo": "/items/greyvest.jpg",
                "name": "Grey Vest sweetshot",
                "price": "55000"
            }];


    React.useEffect( () => {
        setIsLoading(true);
    async function fetchData(){
        try {
            const [cartResponse,favoritesResponse] = await Promise.all([await axios.get('https://64ff9ea3f8b9eeca9e2a500e.mockapi.io/cart'),await axios.get('https://64ff9ea3f8b9eeca9e2a500e.mockapi.io/favorites')])

            setClotherCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setClotherItems(clother);
            setIsLoading(false);
        } catch (error){
            alert('Ошибка при запросе данных')
            console.error(error)
        }

    }

    fetchData();
    },[])
    //ИСПРАВИТЬ СРАВНЕНИЕ ТОВАРОВ ПО id
    const onAddToCart = async  (obj) => {
        console.log(obj);
        try {
            const findItem = clotherCartItems.find((item) => Number(item.parentId) === Number(obj.id))
            if (findItem) {
                await axios.delete(`https://64ff9ea3f8b9eeca9e2a500e.mockapi.io/cart/${findItem.id}`)
                setClotherCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
            } else {
                setClotherCartItems((prev) =>[...prev,obj])
                const {data} = await axios.post('https://64ff9ea3f8b9eeca9e2a500e.mockapi.io/cart', obj);
                setClotherCartItems((prev) => prev.map(item => {
                    if(item.parentId === data.parentId) {
                        return{
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }));
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину')
            console.error(error);
        }

    };
    const onAddToFavorite = async (obj)  => {
        try {
            if (favorites.find(favItem => favItem.id === obj.id)) {
                axios.delete(`https://64ff9ea3f8b9eeca9e2a500e.mockapi.io/favorites/${obj.id}`);
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));

            } else {
                const {data} = await axios.post('https://64ff9ea3f8b9eeca9e2a500e.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Faild when it outted to favorites')
            console.error(error)
        }

    };
   const onRemoveCartItem = (id) => {
       try {
           axios.delete(`https://64ff9ea3f8b9eeca9e2a500e.mockapi.io/cart/${id}`)
           setClotherCartItems((prev) => prev.filter(item => item.id !== id))
       } catch (error) {
           alert('Ошибка при удалении товара')
           console.error(error)
       }
    };
    const onChangeSearchInput = (event) => {
        setSearchClother(event.target.value);
    };
    const isItemAdded = (id) => {
        return(clotherCartItems.some((obj) => Number(obj.parentId)===Number(id)))
    }

  return (
  <AppContext.Provider value={{clotherCartItems,favorites,clotherItems,isItemAdded,setOpenCart,setClotherCartItems}}>
      <div className="wrapper clear">
          <CartRight onRemove ={onRemoveCartItem} clotherCartItems={clotherCartItems} onClose ={()=>setOpenCart(false)} opened ={openCart}/>
          <Header openCart ={()=> setOpenCart(true)} />

          <Routes>
              <Route path="/" exact element={<Home clotherItems={clotherItems}
                                                   clotherCartItems = {clotherCartItems}
                                                   searchClother={searchClother}
                                                   setSearchClother={setSearchClother}
                                                   onChangeSearchInput={onChangeSearchInput}
                                                   onAddToCart ={onAddToCart}
                                                   onAddToFavorite={onAddToFavorite}
                                                   isLoading={isLoading}
              />}/>
              <Route path="/favorites" exact element={<Favorites onAddToFavorite={onAddToFavorite} onRemoveCartItem={onRemoveCartItem}/>}/>
              <Route path="/orders" exact element={<Orders/>}> </Route>
          </Routes>

      </div>
  </AppContext.Provider>
  );
}

export default App;
