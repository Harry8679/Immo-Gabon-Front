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
