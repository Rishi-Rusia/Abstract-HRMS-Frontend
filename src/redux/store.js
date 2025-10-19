import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import employeeReducer from './employeeSlice'; // import employee slice

// ===== Logger Middleware =====
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(`Action: ${action.type}`);
  console.log("Previous State:", store.getState());
  console.log("Action Payload:", action.payload);
  const result = next(action);
  console.log("Next State:", store.getState());
  console.groupEnd();
  return result;
};

// ===== Configure Store =====
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    employees: employeeReducer, // added employee reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
