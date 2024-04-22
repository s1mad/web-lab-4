import React, {useEffect, useState} from 'react';
import {getDatabase, ref, get} from 'firebase/database';
import {IProductItem} from '../types';
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks.ts"; // Importing the useDispatch hook
import {addItem} from "../store/slices/CartSlice.ts"; // Importing the addItem action
import './style/Products.css';

const Products: React.FC = () => {
    const [productItems, setProductItems] = useState<IProductItem[]>([]);
    const dispatch = useAppDispatch(); // Hook to dispatch actions

    useAppSelector(state => state.cart.items);

    useEffect(() => {
        const fetchProductItems = async () => {
            try {
                const dbRef = ref(getDatabase(), 'productItems');
                const snapshot = await get(dbRef);

                if (snapshot.exists()) {
                    const productItemsData: IProductItem[] = [];
                    snapshot.forEach((childSnapshot) => {
                        productItemsData.push(childSnapshot.val());
                    });
                    setProductItems(productItemsData);
                } else {
                    console.log("Данные карточек товаров не найдены");
                }
            } catch (error) {
                console.error("Ошибка при загрузке карточек товаров из базы данных Firebase:", error);
            }
        };

        fetchProductItems();
    }, []);

    const addToCart = (productId: string) => {
        const selectedProduct = productItems.find(item => item._id === productId);
        if (selectedProduct) {
            dispatch(addItem(selectedProduct));
            console.log(`Товар с id ${productId} добавлен в корзину`);
        } else {
            console.error(`Товар с id ${productId} не найден`);
        }
    };

    return (
        <div className="products-container">
            <h2>Товары</h2>
            <div className="products-grid">
                {productItems.map((productItem) => (
                    <div key={productItem._id} className="product-card">
                        <img src={productItem.imagePath} alt={productItem.name}/>
                        <div className="details">
                            <h3>{productItem.name}</h3>
                            <p>{productItem.price} руб.</p>
                        </div>
                        <button onClick={() => addToCart(productItem._id)}>Добавить в корзину</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
