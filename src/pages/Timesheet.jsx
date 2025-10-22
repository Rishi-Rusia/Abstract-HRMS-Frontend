import React, { useEffect, useMemo, useState } from "react";
// Replace bulky inline data with the exported employee list
import { EMPLOYEE_HIERARCHY_DATA_FULL as EMPLOYEE_DATA_RAW } from "../assets/employee"; // adjust path if needed

// Timesheet.jsx - Core Timesheet View with Filters, Streamlined Table, and Functional Dynamic Clocks

// --- 1. DATA INTEGRATION: EMPLOYEE DIRECTORY & PROJECT ALLOCATION ---

const employeeDirectory = EMPLOYEE_DATA_RAW.reduce((acc, emp) => {
    // Standardize 'title' to be a better 'role' for the timesheet
    let role = emp.title;
    if (emp.department === "Engineering") {
        if (
            role.includes("Software") ||
            role.includes("Developer") ||
            role.includes("Architect") ||
            role.includes("Technical Lead")
        ) {
            role = role.includes("QA") ? "QA Engineer" : "Developer";
        } else if (role.includes("QA") || role.includes("Quality Assurance")) {
            role = "QA Engineer";
        } else if (role.includes("Intern")) {
            role = "Intern (Engineering)";
        }
    } else if (emp.department === "Delivery") {
        if (role.includes("Analyst")) {
            role = "Business Analyst";
        } else if (role.includes("Agile") || role.includes("Transformation") || role.includes("Product")) {
            role = "Delivery Manager";
        }
    } else if (emp.department === "Central Services") {
        role = "Operations/HR";
    } else if (emp.department === "Sales & Marketing") {
        role = "Sales/Marketing";
    }

    acc[emp.id] = {
        ...emp,
        role: role,
    };
    return acc;
}, {});


// --- CONSTANTS & MOCK DATA (UPDATED) ---
const PRIMARY_BLUE = '#3C467B'; // Dark Blue from home.jsx
const SECONDARY_BLUE = '#636CCB'; // Lighter Blue from home.jsx
const ACCENT_BLUE = '#6E8CFB'; // Lightest Blue from home.jsx

const CURRENT_DATE = new Date("2025-10-18"); // Saturday in Week 4, used for consistency
const EMPLOYEE_IDS = Object.keys(employeeDirectory);
const WORK_HOURS_PER_DAY = 7.5; // 7.5 hours actual work + 1 hour unpaid break
const TARGET_WEEKLY_HOURS = WORK_HOURS_PER_DAY * 5; // 37.5 hours

// Use a more realistic, filtered list of roles for the filter dropdown
const EMPLOYEE_CATEGORIES = ["All", ...new Set(Object.values(employeeDirectory).map(e => e.role))].filter(Boolean);

// Allotted Project Names and Tasks (Tasks are given a free hand)
const sampleProjects = [
    { id: "P-001", name: "Client Portal V2", tasks: ["Frontend Implementation", "API Design Review", "User Story Grooming", "Code Review/QA"] },
    { id: "P-002", name: "Internal Reporting Dashboard", tasks: ["Gathering Stakeholder Requirements", "Database Query Optimization", "Building UI Components", "Documentation"] },
    { id: "P-003", name: "Mobile App Beta Launch", tasks: ["iOS Bug Testing", "Android Feature Development", "Marketing Campaign Prep", "CI/CD Pipeline Setup"] },
    { id: "P-004", name: "System Security Audit", tasks: ["Penetration Testing", "Security Policy Update", "Patch Management Deployment"] },
    { id: "P-005", name: "HR System Integration", tasks: ["System Configuration and Setup", "User Training Session", "Legacy Data Migration"] },
    { id: "P-006", name: "Cloud Migration Phase 1", tasks: ["Infrastructure as Code (IaC) Review", "Testing Environment Creation", "Data Backup Strategy"] },
];

