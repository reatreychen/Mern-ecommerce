import { configureStore } from '@reduxjs/toolkit'
import userSlice from './counterSlice'
import productReducer from './productSlice'
import cartReducer from "./cartProduct"
import addressReducer from './address.js'
import orderReducer from './order.js'
const store = configureStore({
  reducer: {
    user: userSlice,
    product : productReducer,
    cartItem : cartReducer,
    address : addressReducer,
    order : orderReducer,
  },
})

export default store