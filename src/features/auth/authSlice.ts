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
  token?: string;
}

// Type des données envoyées à l’API d’inscription
export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
   🚀 3. Thunk d’inscription
------------------------------ */

export const RegisterUser = createAsyncThunk<
  User, // ✅ Ce que le thunk retourne quand tout va bien
  RegisterForm, // ✅ Les données envoyées à l’API
  { rejectValue: string } // ✅ Type d’erreur si l’API échoue
>(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post<{ message: string; user: User }>(
        "http://localhost:8001/api/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ on suppose que ton API renvoie { message: "ok", user: {...} }
      return res.data.user;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Erreur d'inscription"
      );
    }
  }
);

// Thunk pour la connexion
export const LoginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    formData: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("http://localhost:8001/api/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
      // On suppose que l'API renvoie { token, user }
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Erreur de connexion"
      );
    }
  }
);


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
      // 🟡 En attente
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // 🟢 Succès
      .addCase(RegisterUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // 🔴 Erreur
      .addCase(RegisterUser.rejected, (state, action) => {
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