// Utility function to generate a random item
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomHour = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const getRandomTime = (hour, min) => {
    // Convert 24h to 12h format string
    const h12 = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    const ampm = hour >= 12 ? 'pm' : 'am';
    return `${String(h12).padStart(2, '0')}:${String(min).padStart(2, '0')} ${ampm}`;
};
const getDuration = (startH, endH) => {
    // Add 0, 0.25, 0.5, or 0.75 hours (0m, 15m, 30m, 45m)
    const durationHours = endH - startH + (Math.floor(Math.random() * 4) / 4);
    // Ensure minimum duration is 0.5 hours and max is 4 hours
    return parseFloat(Math.max(0.5, Math.min(4, durationHours)).toFixed(2));
}

// Utility functions
const formatDuration = (hours) => {
    if (hours === 0) return '0h 0m';
    const h = Math.floor(hours);
    const m = Math.round((hours % 1) * 60);
    return `${h}h ${m}m`.replace(' 0m', '');
};

const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
};

// Generate Timesheet Data for all employees over the last FOUR weeks (Weeks 1-4)
let timesheetEntryId = 1;
const generateTimesheetData = () => {
    const allData = [];
    const numWeeks = 4;
    
    // Employee Project Assignment Cache (to enforce max 2 projects per week)
    const projectAssignments = {}; 

    // Calculate the Sunday start date of the *latest* week (Week 4, relative to Oct 18, 2025)
    // Oct 18, 2025 is a Saturday, so the Sunday start date is Oct 12, 2025.
    const latestWeekStartDate = new Date("2025-10-12"); 

    for (let week = 1; week <= numWeeks; week++) {
        // Calculate the starting date of the current week (Sunday)
        const d = new Date(latestWeekStartDate);
        // Calculate the Sunday that is (4 - week) weeks before the latestWeekStartDate
        d.setDate(latestWeekStartDate.getDate() - (7 * (numWeeks - week))); 
        const weekStartDate = new Date(d);

        // Reset project assignments for the new week
        projectAssignments[week] = {}; 

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStartDate);
            date.setDate(weekStartDate.getDate() + i);
            dates.push(date.toISOString().slice(0, 10));
        }

        EMPLOYEE_IDS.forEach(empId => {
            const emp = employeeDirectory[empId];
            let totalWeeklyHours = 0;
            const assignedProjects = [];

            // Assign 1-2 projects for this employee for this week
            const numProjects = getRandomHour(1, 2); 
            while (assignedProjects.length < numProjects) {
                const project = getRandomItem(sampleProjects);
                if (!assignedProjects.includes(project.name)) {
                    assignedProjects.push(project.name);
                }
            }
            projectAssignments[week][empId] = assignedProjects;

            dates.forEach(date => {
                const isSick = Math.random() < 0.005; // ~0.5% chance of being sick
                const dayOfWeek = new Date(date).getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday

                if (isSick) {
                    allData.push({
                        id: timesheetEntryId++,
                        date: date,
                        week: week,
                        timestamp: new Date(`${date}T09:00:00`).getTime(),
                        project: "N/A",
                        durationHours: 8.0, // Full day sick leave
                        role: emp.role,
                        employeeName: emp.name,
                        taskDetail: "Sick Leave",
                        startTime: "09:00 am",
                        endTime: "05:00 pm",
                        duration: "8h 0m",
                        isSick: true,
                        status: Math.random() < 0.8 ? "Approved" : "Pending",
                        employeeId: emp.id
                    });
                    totalWeeklyHours += 8.0;
                    return;
                }

                if (isWeekend) return;
                if (Math.random() < 0.1) return; // 10% chance of a random day off/untracked

                // Generate 2 to 4 entries for a typical workday
                const minEntries = emp.role.includes("Intern") ? 1 : 2;
                const maxEntries = emp.role.includes("Intern") ? 2 : 4;
                const numEntries = getRandomHour(minEntries, maxEntries);
                let totalDailyHours = 0;
                let currentStartHour = 9; // Start at 9am

                for (let i = 0; i < numEntries; i++) {
                    if (currentStartHour >= 18) break; // Stop after 6pm
                    
                    // Select project only from the assigned list
                    const projectName = getRandomItem(assignedProjects); 
                    const project = sampleProjects.find(p => p.name === projectName);
                    
                    const taskDetail = getRandomItem(project.tasks);
                    
                    let startMin = getRandomHour(0, 59);
                    let endHour = currentStartHour + getRandomHour(1, 3); 
                    let endMin = getRandomHour(0, 59);

                    // Simple mechanism to ensure entry end time is after start time
                    if (endHour <= currentStartHour) {
                        endHour = currentStartHour + 1;
                    }
                    
                    const durationHours = getDuration(currentStartHour, endHour);
                    // Max daily tracked time is 10 hours
                    if (totalDailyHours + durationHours > 10) continue; 
                    
                    // Add a conceptual 1-hour break between 12pm and 2pm
                    if (currentStartHour < 12 && endHour >= 13) {
                        currentStartHour += 1; // Simulate the break
                        endHour += 1;
                    }

                    totalDailyHours += durationHours;
                    totalWeeklyHours += durationHours;

                    const entryStart = getRandomTime(currentStartHour, startMin);
                    const entryEnd = getRandomTime(Math.min(20, endHour), endMin); // Limit end time to 8pm
                    
                    allData.push({
                        id: timesheetEntryId++,
                        date: date,
                        week: week,
                        timestamp: new Date(`${date}T${String(currentStartHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}:00`).getTime(), 
                        project: projectName,
                        durationHours: durationHours,
                        role: emp.role,
                        employeeName: emp.name,
                        taskDetail: taskDetail,
                        startTime: entryStart,
                        endTime: entryEnd,
                        duration: formatDuration(durationHours),
                        isSick: false,
                        // Ensure some are approved and some are pending for testing the modal logic
                        status: Math.random() < 0.5 ? "Approved" : "Pending", 
                        employeeId: emp.id
                    });
                    
                    currentStartHour = Math.min(20, endHour); // Next task starts after current one ends (max 8pm)
                }
            });
        });
    }

    return allData;
};


