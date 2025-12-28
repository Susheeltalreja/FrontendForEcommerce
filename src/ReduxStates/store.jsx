import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../ReduxStates/authentication/index"

import AdminProductsSlice from "./ProductStates/index";

import UserProductSlice from "./UserStates/UserProductState";
import CartSlice from "./UserStates/UserCartState";

import CheckoutSlice from "./AdminStates/CheckoutSlice";

const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        AdminProducts: AdminProductsSlice,
        UserProducts: UserProductSlice,
        Cart: CartSlice,
        Checkout: CheckoutSlice
    }
})

export default store;