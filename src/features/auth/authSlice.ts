import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

/* -----------------------------
   🧱 1. Types et Interfaces
------------------------------ */

// Type User reçu depuis ton backend
export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  token?: string;
}

// Type des données envoyées à l’API d’inscription
export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// Type des données envoyées à l’API de connexion
export interface LoginForm {
  email: string;
  password: string;
}

// Type de la réponse du backend au login
export interface LoginResponse {
  user: User;
  token?: string;
}

// Type de l’état global de l’auth
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/* -----------------------------
   ⚙️ 2. État initial
------------------------------ */

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

/* -----------------------------
   🚀 3. Thunks
------------------------------ */

// 🔹 Inscription
export const RegisterUser = createAsyncThunk<
  User,
  RegisterForm,
  { rejectValue: string }
>("auth/registerUser", async (formData, thunkAPI) => {
  try {
    console.log("📤 Données envoyées au backend :", formData);
    const res = await axios.post("http://localhost:8001/api/register", formData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Réponse API Register:", res.data);
    return res.data.user;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    console.error("❌ Erreur API Register:", error.response?.data);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Erreur d'inscription"
    );
  }
});

// 🔹 Connexion
export const LoginUser = createAsyncThunk<
  LoginResponse,
  LoginForm,
  { rejectValue: string }
>("auth/loginUser", async (formData, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8001/api/login", formData, {
      headers: { "Content-Type": "application/json" },
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    console.error("❌ Erreur API Login:", error.response?.data);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Erreur de connexion"
    );
  }
});

/* -----------------------------
   🧩 4. Slice Redux
------------------------------ */

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
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 Register pending
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // 🟢 Register success
      .addCase(RegisterUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // 🔴 Register error
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      })

      // 🟡 Login pending
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // 🟢 Login success
      .addCase(LoginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // 🔴 Login error
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });
  },
});

/* -----------------------------
   📦 5. Export des actions + reducer
------------------------------ */

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
