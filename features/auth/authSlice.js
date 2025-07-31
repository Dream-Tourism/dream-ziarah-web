import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, verifySession, refreshToken, logout } from "@/lib/auth";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Add loading state for Redux
};

// Async Thunk for Login
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const result = await loginUser(username, password);
      if (result.success) {
        return result.user; // Payload for fulfilled action
      } else {
        return rejectWithValue(result.error); // Payload for rejected action
      }
    } catch (error) {
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async Thunk for Initial Session Verification and Refresh
export const verifySessionThunk = createAsyncThunk(
  "auth/verifySession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let currentUser = await verifySession(); // Check if current access token is valid

      if (!currentUser) {
        // If access token is invalid/expired, try to refresh
        currentUser = await refreshToken();
      }

      if (currentUser) {
        return currentUser; // Payload for fulfilled action
      } else {
        return rejectWithValue("No active session"); // Payload for rejected action
      }
    } catch (error) {
      return rejectWithValue("Session verification failed.");
    }
  }
);

// Async Thunk for Token Refresh (e.g., for periodic refresh)
export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshedUser = await refreshToken();
      if (refreshedUser) {
        return refreshedUser;
      } else {
        return rejectWithValue("Refresh failed, session expired.");
      }
    } catch (error) {
      return rejectWithValue("Token refresh network error.");
    }
  }
);

// Async Thunk for Logout
export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logout(); // Call the API route to clear HTTP-only cookies
      return true; // Indicate success
    } catch (error) {
      return rejectWithValue("Logout failed.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setAuthState and clearAuthState are now primarily used internally by thunks
    setAuthState: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // Verify Session Thunk
      .addCase(verifySessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySessionThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
      })
      .addCase(verifySessionThunk.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload || "Session verification failed";
      })
      // Refresh Token Thunk
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // Logout Thunk
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
