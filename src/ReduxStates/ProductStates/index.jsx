import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    productList: []
}
const ApiUrl = "https://backendforecommerce-production.up.railway.app";
export const AddProduct = createAsyncThunk(
    "admin/AddProduct",
    async (formData) => {
        const response = await axios.post(`${ApiUrl}/products/addProduct`,
            formData
        )
        return response?.data;
    }
)

export const FetchProducts = createAsyncThunk(
    "admin/FetchProducts",
    async () => {
        const response = await axios.get(`${ApiUrl}/products/fetch`);
        return response?.data;
    }
)

export const UpdateProducts = createAsyncThunk(
    "admin/UpdateProducts",
    async ({ id, formData }) => {
        const response = await axios.put(`${ApiUrl}/products/fetch/${id}`, formData);
        return response?.data;
    }
)

export const DeleteProduct = createAsyncThunk(
    "admin/DeleteProduct",
    async (id) => {
        const response = await axios.delete(`${ApiUrl}/products/fetch/${id}`);
        return response?.data;
    }
)
const AdminProductsSlice = createSlice({
    name: "AdminProducts",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(FetchProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchProducts.fulfilled, (state, action) => {
            // console.log(action?.payload?.AllProducts);
            state.isLoading = false;
            state.productList = action?.payload?.AllProducts;
        }).addCase(FetchProducts.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        })
    }
})

export default AdminProductsSlice.reducer;