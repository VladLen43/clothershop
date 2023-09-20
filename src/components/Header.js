import React from "react";
import {Link, Route} from "react-router-dom";
import {AppContext} from "../App";

function Header(props) {
    const {clotherCartItems} = React.useContext(AppContext);
    const totalPrice = clotherCartItems.reduce((sum,obj) => Number(obj.price) + sum, 0)

    console.log()
    return (
        <header className='d-flex justify-between align-center p-40'>
            <div className='headerLeft d-flex align-center'>
                <img width='40px' height='40px' src='/photo/logo.svg'/>
                <div>
                    <Link to="/">
                    <h3 >AsianStreetWear</h3>
                    <p className='opacity-5'>The best shop of street fashion</p>
                </Link>
                </div>
            </div>
            <ul className='headerRight d-flex'>
                <li onClick={props.openCart} className='mr-30 cu-p'>
                    <img width='18px' height='18px' alt='Cart' src='/photo/cart.svg'/>
                    <span>{totalPrice}₩</span>
                </li>
                <li className='mr-30 cu-p'>
                    <Link to='/favorites'>
                    <img width={22} height={22} alt='Heart' src='/photo/heartNo.svg' />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                    <img width='18px' height='18px' alt='Profile' src='/photo/profile.svg'/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}
export default Header