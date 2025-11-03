import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface User {
    id?: number;
    firstName?: string;
    email?: string;
    token?: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

// Thunk pour l'inscription
export const RegisterUser = createAsyncThunk("auth/registerUser", async(formData: { 
    firstName: string,
    lastName: string;
    email: string;
    password: string;
 }, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:8001/api/register", formData, {
            headers: {"Content-Type": "application/json"},
        });
        // On suppose que l'API renvoie un objet { message: user }
        return res.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur d'inscription");
    }
 });

 const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        setUserFromStorage: (state) => {
            const stored = localStorage.getItem("user");
            if (stored) {
                state.user = JSON.parse(stored);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(RegisterUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(RegisterUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(RegisterUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
 });