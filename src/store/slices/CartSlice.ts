import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICartItem, IProductItem} from '../../types';

interface CartState {
    items: ICartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<IProductItem>) {
            const {_id} = action.payload;
            const existingItem = state.items.find(item => item._id === _id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({...action.payload, count: 1});
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        incrementItemCount(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            const item = state.items.find(item => item._id === itemId);
            if (item) {
                item.count += 1;
            }
        },
        decrementItemCount(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            const item = state.items.find(item => item._id === itemId);
            if (item && item.count > 1) {
                item.count -= 1;
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const {addItem, removeItem, incrementItemCount, decrementItemCount, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
