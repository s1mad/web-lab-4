import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { IProductItem } from '../types';
import './style/Products.css';

const Products: React.FC = () => {
    const [productItems, setProductItems] = useState<IProductItem[]>([]);

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
        console.log(`Товар с id ${productId} добавлен в корзину`);
    };

    return (
        <div className="products-container">
            <h2>Товары</h2>
            <div className="products-grid">
                {productItems.map((productItem) => (
                    <div key={productItem._id} className="product-card">
                        <img src={productItem.imagePath} alt={productItem.name} />
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
