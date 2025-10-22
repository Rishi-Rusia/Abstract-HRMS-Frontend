// src/redux/leaveAdminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Base API URL
const API_URL = "https://localhost:7164/api/Leave";

// Fetch all leaves
export const fetchLeaves = createAsyncThunk("leaveAdmin/fetchLeaves", async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch leaves");
    const data = await response.json();
    return data;
});

// Update leave status (HR/Admin only)
export const updateLeaveStatus = createAsyncThunk(
    "leaveAdmin/updateLeaveStatus",
    async ({ leaveId, newStatus, updaterId }) => {
        const response = await fetch(`${API_URL}/${leaveId}/status?newStatus=${newStatus}&updaterId=${updaterId}`, {
            method: "PUT",
        });
        if (!response.ok) throw new Error("Failed to update leave status");
        return { leaveId, newStatus };
    }
);

const leaveAdminSlice = createSlice({
    name: "leaveAdmin",
    initialState: {
        leaves: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaves.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLeaves.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.leaves = action.payload;
            })
            .addCase(fetchLeaves.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateLeaveStatus.fulfilled, (state, action) => {
                const { leaveId, newStatus } = action.payload;
                const leave = state.leaves.find((l) => l.leaveId === leaveId);
                if (leave) leave.status = newStatus;
            });
    },
});

export default leaveAdminSlice.reducer;
