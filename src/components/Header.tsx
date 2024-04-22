import {FC, useState} from "react";
import './style/Header.css';
import './style/Cart.css';
import './style/Account.css';
import logoImage from '../assets/cube-maxi.svg';
import cartIcon from '../assets/cart.svg';
import accountIcon from '../assets/account.svg';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';
import deleteIcon from '../assets/delete.svg';
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks.ts";
import { useAuth } from "../hooks/use-auth.ts";
import { Link } from "react-router-dom";
import {removeItem, incrementItemCount, decrementItemCount, clearCart} from "../store/slices/CartSlice.ts";
import { RootState } from "../store";
import {removeUser} from "../store/slices/UserSlice.ts";

const Header: FC = () => {
    const [isShowCart, setIsShowCart] = useState(false);
    const [isShowAccount, setIsShowAccount] = useState(false);

    const dispatch = useAppDispatch();
    const { email } = useAuth();
    const cartItems = useAppSelector((state: RootState) => state.cart.items);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

    const removeHandler = (id: string) => {
        dispatch(removeItem(id));
    }

    const incrementCount = (id: string) => {
        dispatch(incrementItemCount(id));
    };

    const decrementCount = (id: string) => {
        dispatch(decrementItemCount(id));
    };

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
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-text">Корзина пуста</div>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.name}>
                                    <img src={item.imagePath} alt={item.name} className="cart-item-image"/>
                                    <div>
                                        <div className="cart-item-details">
                                            <div className="cart-item-name">{item.name}</div>
                                            <div className="cart-item-price">{`${item.count} x ${item.price} ₽`}</div>
                                        </div>
                                        <div className="cart-item-btns-container">
                                            <button className='cart-item-btn' onClick={() => decrementCount(item._id)}>
                                                <img src={minusIcon} alt='-'/>
                                            </button>
                                            <button className='cart-item-btn' onClick={() => incrementCount(item._id)}>
                                                <img src={plusIcon} alt='+'/>
                                            </button>
                                            <button className='cart-item-btn' onClick={() => removeHandler(item._id)}>
                                                <img src={deleteIcon} alt='Delete'/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {cartItems.length > 0 && (
                        <button className='cart-btn'>Купить за {total} ₽</button>
                    )}
                </div>
            )}

            {isShowAccount && (
                <div className="account-overlay" onMouseLeave={() => setIsShowCart(false)}>
                    <div>{email}</div>
                    <button onClick={() => {
                        dispatch(removeUser())
                        dispatch(clearCart());
                    }}>Выйти</button>
                </div>
            )}
        </>
    )
};

export default Header;