const mockTimesheetData = generateTimesheetData();
const mockFetchEntries = () => {
    // Sort all data by date and time (timestamp) in descending order (latest first)
    const sortedData = mockTimesheetData.sort((a, b) => b.timestamp - a.timestamp);
    return Promise.resolve(sortedData);
};


// --- MODAL COMPONENTS (UPDATED FOR APPROVAL) ---

const DetailItem = ({ label, value, children }) => (
    <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}:</span> {/* Matched to text-gray-500 */}
        {value ? <span className="font-medium text-gray-800">{value}</span> : children} {/* Matched to text-gray-800 */}
    </div>
);

// Helper function to render status pill (reused from main component)
const renderStatusPill = (status) => {
    const base = "px-2 py-0.5 text-xs font-medium rounded-full";
    switch (status) {
        case "Approved":
            return <span className={`${base} text-green-700`} style={{ backgroundColor: '#D4F5DD' }}>{status}</span>; // Light Green BG
        case "Rejected":
            return <span className={`${base} text-red-700`} style={{ backgroundColor: '#FEE2E2' }}>{status}</span>; // Light Red BG
        case "Pending":
            return <span className={`${base} text-yellow-700`} style={{ backgroundColor: '#FFF5D6' }}>{status}</span>; // Light Yellow BG
        default:
            return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
    }
};

