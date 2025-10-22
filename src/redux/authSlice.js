import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ===== Async thunk for login =====
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5149/api/Auth", {
        email,
        password,
      });
      return response.data; // employee object
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

// ===== Initialize state from localStorage =====
const storedEmployee = JSON.parse(localStorage.getItem("employee"));

const initialState = {
  employeeId: storedEmployee?.employeeId || null,
  name: storedEmployee?.name || null,
  email: storedEmployee?.email || null,
  department: storedEmployee?.department || null,
  isAdmin: storedEmployee?.isAdmin || false,
  isLoggedIn: storedEmployee?.employeeId ? true : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.employeeId = null;
      state.name = null;
      state.email = null;
      state.department = null;
      state.isAdmin = false;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("employee");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeId = action.payload.employeeId;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.department = action.payload.department;
        state.isAdmin = action.payload.isAdmin;
        state.isLoggedIn = true;

        localStorage.setItem("employee", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
