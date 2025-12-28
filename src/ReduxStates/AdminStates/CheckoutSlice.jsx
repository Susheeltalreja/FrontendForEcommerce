import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    completeOrderInfo : []
}
const ApiUrl = "https://backendforecommerce-production.up.railway.app";
export const GetCompletInformation = createAsyncThunk(
    "/admin/GetCompletInformation",
    async() => {
        const result = await axios.get(`${ApiUrl}/user/checkout/get`);
        return result?.data;
    }
)
export const UpdateStatusOfOrders = createAsyncThunk(
    "/admin/UpdateStatusOfOrders",
    async(Statusdata) => {
        const response = await axios.put(`${ApiUrl}/user/checkout/update`, Statusdata);
        return response?.data
    }
)

const CheckoutSlice = createSlice({
    name: "CheckoutSlice",
    initialState,
    extraReducers: (build) => {
        build.addCase(GetCompletInformation.pending, (state) => {
            state.isLoading = true;
        }).addCase(GetCompletInformation.fulfilled, (state, action) => {
            // console.log("Slice", action)
            state.isLoading = false;
            state.completeOrderInfo = action?.payload?.GetUsers
        }).addCase(GetCompletInformation.rejected, (state) => {
            state.isLoading = false,
            state.completeOrderInfo = []
        })
    }
})

export default CheckoutSlice.reducer;