import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur d'inscription");
    }
 });