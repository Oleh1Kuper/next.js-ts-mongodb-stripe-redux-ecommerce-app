import { Game } from '@/types/game';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  isShownCart: boolean;
  isShownForm: boolean;
  cartItems: Game[];
}

const initialState: CartState = {
  isShownCart: false,
  isShownForm: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isShownCart = !state.isShownCart;
    },
    addCart: (state, action: PayloadAction<Game>) => {
      const newCart = action.payload;
      const existingCart = state.cartItems.find(
        (cart) => cart._id === newCart._id,
      );

      if (existingCart) {
        existingCart.quantity = newCart.quantity;
      } else {
        state.cartItems.push(action.payload);
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeCart: (state, action: PayloadAction<string>) => {
      const filteredCarts = state.cartItems.filter(
        (cart) => cart._id !== action.payload,
      );

      localStorage.setItem('cart', JSON.stringify(filteredCarts));
      state.cartItems = filteredCarts;
    },
    initializeCart: (state) => {
      if (typeof window !== 'undefined') {
        const items = JSON.parse(localStorage.getItem('cart') || '[]');
        state.cartItems = items;
      }
    },
    toggleShowForm: (state) => {
      state.isShownForm = !state.isShownForm;
    },
  },
});

export const { actions } = cartSlice;
export default cartSlice.reducer;
