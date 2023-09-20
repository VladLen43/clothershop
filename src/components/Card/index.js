import React from "react";
import styles from './Card.module.scss';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import ContentLoader from "react-content-loader";
import {AppContext} from "../../App";

function Card({id,photo,name,price,onPlus,onFavorite,parentId,favorited = false, cartAdded = false,loading = false}) {
    const {isItemAdded} = React.useContext(AppContext);
    const [IsFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id,parentId:id,name,photo,price,}
    const onClickPlus = () => {
        onPlus(obj);
    }
    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!IsFavorite);
    }
    return (
        <div className={styles.card}>
            { loading ?
                <ContentLoader
                    speed={2}
                    width={200}
                    height={325}
                    viewBox="0 0 200 325"
                    backgroundColor="#ffffff"
                    foregroundColor="#c0c0c0">
                    <rect x="2" y="189" rx="10" ry="10" width="160" height="23" />
                    <rect x="8" y="264" rx="10" ry="10" width="80" height="23" />
                    <rect x="109" y="263" rx="10" ry="10" width="47" height="22" />
                    <rect x="15" y="18" rx="10" ry="10" width="126" height="130" />
                </ContentLoader> :
            <>
            <div className='favorite' onClick={onClickFavorite}>
                <img  className='ml-5 mt-5 pos-a' width={22} height={22} src={IsFavorite ? '/photo/heartYes.svg' : '/photo/heartNo.svg' }/>
            </div>
            <img width={160} height={170} src={photo} alt='' />
            <h5>{name}</h5>
            <div className='cardBottom d-flex justify-between align-center'>
                <div className='d-flex flex-column '>
                    <span>Price:</span>
                    <b>{price}₩</b>
                </div>
                    <img className={styles.plus} onClick={onClickPlus} width={20} height={20} src={isItemAdded(id) ? '/photo/cartChecked.svg' : '/photo/plus.svg' } alt='plus'/>
            </div>
            </>
            }
        </div>
    )
}
export default Card