// The modal now accepts an onApproveReject function
// **MODIFIED:** Added entryStatus to the props to show the clicked ticket's status.
const EmployeeWeeklySummaryModal = ({ entry, allEntries, onClose, onApproveReject, entryStatus }) => {
    if (!entry) return null;

    const employeeId = entry.employeeId;
    const currentWeek = entry.week;
    const employeeName = entry.name || entry.employeeName; // Use entry.employeeName for consistency

    // Filter all entries for the selected employee and the selected week
    const weeklyEntries = allEntries.filter(e => e.employeeId === employeeId && e.week === currentWeek);

    // Get the current overall status for this week/employee
    // Logic: If ANY are Pending -> Pending. Else if ANY are Approved -> Approved. Else (all rejected or none) -> Rejected.
    const weeklyStatus = weeklyEntries.some(e => e.status === 'Pending') 
        ? 'Pending' 
        : (weeklyEntries.some(e => e.status === 'Approved') ? 'Approved' : 'Rejected');


    // Calculate total hours tracked by the employee for this week
    const totalTrackedHours = weeklyEntries.reduce((sum, e) => sum + e.durationHours, 0);

    // Calculate pending hours (based on target - tracked)
    const pendingHours = Math.max(0, TARGET_WEEKLY_HOURS - totalTrackedHours);
    const pendingDuration = formatDuration(pendingHours);
    const trackedDuration = formatDuration(totalTrackedHours);
    const targetDuration = formatDuration(TARGET_WEEKLY_HOURS);

    // Extract unique projects and tasks for this employee this week
    const uniqueProjects = [...new Set(weeklyEntries.map(e => e.project).filter(p => p !== "N/A"))];
    const uniqueTasks = [...new Set(weeklyEntries.map(e => e.taskDetail).filter(t => t !== "Sick Leave"))];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-filter backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100 border border-gray-200"> {/* rounded-2xl & shadow-2xl for consistency */}
                <div className="flex justify-between items-start border-b border-gray-200 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800" style={{ color: PRIMARY_BLUE }}>{employeeName}'s Weekly Summary</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                <div className="space-y-4">
                    
                    {/* **NEW**: Display the Status of the specific entry that was clicked */}
                    <div className="flex justify-between items-center p-3 rounded-lg border" style={{ backgroundColor: '#EEF1FD', borderColor: ACCENT_BLUE }}>
                       <DetailItem label="Status of Clicked Entry" >
                           {renderStatusPill(entryStatus)}
                       </DetailItem>
                    </div>

                    {/* Weekly Status Indicator (Aggregation) */}
                    <div className="flex justify-between items-center p-3 rounded-lg border" style={{ backgroundColor: '#EEF1FD', borderColor: PRIMARY_BLUE }}>
                           <DetailItem label={`Weekly Submission Status (Week ${currentWeek})`}>
                               {renderStatusPill(weeklyStatus)}
                           </DetailItem>
                    </div>

                    {/* Weekly Target */}
                    <div className="p-3 rounded-lg border" style={{ backgroundColor: '#EEF1FD', borderColor: PRIMARY_BLUE }}> {/* Lightest blue theme */}
                        <DetailItem label="Target Work Hours (5 days)" value={`${targetDuration} (7.5h/day incl. 1h break)`} />
                    </div>

                    {/* Hours Summary */}
                    <h4 className="font-semibold text-gray-700 mt-4 border-b border-gray-200 pb-1">Hours Breakdown (Week {currentWeek})</h4>
                    <DetailItem label="Total Hours Tracked" value={trackedDuration} />
                    
                    <DetailItem label="Pending Hours Left">
                        <span className={`font-semibold ${pendingHours > 0 ? 'text-red-500' : 'text-green-600'}`}>
                            {pendingDuration}
                        </span>
                    </DetailItem>
                    
                    {/* Project/Task Summary */}
                    <h4 className="font-semibold text-gray-700 mt-4 border-b border-gray-200 pb-1">Projects & Tasks</h4>
                    <DetailItem label="Projects Assigned" value={uniqueProjects.length > 0 ? uniqueProjects.join(', ') : "None Tracked"} />
                    <DetailItem label="Total Unique Tasks Tracked" value={uniqueTasks.length} />

                    <div className="pt-2 text-xs text-gray-500">
                        <p>This summary aggregates all entries for **Week {currentWeek}**. The approval buttons apply to the entire weekly submission.</p>
                    </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center">
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => onApproveReject(employeeId, currentWeek, 'Approved')}
                            style={{ backgroundColor: '#10B981' }} // Tailwind Green 500
                            className="px-4 py-2 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
                            disabled={weeklyStatus === 'Approved'} // Disable based on weekly status
                        >
                            Approve Week
                        </button>
                        <button 
                            onClick={() => onApproveReject(employeeId, currentWeek, 'Rejected')}
                            style={{ backgroundColor: '#EF4444' }} // Tailwind Red 500
                            className="px-4 py-2 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
                            disabled={weeklyStatus === 'Rejected'} // Disable based on weekly status
                        >
                            Reject Week
                        </button>
                    </div>

                    {/* Close Button */}
                    <button 
                        onClick={onClose} 
                        style={{ backgroundColor: SECONDARY_BLUE }}
                        className="px-4 py-2 text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- CLOCK COMPONENTS (No change) ---

