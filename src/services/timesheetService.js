const API_BASE_URL = "http://localhost:5149";

// Test the connection
fetch(`${API_BASE_URL}/api/Timesheet`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

export const timesheetService = {
    // Get all timesheets
    async getAllTimesheets() {
        const response = await fetch(`${API_BASE_URL}/api/Timesheet`);
        if (!response.ok) throw new Error('Failed to fetch timesheets');
        return response.json();
    },

    // Get timesheets by employee - FIXED
    async getTimesheetsByEmployee(employeeId) {
        const response = await fetch(`${API_BASE_URL}/api/Timesheet/employee/${employeeId}`);
        if (!response.ok) throw new Error('Failed to fetch employee timesheets');
        return response.json();
    },

    // Get timesheets by date - FIXED
    async getTimesheetsByDate(date) {
        const response = await fetch(`${API_BASE_URL}/api/Timesheet/date/${date}`);
        if (!response.ok) throw new Error('Failed to fetch timesheets by date');
        return response.json();
    },

    // Create single timesheet entry - FIXED
    async createTimesheet(timesheetData) {
        const response = await fetch(`${API_BASE_URL}/api/Timesheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(timesheetData),
        });
        if (!response.ok) throw new Error('Failed to create timesheet');
        return response.json();
    },

    // Create multiple timesheet entries - FIXED
    async createBulkTimesheets(timesheetsData) {
        const response = await fetch(`${API_BASE_URL}/api/Timesheet/bulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(timesheetsData),
        });
        if (!response.ok) throw new Error('Failed to create bulk timesheets');
        return response.json();
    },

    // Update timesheet - FIXED (This is the key one for Approve/Reject buttons)
    async updateTimesheet(id, timesheetData) {
        const response = await fetch(`${API_BASE_URL}/api/Timesheet/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(timesheetData),
        });
        if (!response.ok) throw new Error('Failed to update timesheet');
        return response.json();
    },

    // Delete timesheet - FIXED
    async deleteTimesheet(id) {
        const response = await fetch(`${API_BASE_URL}/api/Timesheet/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete timesheet');
        return response.json();
    }
};