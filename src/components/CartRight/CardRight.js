import React from "react";
import axios from "axios";

import Index from "../Card";
import Info from "../Info";
import {AppContext} from "../../App";

import styles from './CartRight.module.scss';

function CartRight({onClose,clotherCartItems= [],onRemove,opened}) {
    const [orders, setOrders] = React.useState([]);
    const {setCartOpen} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const {setClotherCartItems} = React.useContext(AppContext);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const onClickOrder = () => {
        setOrders([clotherCartItems]);
        setOrderId(1);
        setIsOrderComplete(true);
        setClotherCartItems([])
    }
    const totalPrice = clotherCartItems.reduce((sum,obj) => Number(obj.price) + sum, 0)

    return(
        <div  className={`${styles.cartShadow}  ${opened ? styles.cartShadowVisible : ''}`}>
        <div className={styles.cartRight}>
            <h2 className='d-flex justify-between '>Cart <img onClick= {onClose} className='removeButton cu-p' width={30} height={30} src='/photo/close.svg' alt='close'/></h2>

            {clotherCartItems.length > 0 ?
            <div className='items'>
                {
                    clotherCartItems.map((obj) => (
                            <div key={obj.id} className="cartItem d-flex align-center">
                                <div className='cartItemImg' style={{backgroundImage: `url(${obj.photo})`}}></div>
                                <div className='mr-20'>
                                    <p className='mb-5'>{obj.name}</p>
                                    <b>{obj.price}</b>
                                </div>
                                <img className='removeButton' onClick={() => onRemove(obj.id)} width={30} height={30} src='/photo/close.svg' alt='close'/>
                            </div>
                    )
                    )

                }
                <div className='cartTotalBlock' >
                    <ul>
                        <li className='d-flex'><span>Final price:</span>
                            <div></div>
                            <b>{totalPrice}₩</b></li>
                        <li className='d-flex'><span>Tax 5%</span>
                            <div></div>
                            <b>{totalPrice / 100 * 5}₩</b></li>
                    </ul>
                    <button onClick={onClickOrder}  className='greyButton'>Make an order<img width={30} height={30} src='/photo/arrow.svg'/></button>
                </div>
            </div>

                :
            <Info title={isOrderComplete ? `Order ${orderId } is complete` : "Cart is empty"} description={isOrderComplete ? "Your order is completed" : "Make a one order"}>

            </Info>
            }
            </div>
        </div>


    )
}
export default CartRight