import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productList: [],
    ProductDetails: null
}

export const FetchAllProductsForUser = createAsyncThunk(
    "/user/FetchAllProductsForUser",
    async({filter, sort}) => {
        const query = new URLSearchParams({
            ...filter,
            sortBy: sort
        })
        const result = await axios.get(`http://localhost:5000/user/products/get?${query}`);
        return result?.data;
    }
)
export const FindProductDetails = createAsyncThunk(
    "/user/FindProductDetails",
    async(id) => {
        const result = await axios.get(`http://localhost:5000/user/products/get/${id}`);
        return result?.data;
    }
)

const UserProductSlice = createSlice({
    name: "UserProductSlice",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(FetchAllProductsForUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchAllProductsForUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.AllProducts;
        }).addCase(FetchAllProductsForUser.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        }).addCase(FindProductDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(FindProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductDetails = action?.payload?.data;
        }).addCase(FindProductDetails.rejected, (state) => {
            state.isLoading = false;
            state.ProductDetails = null;
        })
    }
});

export default UserProductSlice.reducer;