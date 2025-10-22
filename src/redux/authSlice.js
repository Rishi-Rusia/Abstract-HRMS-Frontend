// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ===== Async thunk for login =====
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("https://localhost:7164/api/Auth", {
//         email,
//         password,
//       });
//       return response.data; // employee object
//     } catch (err) {
//       if (err.response && err.response.data) {
//         return rejectWithValue(err.response.data);
//       } else {
//         return rejectWithValue(err.message);
//       }
//     }
//   }
// );

// // ===== Initialize state from localStorage =====
// const storedEmployee = JSON.parse(localStorage.getItem("employee"));

// const initialState = {
//   employeeId: storedEmployee?.employeeId || null,
//   name: storedEmployee?.name || null,
//   email: storedEmployee?.email || null,
//   department: storedEmployee?.department || null,
//   isAdmin: storedEmployee?.isAdmin || false,
//   isLoggedIn: storedEmployee?.employeeId ? true : false,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.employeeId = null;
//       state.name = null;
//       state.email = null;
//       state.department = null;
//       state.isAdmin = false;
//       state.isLoggedIn = false;
//       state.loading = false;
//       state.error = null;
//       localStorage.removeItem("employee");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employeeId = action.payload.employeeId;
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.department = action.payload.department;
//         state.isAdmin = action.payload.isAdmin;
//         state.isLoggedIn = true;

//         localStorage.setItem("employee", JSON.stringify(action.payload));
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Something went wrong";
//         state.isLoggedIn = false;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;










































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
  phone: storedEmployee?.phone || null,
  joiningDate: storedEmployee?.joiningDate || null,
  employmentType: storedEmployee?.employmentType || null,
  isAdmin: storedEmployee?.isAdmin || false,
  isLoggedIn: !!storedEmployee?.employeeId,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, {
        employeeId: null,
        name: null,
        email: null,
        department: null,
        phone: null,
        joiningDate: null,
        employmentType: null,
        isAdmin: false,
        isLoggedIn: false,
        loading: false,
        error: null,
      });
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
        const emp = action.payload;
        state.loading = false;
        state.employeeId = emp.employeeId;
        state.name = emp.name;
        state.email = emp.email;
        state.department = emp.department;
        state.phone = emp.phone;
        state.joiningDate = emp.joiningDate;
        state.employmentType = emp.employmentType;
        state.isAdmin = emp.isAdmin;
        state.isLoggedIn = true;

        localStorage.setItem("employee", JSON.stringify(emp));
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
