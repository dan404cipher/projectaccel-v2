import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export interface User {
  id: string;
  email: string;
  name: string;
  workspaceId?: string;
  roleId?: string;
  isSuperAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// Initialize state from localStorage if available
const getInitialState = (): AuthState => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const userStr = localStorage.getItem("user");
  
  return {
    user: userStr ? JSON.parse(userStr) : null,
    accessToken,
    refreshToken,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    { 
      name, 
      email, 
      password, 
      workspaceName, 
      designation, 
      yearsOfExperience 
    }: { 
      name: string; 
      email: string; 
      password: string; 
      workspaceName: string; 
      designation: string; 
      yearsOfExperience: number; 
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/signup", { 
        name, 
        email, 
        password, 
        workspaceName, 
        designation, 
        yearsOfExperience 
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Call logout API endpoint
      await api.post("/auth/logout");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return true;
    } catch (err: any) {
      // Even if API call fails, clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        // Merge user and workspace data like in login
        state.user = {
          ...action.payload.data.user,
          workspaceId: action.payload.data.workspace?.id,
          roleId: action.payload.data.workspace?.roleId,
        };
        state.accessToken = action.payload.data.tokens.accessToken;
        state.refreshToken = action.payload.data.tokens.refreshToken;

        localStorage.setItem("access_token", action.payload.data.tokens.accessToken);
        localStorage.setItem("refresh_token", action.payload.data.tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // Merge user and workspace data
        state.user = {
          ...action.payload.data.user,
          workspaceId: action.payload.data.workspace?.id,
          roleId: action.payload.data.workspace?.roleId,
        };
        state.accessToken = action.payload.data.accessToken;
        // Note: refreshToken is set as httpOnly cookie by backend

        localStorage.setItem("access_token", action.payload.data.accessToken);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("user");
    });
  },
});

export default authSlice.reducer;