const LiveClock = ({ timezone, label, accentColor, bgColor, textColor }) => {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const optionsTime = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true, 
                timeZone: timezone 
            };
            const optionsDate = { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric', 
                timeZone: timezone 
            };
            setTime(now.toLocaleTimeString('en-US', optionsTime));
            setDate(now.toLocaleDateString('en-US', optionsDate));
        };

        updateClock(); // Initial call
        const intervalId = setInterval(updateClock, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [timezone]);

    return (
        <div 
            className="flex flex-col items-center justify-center p-4 rounded-xl shadow-md border"
            style={{ 
                backgroundColor: bgColor, 
                borderColor: accentColor,
                color: textColor,
                minHeight: '120px' // Ensure consistent height
            }}
        >
            <div className="text-sm font-medium opacity-80 mb-1">{label}</div>
            <div className="text-3xl font-bold leading-none">{time}</div>
            <div className="text-xs opacity-70 mt-1">{date}</div>
        </div>
    );
};


// --- MAIN COMPONENT ---

// Full list of months for the dropdown
const ALL_MONTHS = [
    "January 2025", "February 2025", "March 2025", "April 2025", 
    "May 2025", "June 2025", "July 2025", "August 2025", 
    "September 2025", "October 2025", "November 2025", "December 2025"
];

