import {FC, useState} from "react";

import './style/Header.css'
import './style/Cart.css'
import './style/Account.css'
import logoImage from '../assets/cube-maxi.svg';
import cartIcon from '../assets/cart.svg';
import accountIcon from '../assets/account.svg';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';
import deleteIcon from '../assets/delete.svg';
import {removeUser} from "../store/slices/UserSlice.ts";
import {useAppDispatch} from "../hooks/redux-hooks.ts";
import {useAuth} from "../hooks/use-auth.ts";
import {Link} from "react-router-dom";

export interface ICartItem {
    count: number
    _id: string
    name: string
    imagePath: string
    price: number
}

const cartItems: ICartItem[] = [
    {
        _id: '12d112d',
        name: 'Смартфон Apple iPhone 15 Pro',
        imagePath: 'https://img.mvideo.ru/Big/30069473bb.jpg',
        count: 1,
        price: 125999
    },
    {
        _id: '2123ds',
        name: 'Смартфон Samsung Galaxy S24 Ultra',
        imagePath: 'https://img.mvideo.ru/Big/30070490bb.jpg',
        count: 1,
        price: 146999
    },
];

const Header: FC = () => {
    const [isShowCart, setIsShowCart] = useState(false);
    const [isShowAccount, setIsShowAccount] = useState(false);

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    const dispatch = useAppDispatch();
    const {email} = useAuth();

    const removeHandler = (id: string) => {
        console.log(id)
    }

    return (
        <>
            <header className='header'>
                <Link to='/'>
                    <img src={logoImage} alt="Logo" className="logo-icon"/>
                </Link>
                <div className="header-left-buttons">
                    <img src={cartIcon} alt="Cart" className="cart-icon" onClick={() => {
                        setIsShowAccount(false)
                        setIsShowCart(!isShowCart)
                    }}/>
                    <img src={accountIcon} alt="Account" className="account-icon"
                         onClick={() => {
                             setIsShowCart(false)
                             setIsShowAccount(!isShowAccount)
                         }}/>
                </div>
            </header>

            {isShowCart && (
                <div className="cart-overlay" onMouseLeave={() => setIsShowCart(false)}>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div className="cart-item" key={item.name}>
                                <img src={item.imagePath} alt={item.name} className="cart-item-image"/>
                                <div>
                                    <div className="cart-item-details">
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-price">{`${item.count} x ${item.price} ₽`}</div>
                                    </div>
                                    <div className="cart-item-btns-container">
                                        <button className='cart-item-btn' onClick={() => {
                                            if (item.count > 1) cartItems[index].count -= 1
                                        }}><img src={minusIcon} alt='-'/></button>
                                        <button className='cart-item-btn' onClick={() => {
                                            cartItems[index].count += 1
                                        }}><img src={plusIcon} alt='+'/>
                                        </button>
                                        <button className='cart-item-btn' onClick={() => {
                                            removeHandler(item._id)
                                        }}><img src={deleteIcon} alt='Delete'/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className='cart-btn'>Buy for {total} ₽</button>
                </div>
            )}
            {isShowAccount && (
                <div className="account-overlay" onMouseLeave={() => setIsShowCart(false)}>
                    <div>{email}</div>
                    <button onClick={() => dispatch(removeUser())}>Log out</button>
                </div>
            )}
        </>
    )
};

export default Header;
