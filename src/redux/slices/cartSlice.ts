import { getCartFromLS } from './../../utils/getCartFromLS';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { calcTotalPrice } from '../../utils/calcTotalPrice';


export type CartItems = {
    id: number
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}

interface CartSliceState {
    totalPrice: number
    items: CartItems[]
}
const { items, totalPrice } = getCartFromLS()
const initialState: CartSliceState = {
    totalPrice,
    items
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItems>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<number>) {
            const findItem = state.items.find((obj) => obj.id === action.payload)

            if (findItem) {
                findItem.count--
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
    }
})

export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)
export const selectCart = (state: RootState) => state.cart

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer