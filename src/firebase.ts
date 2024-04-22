import {initializeApp} from "firebase/app";
import {getDatabase, ref, set} from "firebase/database";
import {IProductItem} from "./types.ts";


const firebaseConfig = {
    apiKey: 'AIzaSyA0XmbPN29dJy02AR73zCCaqjlkngfakpg',
    authDomain: 'auth-lab-64909.firebaseapp.com',
    databaseURL: 'https://auth-lab-64909-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: 'auth-lab-64909',
    storageBucket: 'auth-lab-64909.appspot.com',
    messagingSenderId: '587130842378',
    appId: '1:587130842378:web:8c052b0ea2f77fb2321ef3'
};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export const uploadProductItemsToDatabase = async (productItems: IProductItem[]) => {
    try {
        for (const productItem of productItems) {
            const productRef = ref(db, `productItems/${productItem._id}`);
            await set(productRef, productItem);
        }

        console.log("Карточки успешно загружены в базу данных Firebase.");
    } catch (error) {
        console.error("Ошибка при загрузке карточек в базу данных Firebase:", error);
    }
};


