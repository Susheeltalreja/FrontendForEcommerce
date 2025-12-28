import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    CartItems: []
}
const ApiUrl = "https://backendforecommerce-production.up.railway.app";
export const AddItemsInCart = createAsyncThunk(
    "/user/AddItemsInCart",
    async(cartData) => {
        const response = await axios.post(`${ApiUrl}/user/cart/add`, cartData)
        return response?.data
    }
)

export const FetchProductForCart = createAsyncThunk(
    "user/FetchProductForCart",
    async(id) => {
        const response = await axios.get(`${ApiUrl}/user/cart/fetch/${id}`)
        return response?.data
    }
)

export const UpdateItemsInCart = createAsyncThunk(
    "/user/UpdateItemsInCart",
    async(cartData) => {
        const response = await axios.put(`${ApiUrl}/user/cart/put`, cartData)
        return response?.data
    }
)
export const DeleteItemInCart = createAsyncThunk(
    "/user/DeleteItemInCart",
    async(cartData) => {
        const response = await axios.delete("http://localhost:5000/user/cart/delete", {
            data: cartData
        })
        return response?.data
    }
)

export const CheckoutCart = createAsyncThunk(
    "/user/CheckoutCart",
    async(checkoutData) => {
        const response = await axios.post("http://localhost:5000/user/checkout/post", checkoutData);
        return response?.data;
    }
)

const CartSlice = createSlice({
    name: "CartSlice",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(FetchProductForCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchProductForCart.fulfilled, (state, action) => {
            console.log(action?.payload?.FindCartWithUserId?.CartItems)
            state.isLoading = false;
            state.CartItems = action?.payload?.FindCartWithUserId?.CartItems;
        }).addCase(FetchProductForCart.rejected, (state) => {
            state.isLoading = false,
            state.CartItems = []
        })
    }
})

export default CartSlice.reducer;