export default function Timesheet() {
    // State to hold and manage all timesheet entries
    const [rawEntries, setRawEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filter states
    const [employeeCategory, setEmployeeCategory] = useState("All"); 
    const [selectedProject, setSelectedProject] = useState("All"); 
    const [searchTerm, setSearchTerm] = useState(""); 
    
    // WEEK and MONTH State 
    const [selectedWeek, setSelectedWeek] = useState(4); // Default to the latest week (Week 4)
    const [selectedMonth, setSelectedMonth] = useState("October 2025"); // Default to October 2025

    // State for modal
    const [detailsView, setDetailsView] = useState(null);

    // Fetch data and sort it (latest first)
    useEffect(() => {
        setLoading(true);
        mockFetchEntries()
            .then((data) => setRawEntries(data))
            .finally(() => setLoading(false));
    }, []);

    // Function passed to the modal to handle Approve/Reject
    const handleApproveReject = (employeeId, week, newStatus) => {
        setRawEntries(prevEntries => 
            prevEntries.map(entry => {
                // Find all entries for the specific employee and week and update their status
                if (entry.employeeId === employeeId && entry.week === week) {
                    return { ...entry, status: newStatus };
                }
                return entry;
            })
        );
        // Close the modal after action
        setDetailsView(null);
    };

    // The View button now opens the Employee Weekly Summary Modal
    // **MODIFIED:** When opening the modal, we need to pass the status of the clicked entry too.
    const handleViewDetails = (entry) => {
        // Create a new object for the modal state that includes the clicked entry's status
        setDetailsView({
            ...entry,
            clickedEntryStatus: entry.status 
        });
    };

    // Filter by selected week first
    const weeklyEntries = useMemo(() => {
        // NOTE: Since mock data only covers October, month selection doesn't filter data, 
        // but the week selection does. 
        return rawEntries.filter(e => e.week === selectedWeek);
    }, [rawEntries, selectedWeek]);


    // Combined filtering logic applied to the currently selected week's data
    const filteredEntries = useMemo(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();

        const filtered = weeklyEntries.filter(e => {
            // 1. Filter by Role (Employee Category dropdown)
            const categoryMatch = employeeCategory === "All" || e.role === employeeCategory;

            // 2. Filter by Project dropdown
            const projectMatch = selectedProject === "All" || e.project === selectedProject;

            // 3. Filter by Search Term
            const searchMatch = lowerCaseSearch === "" || 
                e.employeeName.toLowerCase().includes(lowerCaseSearch) || 
                e.role.toLowerCase().includes(lowerCaseSearch) || 
                e.project.toLowerCase().includes(lowerCaseSearch) || 
                e.taskDetail.toLowerCase().includes(lowerCaseSearch);

            return categoryMatch && projectMatch && searchMatch;
        });
        
        // Always sort by timestamp descending (latest first).
        filtered.sort((a, b) => b.timestamp - a.timestamp); 

        return filtered;
    }, [weeklyEntries, employeeCategory, selectedProject, searchTerm]);

    // Apply the display limit: Only show the latest 10, UNLESS filters/search are active.
    const entriesToDisplay = useMemo(() => {
        const hasActiveFilter = employeeCategory !== "All" || selectedProject !== "All" || searchTerm !== "";
        
        // If any filter/search is active, show all matched results.
        if (hasActiveFilter) {
            return filteredEntries;
        }

        // Otherwise, show only the latest 10.
        return filteredEntries.slice(0, 10);
    }, [filteredEntries, employeeCategory, selectedProject, searchTerm]);


    return (
        <div 
            className="w-full max-w-5xl mx-auto p-4 md:p-6 rounded-2xl shadow-xl"
            style={{ 
                background: "linear-gradient(to bottom right, #EEF1FD, #F5F6FF)", // Home.jsx Background
            }}
        >
            <div className="bg-white rounded-2xl shadow-lg p-6"> {/* Main content wrapper */}
                
                {/* --- Header --- */}
                <header className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Timesheet</h1> {/* Matched text-gray-800 */}
                    <div className="flex items-center space-x-4 text-sm">
                        
                        {/* 1. Month Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="appearance-none px-3 py-1 pr-8 text-white rounded-md font-semibold shadow-md focus:ring-1 cursor-pointer"
                                style={{ 
                                    backgroundColor: SECONDARY_BLUE,
                                    outline: 'none', 
                                    '--tw-ring-color': PRIMARY_BLUE,
                                }}
                            >
                                {/* Added all months */}
                                {ALL_MONTHS.map(m => (
                                    <option key={m} value={m} className="text-gray-800 bg-white">{m}</option>
                                ))}
                            </select>
                            {/* Custom Chevron icon - Adjusted for better spacing and visibility */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-white">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        {/* 2. Week Selector Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedWeek}
                                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                                className="appearance-none px-3 py-1 pr-8 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm font-semibold focus:ring-1 cursor-pointer"
                                style={{ 
                                    outline: 'none', 
                                    borderColor: '#E5E7EB',
                                    '--tw-ring-color': PRIMARY_BLUE,
                                    '--tw-focus-ring-color': PRIMARY_BLUE,
                                }}
                            >
                                <option value="" disabled>Select Week</option>
                                {/* Simplified Week Options */}
                                <option value={4}>Week 4</option>
                                <option value={3}>Week 3</option>
                                <option value={2}>Week 2</option>
                                <option value={1}>Week 1</option>
                            </select>
                            {/* Custom Chevron icon - Adjusted for better spacing */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        <button className="text-gray-400 hover:text-gray-600 text-xl">...</button> 
                    </div>
                </header>

                {/* --- Clocks Section --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <LiveClock 
                        timezone="Asia/Kolkata" 
                        label="Indian Time (IST)" 
                        accentColor={PRIMARY_BLUE} 
                        bgColor="#EEF1FD" 
                        textColor={PRIMARY_BLUE} 
                    />
                    <LiveClock 
                        timezone="Europe/London" 
                        label="UK Time (GMT/BST)" 
                        accentColor={PRIMARY_BLUE} 
                        bgColor="#EEF1FD" 
                        textColor={PRIMARY_BLUE} 
                    />
                </div>

                {/* --- Filters and Search --- */}
                <div className="bg-white p-4 mt-6 border border-gray-100 rounded-2xl shadow-md"> {/* rounded-2xl & shadow-md for consistency */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        
                        {/* Employee Role Dropdown */}
                        <div className="flex flex-col">
                            <label className="text-xs text-gray-500 mb-1">Employee Role</label>
                            <select 
                                value={employeeCategory}
                                onChange={(e) => setEmployeeCategory(e.target.value)}
                                className="p-2 border rounded-md bg-white text-sm focus:ring-1"
                                style={{ 
                                    outline: 'none', 
                                    borderColor: '#E5E7EB',
                                    '--tw-ring-color': PRIMARY_BLUE,
                                    '--tw-focus-ring-color': PRIMARY_BLUE,
                                }}
                            >
                                {EMPLOYEE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        {/* Project Dropdown */}
                        <div className="flex flex-col">
                            <label className="text-xs text-gray-500 mb-1">Project name</label>
                            <select 
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                className="p-2 border rounded-md bg-white text-sm focus:ring-1"
                                style={{ 
                                    outline: 'none', 
                                    borderColor: '#E5E7EB',
                                    '--tw-ring-color': PRIMARY_BLUE,
                                    '--tw-focus-ring-color': PRIMARY_BLUE,
                                }}
                            >
                                {sampleProjects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                <option value="All">All</option>
                            </select>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="flex flex-col col-span-1">
                            <label className="text-xs text-gray-500 mb-1">Search (Name/Project/Task)</label>
                            <input
                                type="text"
                                placeholder="e.g., Alice Smith, Mobile app"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="p-2 border rounded-md bg-white text-sm focus:ring-1"
                                style={{ 
                                    outline: 'none', 
                                    borderColor: '#E5E7EB',
                                    '--tw-ring-color': PRIMARY_BLUE,
                                    '--tw-focus-ring-color': PRIMARY_BLUE,
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end items-center border-t border-gray-200 pt-3">
                        <button className="text-sm flex items-center" style={{ color: SECONDARY_BLUE }}>
                            List view <span className="ml-1">▼</span>
                        </button>
                    </div>
                </div>

                {/* --- Timesheet Entries Table --- */}
                <div className="mt-6">
                    <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100"> {/* rounded-2xl & shadow-md for consistency */}
                        <table className="min-w-full w-full table-auto">
                            <thead className="text-left text-xs bg-gray-50 border-b border-gray-200 text-gray-700"> {/* Updated to gray classes */}
                                <tr>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Employee</th> 
                                    <th className="px-4 py-3 font-medium">Project</th>
                                    <th className="px-4 py-3 font-medium">Start Time</th>
                                    <th className="px-4 py-3 font-medium">End Time</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Summary</th> {/* Changed Details to Summary */}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={7} className="p-6 text-center text-gray-500">Loading...</td></tr>
                                ) : entriesToDisplay.length === 0 ? (
                                    <tr><td colSpan={7} className="p-6 text-center text-gray-500">No entries found matching the current criteria in Week {selectedWeek}.</td></tr>
                                ) : (
                                    entriesToDisplay.map((e) => (
                                        <tr key={e.id} className="border-t border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">{new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-800">{e.employeeName}</td> 
                                            <td className="px-4 py-3 text-sm font-medium text-gray-700">{e.project}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{e.startTime}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{e.endTime}</td>
                                            <td className="px-4 py-3">{renderStatusPill(e.status)}</td>
                                            <td className="px-4 py-3">
                                                {/* View button now opens weekly summary modal */}
                                                <button 
                                                    onClick={() => handleViewDetails(e)}
                                                    className="text-sm font-medium underline"
                                                    style={{ color: ACCENT_BLUE, hover: SECONDARY_BLUE }}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Display limit message */}
                    {(filteredEntries.length > 10 || entriesToDisplay.length > 10) && (
                        <div className="mt-4 p-3 text-center rounded-lg text-sm text-gray-600 border" style={{ backgroundColor: '#F5F6FF', borderColor: '#EEF1FD' }}>
                            {filteredEntries.length > 10 && entriesToDisplay.length === 10 ? (
                                <>
                                    Displaying only the **latest 10 entries** out of {filteredEntries.length} total entries for Week {selectedWeek}. Use the search or filters to find specific historical entries.
                                </>
                            ) : (
                                <>
                                    Displaying all {filteredEntries.length} entries matching the active filters/search criteria in Week {selectedWeek}.
                                </>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Updated Modal Component with Approval Logic */}
                <EmployeeWeeklySummaryModal 
                    entry={detailsView} 
                    allEntries={rawEntries} 
                    onClose={() => setDetailsView(null)} 
                    onApproveReject={handleApproveReject} // New prop for approval action
                    // **MODIFIED:** Pass the status of the specific entry that was clicked
                    entryStatus={detailsView?.clickedEntryStatus} 
                />
            </div>
        </div>
    );
}
