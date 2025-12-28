import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Initial State
const initialState = {
    isAuth: false,
    user: null,
    isLoading: false,
    authLoad: false
}

//Async Thunk => Async thunk help us to perform asynchrounus actions

export const RegisterUser = createAsyncThunk('Auth/register',
    async (formData) => {
        const responseRegister = await axios.post('http://localhost:5000/api/auth/register', formData, {
            withCredentials: true
        })
        return responseRegister.data;
    }
)
export const CheckUser = createAsyncThunk('Auth/user',
    async () => {
        const responseUser = await axios.get('http://localhost:5000/api/auth/checkUser', {
            withCredentials: true,
            headers: {
                "Cache-Control": "no-store no-cache must-revalidate proxy-revalidate",
                Expires: "0"
            }
        })
        return responseUser.data;
    }
)
export const LoginUser = createAsyncThunk('Auth/Login',
    async (formData) => {
        const responseLogin = await axios.post('http://localhost:5000/api/auth/login', formData, {
            withCredentials: true
        })
        return responseLogin.data;
    }
)

export const LogoutUser = createAsyncThunk('auth/logout',
    async () => {
        const response = await axios.post("http://localhost:5000/api/auth/logout", {}, {
            withCredentials: true
        })
        return response.data;
    }
)

export const OtpVerify = createAsyncThunk(
    "auth/OtpVerify",
    async(otpData) => {
        const response = await axios.post("http://localhost:5000/api/auth/otp-verify", otpData, {
            withCredentials: true
        })
        return response.data;
    }
)
export const OtpResend = createAsyncThunk(
    "auth/OtpResend",
    async(email) => {
        const response = await axios.post("http://localhost:5000/api/auth/otp-regnerate", email, {
            withCredentials: true
        })
        return response.data;
    }
)

export const FindUser = createAsyncThunk(
    "auth/FindUser",
    async(email) => {
        const response = await axios.post("http://localhost:5000/api/auth/find", email, {
            withCredentials: true
        })

        return response.data;
    }
)

export const ForgetPassword = createAsyncThunk(
    "auth.forgetPassword",
    async(Data) => {
        const response = await axios.post("http://localhost:5000/api/auth/forget", Data, {
            withCredentials: true
        })
        return response.data;
    }
)

//Auth Slice
const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (build) => {
        build.addCase(RegisterUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = null;
        }).addCase(RegisterUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = null;
        }).addCase(LoginUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = null;
        }).addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = action?.payload?.success ? true : false;
            state.user = action?.payload?.success ? action.payload.user : null;
        }).addCase(CheckUser.pending, (state, action) => {
            state.isLoading = true;
            state.authLoad = false;
        }).addCase(CheckUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = null;
            state.authLoad = true;
        }).addCase(CheckUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = action?.payload?.success ? true : false;
            state.user = action?.payload?.success ? action.payload.user : null;
            state.authLoad = true;
        }).addCase(LogoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = null;
        }).addCase(LogoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = action?.payload?.success ? true : false;
            state.user = action?.payload?.success ? action.payload.user : null;
        })
    }
})

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
