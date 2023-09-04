import React from "react";


function Card(props) {
    const onCLickButton =() => {
        alert(props.title)
    }
    return (
        <div className='card'>
            <div className='favorite'>
                <img className='ml-5 mt-5' width={22} height={22} src='/photo/heartNo.svg' alt='unlikedHeart'/>
            </div>
            <img width={160} height={170} src={props.photo} alt='' />
            <h5>{props.title}</h5>
            <div className='cardBottom d-flex justify-between align-center'>
                <div className='d-flex flex-column '>
                    <span>Price:</span>
                    <b>{props.price}₩</b>
                </div>
                <button className='button' onClick={props.onClick}>
                    <img width={20} height={20} src='/photo/plus.svg' alt='plus'/>
                </button>
            </div>
        </div>
    )
}
export default Card