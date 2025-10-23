// import React, { useEffect, useMemo, useState } from "react";

// // Timesheet.jsx - Core Timesheet View with Filters, Streamlined Table, and Functional Dynamic Charts

// // --- 1. DATA INTEGRATION: EMPLOYEE DIRECTORY & PROJECT ALLOCATION ---

// // Data parsed and structured from the PDF file, EXCLUDING the CEO (Minan Majid, ID 1)
// const EMPLOYEE_DATA_RAW = [
//     { id: 2, name: "Nicola Burdon", pronouns: "(She/Her)", title: "Financial Control", department: "Central Services" },
//     { id: 3, name: "Emily Wells", pronouns: "(She/Her)", title: "Head of Talent", department: "Talent" },
//     { id: 4, name: "Tausif Ilyas", pronouns: "", title: "Principal Software", department: "Engineering" },
//     { id: 5, name: "Elma Slakovic", pronouns: "", title: "Agile Delivery Manager", department: "Delivery" },
//     { id: 6, name: "Rashmi Mechineni", pronouns: "", title: "Head of India", department: "Engineering" },
//     { id: 7, name: "Alex Basarab", pronouns: "(He/Him)", title: "Principal Architect", department: "Engineering" },
//     { id: 8, name: "Ashley Moss", pronouns: "", title: "Strategic Advisor", department: "Board of Director" },
//     { id: 9, name: "Ben Houghton", pronouns: "", title: "Transformation Consultant", department: "Delivery" },
//     { id: 78, name: "Laura Kirdale", pronouns: "(She/Her)", title: "Head of HR", department: "Central Services" },
//     { id: 11, name: "Dan Sanders", pronouns: "", title: "Junior DevOps Engineer", department: "Central Services" },
//     { id: 12, name: "Obi Mabroukeh", pronouns: "", title: "Principal Architect", department: "Engineering" },
//     { id: 13, name: "Muhammed Aziz", pronouns: "", title: "Technical Lead", department: "Engineering" },
//     { id: 14, name: "Dawid Kaminski", pronouns: "", title: "Senior Software Engineer", department: "Engineering" },
//     { id: 15, name: "Jimmy Chak", pronouns: "", title: "Software Engineer", department: "Engineering" },
//     { id: 16, name: "Kalyan Jothimurugan", pronouns: "", title: "Junior Software Engineer", department: "Engineering" },
//     { id: 17, name: "Seb Christie", pronouns: "", title: "Software Engineer", department: "Engineering" },
//     { id: 18, name: "Andy Brown", pronouns: "", title: "Senior Software Engineer", department: "Engineering" },
//     { id: 19, name: "Pradeep Banda", pronouns: "", title: "Agile Delivery Lead", department: "Delivery" },
//     { id: 20, name: "Gary Leach", pronouns: "", title: "Technical Product", department: "Delivery" },
//     { id: 21, name: "Wesley Hornsey", pronouns: "", title: "IT Operations Manager", department: "Central Services" },
//     { id: 22, name: "Waqas Mohammad", pronouns: "", title: "Business Analyst", department: "Delivery" },
//     { id: 23, name: "Mia Lockyer-Majid", pronouns: "", title: "Marketing Executive", department: "Sales & Marketing" },
//     { id: 24, name: "Teagan Clarkson", pronouns: "", title: "Apprentice Creative", department: "Sales & Marketing" },
//     { id: 25, name: "Meena Kumaresan", pronouns: "", title: "Senior QA Automation", department: "Engineering" },
//     { id: 26, name: "Aniket Nagapure", pronouns: "", title: "Senior Developer", department: "Engineering" },
//     { id: 27, name: "Mallika Ganesh Prabhu", pronouns: "", title: "Senior Developer", department: "Engineering" },
//     { id: 28, name: "Manoj Kumar Chakravarthy", pronouns: "", title: "Senior Developer", department: "Engineering" },
//     { id: 29, name: "Prince Paraste", pronouns: "", title: "Senior Software Engineer", department: "Engineering" },
//     { id: 30, name: "Sai Chemuturi", pronouns: "", title: "Quality Assurance", department: "Engineering" },
//     { id: 31, name: "Harthik Yadagiri", pronouns: "", title: "Operations Executive", department: "Central Services" },
//     { id: 32, name: "Eswar Boyana", pronouns: "", title: "Business Analyst", department: "Delivery" },
//     { id: 33, name: "Mohana Palanisamy", pronouns: "", title: "Quality Assurance", department: "Engineering" },
//     { id: 34, name: "Sanooja Chandrasenan", pronouns: "", title: "Quality Assurance", department: "Engineering" },
//     { id: 35, name: "Pooja Kulkarni", pronouns: "", title: "Software Engineer", department: "Engineering" },
//     { id: 36, name: "Rakshitha Gollapalli", pronouns: "", title: "Junior Developer", department: "Engineering" },
//     { id: 37, name: "Shraddha Nimbalkar", pronouns: "", title: "Quality Assurance", department: "Engineering" },
//     { id: 38, name: "Shubham Magrde", pronouns: "", title: "Junior Software Engineer", department: "Engineering" },
//     { id: 39, name: "Sneha Choudhari", pronouns: "", title: "Junior Developer", department: "Engineering" },
//     { id: 40, name: "Suruthi Raj", pronouns: "", title: "Software Engineer", department: "Engineering" },
//     { id: 41, name: "Sanketh Suresh", pronouns: "", title: "Software Engineer", department: "Engineering" },
//     { id: 42, name: "Disha Wadne", pronouns: "", title: "Junior Developer", department: "Engineering" },
//     { id: 43, name: "Nikita Yadav", pronouns: "", title: "Junior Software Engineer", department: "Engineering" },
//     { id: 44, name: "Vyshnavi Kasinadhuni", pronouns: "", title: "Software Developer", department: "Engineering" },
//     { id: 45, name: "Swathi Baskar", pronouns: "", title: "Junior Developer", department: "Engineering" },
//     { id: 46, name: "Megha Meshram", pronouns: "", title: "Business Analyst", department: "Delivery" },
//     { id: 47, name: "Gangadharan Jeyaseelan", pronouns: "", title: "Junior Developer", department: "Engineering" },
//     { id: 48, name: "Guru Ganesan", pronouns: "", title: "Software Engineer", department: "Engineering" },
//     { id: 49, name: "Meghana Dharmaraj", pronouns: "", title: "Quality Assurance", department: "Engineering" },
//     { id: 50, name: "Priti Gaikwad", pronouns: "", title: "Junior Software Engineer", department: "Engineering" },
//     { id: 51, name: "Sinchana Gowda", pronouns: "", title: "Software Developer", department: "Engineering" },
//     { id: 52, name: "Swathi Premachandran", pronouns: "", title: "Software Developer", department: "Engineering" },
//     { id: 53, name: "John Lamb", pronouns: "", title: "QA Automation Tester", department: "Engineering" },
//     { id: 54, name: "Karthika Kesavaraj", pronouns: "", title: "Junior QA Automation", department: "Engineering" },
//     { id: 55, name: "Karishmaa Thivakaran", pronouns: "", title: "Junior Developer", department: "Engineering" },
//     { id: 56, name: "Madiha Aftab", pronouns: "", title: "Junior Software Engineer", department: "Engineering" },
//     { id: 57, name: "Sachin Charles", pronouns: "", title: "Software Developer", department: "Engineering" },
//     { id: 58, name: "Vaishnavi Gopinath", pronouns: "", title: "Senior Developer", department: "Engineering" },
//     { id: 59, name: "Advaitha Vyayavaram", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 60, name: "Banu Ailneni", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 61, name: "Krish Patel", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 62, name: "Poonam Jamadar", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 63, name: "Prajakta Dalvi", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 64, name: "Pranav Dev", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 65, name: "Prasanth Poluparthi", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 66, name: "Ridha Hakeem", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 67, name: "Rohit Theurkar", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 68, name: "Sahil Mehraj", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 69, name: "Saika Maqbool", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 70, name: "Venugopal Adicherla", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 71, name: "Shubhi Singhal", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 72, name: "Mandar Salunke", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 73, name: "Tejaswi Puram", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 74, name: "Soumik Mallick", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 75, name: "Yash Singh", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 76, name: "Rishi Rusia", pronouns: "", title: "Intern", department: "Engineering" },
//     { id: 77, name: "Sameer Mohammed", pronouns: "", title: "Intern", department: "Engineering" },
// ];

// const employeeDirectory = EMPLOYEE_DATA_RAW.reduce((acc, emp) => {
//     // Standardize 'title' to be a better 'role' for the timesheet
//     let role = emp.title;
//     if (emp.department === "Engineering") {
//         if (role.includes("Software") || role.includes("Developer") || role.includes("Architect" || role.includes("Technical Lead"))) {
//             role = role.includes("QA") ? "QA Engineer" : "Developer";
//         } else if (role.includes("QA") || role.includes("Quality Assurance")) {
//             role = "QA Engineer";
//         } else if (role.includes("Intern")) {
//             role = "Intern (Engineering)";
//         }
//     } else if (emp.department === "Delivery") {
//         if (role.includes("Analyst")) {
//             role = "Business Analyst";
//         } else if (role.includes("Agile") || role.includes("Transformation") || role.includes("Product")) {
//             role = "Delivery Manager";
//         }
//     } else if (emp.department === "Central Services") {
//         role = "Operations/HR";
//     } else if (emp.department === "Sales & Marketing") {
//         role = "Sales/Marketing";
//     }

//     acc[emp.id] = {
//         ...emp,
//         role: role,
//     };
//     return acc;
// }, {});


// // --- CONSTANTS & MOCK DATA (UPDATED) ---
// const CURRENT_DATE = new Date("2025-10-18"); 
// const EMPLOYEE_IDS = Object.keys(employeeDirectory);
// const CHART_COLORS = ['#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff', '#f3e8ff', '#94a3b8']; // Purple to light purple/gray scale

// // Use a more realistic, filtered list of roles for the filter dropdown
// const EMPLOYEE_CATEGORIES = ["All", ...new Set(Object.values(employeeDirectory).map(e => e.role))].filter(Boolean);

// // Allotted Project Names and Tasks
// const sampleProjects = [
//     { id: "P-001", name: "Client Portal V2", tasks: ["Frontend Development", "API Refactoring", "Database Migration", "Code Review"] },
//     { id: "P-002", name: "Internal Reporting Dashboard", tasks: ["Requirement Gathering", "Data Modeling", "UI/UX Design", "Bug Fixing"] },
//     { id: "P-003", name: "Mobile App Beta Launch", tasks: ["iOS Testing", "Android Development", "Marketing Content Creation", "CI/CD Setup"] },
//     { id: "P-004", name: "System Security Audit", tasks: ["Vulnerability Assessment", "Policy Documentation", "Patch Deployment"] },
//     { id: "P-005", name: "HR System Integration", tasks: ["System Configuration", "User Training", "Data Migration Support"] },
//     { id: "P-006", name: "Cloud Migration Phase 1", tasks: ["Infrastructure Setup", "Testing Environment Prep", "Data Backup"] },
// ];

// // Utility function to generate a random item
// const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
// const getRandomHour = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
// const getRandomTime = (hour, min) => {
//     // Convert 24h to 12h format string
//     const h12 = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
//     const ampm = hour >= 12 ? 'pm' : 'am';
//     return `${String(h12).padStart(2, '0')}:${String(min).padStart(2, '0')} ${ampm}`;
// };
// const getDuration = (startH, endH) => {
//     // Add 0, 0.25, 0.5, or 0.75 hours (0m, 15m, 30m, 45m)
//     const durationHours = endH - startH + (Math.floor(Math.random() * 4) / 4); 
//     // Ensure minimum duration is 0.5 hours and max is 4 hours
//     return parseFloat(Math.max(0.5, Math.min(4, durationHours)).toFixed(2));
// }

// // Generate Timesheet Data for all employees over the last week
// let timesheetEntryId = 1;
// const generateTimesheetData = () => {
//     const data = [];
//     const dates = [];
//     // Get the last 7 days including today (Oct 12 to Oct 18)
//     for (let i = 0; i < 7; i++) {
//         const d = new Date(CURRENT_DATE);
//         d.setDate(CURRENT_DATE.getDate() - i);
//         dates.push(d.toISOString().slice(0, 10));
//     }
//     dates.reverse(); // Start from the oldest date

//     // Cycle through all employees and all dates to ensure coverage
//     EMPLOYEE_IDS.forEach(empId => {
//         const emp = employeeDirectory[empId];
//         dates.forEach(date => {
//             const isSick = Math.random() < 0.005; // ~0.5% chance of being sick
//             const dayOfWeek = new Date(date).getDay();
//             const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday

//             if (isSick) {
//                  data.push({
//                     id: timesheetEntryId++,
//                     date: date,
//                     timestamp: new Date(`${date}T09:00:00`).getTime(),
//                     project: "N/A",
//                     durationHours: 8.0, // Full day sick leave
//                     role: emp.role,
//                     employeeName: emp.name,
//                     taskDetail: "Sick Leave",
//                     startTime: "09:00 am",
//                     endTime: "05:00 pm",
//                     duration: "8h 0m",
//                     isSick: true,
//                     status: Math.random() < 0.8 ? "Approved" : "Pending",
//                 });
//                 return;
//             }

//             if (isWeekend) return; 
//             if (Math.random() < 0.1) return; // 10% chance of a random day off/untracked

//             // Generate 2 to 4 entries for a typical workday
//             const minEntries = emp.role.includes("Intern") ? 1 : 2;
//             const maxEntries = emp.role.includes("Intern") ? 2 : 4;
//             const numEntries = getRandomHour(minEntries, maxEntries);
//             let totalHours = 0;
//             let currentStartHour = 9; // Start at 9am

//             for (let i = 0; i < numEntries; i++) {
//                 if (currentStartHour >= 18) break; // Stop after 6pm
                
//                 const project = getRandomItem(sampleProjects);
//                 const taskDetail = getRandomItem(project.tasks);
                
//                 let startMin = getRandomHour(0, 59);
//                 let endHour = currentStartHour + getRandomHour(1, 3); 
//                 let endMin = getRandomHour(0, 59);

//                 // Simple mechanism to ensure entry end time is after start time
//                 if (endHour <= currentStartHour) {
//                     endHour = currentStartHour + 1;
//                 }
                
//                 const durationHours = getDuration(currentStartHour, endHour);
//                 if (totalHours + durationHours > 10) continue; // Max 10 hours a day
                
//                 // Add a break of 1 hour after the first entry if there are more entries
//                 if (i === 0 && numEntries > 1) {
//                     currentStartHour += 1;
//                 }
                
//                 totalHours += durationHours;

//                 const entryStart = getRandomTime(currentStartHour, startMin);
//                 const entryEnd = getRandomTime(Math.min(20, endHour), endMin); // Limit end time to 8pm
                
//                 data.push({
//                     id: timesheetEntryId++,
//                     date: date,
//                     // Use a full date and time for precise sorting of entries on the same day
//                     timestamp: new Date(`${date}T${String(currentStartHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}:00`).getTime(), 
//                     project: project.name,
//                     durationHours: durationHours,
//                     role: emp.role,
//                     employeeName: emp.name,
//                     taskDetail: taskDetail,
//                     startTime: entryStart,
//                     endTime: entryEnd,
//                     duration: formatDuration(durationHours),
//                     isSick: false,
//                     status: Math.random() < 0.7 ? "Approved" : "Pending", 
//                 });
                
//                 currentStartHour = Math.min(20, endHour); // Next task starts after current one ends (max 8pm)
//             }
//         });
//     });
//     return data;
// };


// // Utility functions
// const formatDuration = (hours) => {
//     if (hours === 0) return '0h 0m';
//     const h = Math.floor(hours);
//     const m = Math.round((hours % 1) * 60);
//     return `${h}h ${m}m`.replace(' 0m', '');
// };

// const getDayName = (dateString) => {
//     const date = new Date(dateString);
//     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     return days[date.getDay()];
// };

// const mockTimesheetData = generateTimesheetData();
// const mockFetchEntries = () => {
//     // Sort all data by date and time (timestamp) in descending order (latest first)
//     const sortedData = mockTimesheetData.sort((a, b) => b.timestamp - a.timestamp);
//     return Promise.resolve(sortedData);
// };


// // --- MODAL COMPONENTS ---

// const DetailsModal = ({ entry, onClose }) => {
//     if (!entry) return null;

//     // Helper to get status color for consistency
//     const getStatusColor = (status) => {
//         switch (status) {
//             case "Approved": return "bg-green-100 text-green-800";
//             case "Pending": return "bg-yellow-100 text-yellow-800";
//             default: return "bg-gray-100 text-gray-800";
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-filter backdrop-blur-sm">
//             <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 opacity-100 border border-slate-200">
//                 <div className="flex justify-between items-start border-b pb-3 mb-3">
//                     <h3 className="text-xl font-bold text-slate-800">Timesheet Details</h3>
//                     <button 
//                         onClick={onClose} 
//                         className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
//                     >
//                         &times;
//                     </button>
//                 </div>

//                 <div className="space-y-3">
//                     <DetailItem label="Employee" value={entry.employeeName} />
//                     <DetailItem label="Role" value={entry.role} />
//                     <DetailItem label="Project" value={entry.project} />
//                     <DetailItem label="Task Detail" value={entry.taskDetail} />
//                     <DetailItem label="Total Duration">
//                         <span className={`font-semibold ${entry.isSick ? 'text-red-500' : 'text-slate-800'}`}>
//                             {entry.duration}
//                         </span>
//                     </DetailItem>
//                     <DetailItem label="Status">
//                         <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(entry.status)}`}>
//                             {entry.status}
//                         </span>
//                     </DetailItem>
//                     <DetailItem label="Times" value={`${entry.startTime} - ${entry.endTime}`} />
//                 </div>

//                 <div className="pt-4 mt-4 border-t text-right">
//                     <button 
//                         onClick={onClose} 
//                         className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const DetailItem = ({ label, value, children }) => (
//     <div className="flex justify-between text-sm">
//         <span className="text-slate-500">{label}:</span>
//         {value ? <span className="font-medium text-slate-800">{value}</span> : children}
//     </div>
// );

// // --- CHART COMPONENTS ---

// /**
//  * Bar Chart component: Workload per day
//  * Data structure: [{ day: 'Mon', hours: 40, date: '2025-10-13' }, ...]
//  */
// const WorkloadBarChart = ({ data }) => {
//     const maxHours = Math.max(...data.map(d => d.hours), 1); // Max hours across all days, min 1 to avoid division by zero
//     const totalHours = data.reduce((sum, d) => sum + d.hours, 0);

//     return (
//         <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100 flex flex-col relative h-60">
//             <h3 className="font-semibold text-slate-800">Workload per Day</h3>
//             <div className="flex-grow flex items-end justify-between p-2 pt-4 space-x-2">
//                 {/* Y-axis label */}
//                 <div className="flex flex-col justify-end h-full text-xs text-slate-400 absolute left-0 top-0 pt-10 pl-1">
//                     <span className="mb-2">{Math.ceil(maxHours)}h</span>
//                     <span className="mb-2" style={{ transform: 'translateY(-10px)' }}>0h</span>
//                 </div>
//                 {/* Bar area */}
//                 <div className="flex flex-grow justify-around h-full border-b border-slate-200 pl-8">
//                     {data.map((dayData, index) => {
//                         const dateText = new Date(dayData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//                         return (
//                             <div key={dayData.date} className="flex flex-col items-center justify-end h-full w-1/7">
//                                 <div
//                                     className="w-4 rounded-t-sm bg-purple-600 transition-all duration-300 ease-out hover:bg-purple-700 cursor-pointer relative"
//                                     style={{ height: `${(dayData.hours / maxHours) * 90}%` }} // Max height 90%
//                                     // Use 'title' attribute for simple, native hover tooltip
//                                     title={`${dayData.day}, ${dateText}: ${dayData.hours.toFixed(1)} hours`}
//                                 ></div>
//                                 <span className="text-xs text-slate-500 mt-1">{dayData.day}</span>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//             <div className="mt-2 text-center text-sm text-slate-600">
//                 Total Tracked: <span className="font-bold text-purple-600">{formatDuration(totalHours)}</span>
//             </div>
//         </div>
//     );
// };


// /**
//  * Pie Chart component: Project Distribution
//  * Data structure: [{ name: 'Project A', hours: 50, percentage: 30 }, ...]
//  */
// const ProjectsPieChart = ({ data }) => {
//     const totalHours = data.reduce((sum, d) => sum + d.hours, 0);
//     const chartData = data
//         .map(d => ({
//             ...d,
//             percentage: totalHours > 0 ? (d.hours / totalHours) * 100 : 0
//         }))
//         .filter(d => d.percentage > 0.01) // Filter out tiny slices
//         .sort((a, b) => b.hours - a.hours); // Sort by largest slice first

//     let cumulativePercent = 0;
//     const conics = chartData.map((d, index) => {
//         const start = cumulativePercent;
//         cumulativePercent += d.percentage;
//         const color = CHART_COLORS[index % CHART_COLORS.length];
//         return { ...d, color, start, end: cumulativePercent };
//     });

//     const conicStyle = conics.map(d => `${d.color} ${d.start}% ${d.end}%`).join(', ');
//     const background = `conic-gradient(${conicStyle})`;

//     return (
//         <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100 flex flex-col relative h-60">
//             <h3 className="font-semibold text-slate-800">Project Distribution</h3>
//             <div className="flex-grow flex items-center justify-center space-x-6">
                
//                 {/* Pie Chart */}
//                 <div className="w-24 h-24 rounded-full shadow-lg" style={{ background }}>
//                     {chartData.length === 0 && (
//                         <div className="flex items-center justify-center w-full h-full text-xs text-slate-500 bg-gray-100 rounded-full">
//                             No Data
//                         </div>
//                     )}
//                 </div>

//                 {/* Legend (with Hover Tooltip) */}
//                 <div className="flex flex-col space-y-1 overflow-auto max-h-[120px]">
//                     {chartData.map((d, index) => (
//                         <div 
//                             key={d.name} 
//                             className="flex items-center space-x-2 cursor-default"
//                             // Use 'title' attribute for simple, native hover tooltip on legend items
//                             title={`${d.name}: ${d.hours.toFixed(1)} hours (${d.percentage.toFixed(1)}%)`}
//                         >
//                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}></div>
//                             <span className="text-xs text-slate-700 whitespace-nowrap">
//                                 {d.name} 
//                             </span>
//                              <span className="text-xs text-slate-500 font-medium">({d.percentage.toFixed(1)}%)</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="mt-2 text-center text-sm text-slate-600">
//                 Total Project Hours: <span className="font-bold text-purple-600">{formatDuration(totalHours)}</span>
//             </div>
//         </div>
//     );
// };


// // --- MAIN COMPONENT ---

// export default function Timesheet() {
//     const [rawEntries, setRawEntries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [employeeCategory, setEmployeeCategory] = useState("All"); 
//     const [selectedProject, setSelectedProject] = useState("All"); 
//     const [searchTerm, setSearchTerm] = useState(""); 
    
//     const [detailsView, setDetailsView] = useState(null);

//     // Fetch data and sort it (latest first)
//     useEffect(() => {
//         setLoading(true);
//         mockFetchEntries()
//             .then((data) => setRawEntries(data))
//             .finally(() => setLoading(false));
//     }, []);

//     const handleViewDetails = (entry) => {
//         setDetailsView(entry);
//     };

//     // Combined filtering logic
//     const filteredEntries = useMemo(() => {
//         const lowerCaseSearch = searchTerm.toLowerCase();

//         const filtered = rawEntries.filter(e => {
//             // 1. Filter by Role (Employee Category dropdown)
//             const categoryMatch = employeeCategory === "All" || e.role === employeeCategory;

//             // 2. Filter by Project dropdown
//             const projectMatch = selectedProject === "All" || e.project === selectedProject;

//             // 3. Filter by Search Term
//             const searchMatch = lowerCaseSearch === "" || 
//                 e.employeeName.toLowerCase().includes(lowerCaseSearch) || 
//                 e.role.toLowerCase().includes(lowerCaseSearch) || 
//                 e.project.toLowerCase().includes(lowerCaseSearch) || 
//                 e.taskDetail.toLowerCase().includes(lowerCaseSearch);

//             return categoryMatch && projectMatch && searchMatch;
//         });
        
//         // Always sort by timestamp descending (latest first).
//         filtered.sort((a, b) => b.timestamp - a.timestamp); 

//         return filtered;
//     }, [rawEntries, employeeCategory, selectedProject, searchTerm]);

//     // Apply the display limit: Only show the latest 10, UNLESS filters/search are active.
//     const entriesToDisplay = useMemo(() => {
//         const hasActiveFilter = employeeCategory !== "All" || selectedProject !== "All" || searchTerm !== "";
        
//         // If any filter/search is active, show all matched results.
//         if (hasActiveFilter) {
//             return filteredEntries;
//         }

//         // Otherwise, show only the latest 10.
//         return filteredEntries.slice(0, 10);
//     }, [filteredEntries, employeeCategory, selectedProject, searchTerm]);


//     // Data calculation for the Bar Chart: Aggregate hours per day
//     const workloadDataAggregated = useMemo(() => {
//         const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//         const aggregation = {};
        
//         // Initialize for the 7 days (Oct 12 to Oct 18)
//         for (let i = 0; i < 7; i++) {
//             const d = new Date(CURRENT_DATE);
//             d.setDate(CURRENT_DATE.getDate() - i);
//             const dayIndex = d.getDay();
//             const dayName = days[dayIndex];
//             const dateKey = d.toISOString().slice(0, 10);
//             aggregation[dateKey] = { day: dayName, date: dateKey, hours: 0 };
//         }

//         filteredEntries.forEach(entry => {
//             const dateKey = entry.date;
//             if (aggregation[dateKey]) {
//                 aggregation[dateKey].hours += entry.durationHours;
//             }
//         });

//         // Convert back to array, sort by date (oldest to newest)
//         return Object.values(aggregation)
//             .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//             .map(item => ({
//                 ...item,
//                 hours: parseFloat(item.hours.toFixed(2)) 
//             }));
//     }, [filteredEntries]);
    
//     // Data calculation for the Pie Chart: Aggregate hours per project
//     const projectsHandledData = useMemo(() => {
//         const projectsMap = {};
//         filteredEntries.forEach(e => {
//             // Exclude 'N/A' (Sick Leave)
//             if (e.project !== "N/A") {
//                 projectsMap[e.project] = (projectsMap[e.project] || 0) + e.durationHours;
//             }
//         });

//         return Object.keys(projectsMap).map(name => ({
//             name: name,
//             hours: parseFloat(projectsMap[name].toFixed(2))
//         }));
//     }, [filteredEntries]);


//     // Calculate Total Hours (for header display)
//     const totalWeeklyHours = useMemo(() => {
//         return filteredEntries.reduce((sum, e) => sum + e.durationHours, 0);
//     }, [filteredEntries]);


//     // Ensure "All" is included in project options
//     const projectOptions = useMemo(() => ["All", ...sampleProjects.map(p => p.name)], []);


//     // Helper function to render status pill
//     const renderStatusPill = (status) => {
//         const base = "px-2 py-0.5 text-xs font-medium rounded-full";
//         switch (status) {
//             case "Approved":
//                 return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;
//             case "Pending":
//                 return <span className={`${base} bg-yellow-100 text-yellow-700`}>{status}</span>;
//             default:
//                 return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
//         }
//     };


//     return (
//         <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-xl">
            
//             {/* --- Header --- */}
//             <header className="flex justify-between items-center pb-4 border-b border-slate-200">
//                 <h1 className="text-2xl font-bold">Timesheet</h1>
//                 <div className="flex items-center space-x-4 text-sm">
//                     {/* Updated date display to "This Week" */}
//                     <div className="px-3 py-1 bg-white border rounded-md shadow-sm font-semibold">
//                         This Week
//                     </div>
//                     <div className="flex items-center px-3 py-1 bg-purple-50 text-purple-700 rounded-md font-semibold shadow-sm">
//                         🕒 {formatDuration(totalWeeklyHours)}
//                     </div>
//                     <button className="text-slate-400 hover:text-slate-600 text-xl">...</button> 
//                 </div>
//             </header>

//             {/* --- Charts Section --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 <WorkloadBarChart data={workloadDataAggregated} />
//                 <ProjectsPieChart data={projectsHandledData} />
//             </div>

//             {/* --- Filters and Search --- */}
//             <div className="bg-white p-4 mt-6 border border-slate-100 rounded-xl">
//                 <div className="grid grid-cols-3 gap-4 mb-4">
                    
//                     {/* Employee Role Dropdown */}
//                     <div className="flex flex-col">
//                         <label className="text-xs text-slate-500 mb-1">Employee Role</label>
//                         <select 
//                             value={employeeCategory}
//                             onChange={(e) => setEmployeeCategory(e.target.value)}
//                             className="p-2 border rounded-md bg-white text-sm focus:ring-purple-500 focus:border-purple-500"
//                         >
//                             {EMPLOYEE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                         </select>
//                     </div>

//                     {/* Project Dropdown */}
//                     <div className="flex flex-col">
//                         <label className="text-xs text-slate-500 mb-1">Project name</label>
//                         <select 
//                             value={selectedProject}
//                             onChange={(e) => setSelectedProject(e.target.value)}
//                             className="p-2 border rounded-md bg-white text-sm focus:ring-purple-500 focus:border-purple-500"
//                         >
//                             {projectOptions.map(p => <option key={p} value={p}>{p}</option>)}
//                         </select>
//                     </div>
                    
//                     {/* Search Bar */}
//                     <div className="flex flex-col col-span-1">
//                         <label className="text-xs text-slate-500 mb-1">Search (Name/Project/Task)</label>
//                         <input
//                             type="text"
//                             placeholder="e.g., Alice Smith, Mobile app"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="p-2 border rounded-md bg-white text-sm focus:ring-purple-500 focus:border-purple-500"
//                         />
//                     </div>
//                 </div>
//                 <div className="flex justify-end items-center border-t pt-3">
//                     <button className="text-sm text-purple-600 flex items-center">
//                         List view <span className="ml-1">▼</span>
//                     </button>
//                 </div>
//             </div>

//             {/* --- Timesheet Entries Table --- */}
//             <div className="mt-6">
//                 <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-slate-100">
//                     <table className="min-w-full w-full table-auto">
//                         <thead className="text-left text-xs bg-slate-50 border-b border-slate-200">
//                             <tr>
//                                 <th className="px-4 py-3 font-medium">Date</th>
//                                 <th className="px-4 py-3 font-medium">Employee</th> 
//                                 <th className="px-4 py-3 font-medium">Project</th>
//                                 <th className="px-4 py-3 font-medium">Start Time</th>
//                                 <th className="px-4 py-3 font-medium">End Time</th>
//                                 <th className="px-4 py-3 font-medium">Status</th>
//                                 <th className="px-4 py-3 font-medium">Details</th> 
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loading ? (
//                                 <tr><td colSpan={7} className="p-6 text-center">Loading...</td></tr>
//                             ) : entriesToDisplay.length === 0 ? (
//                                 <tr><td colSpan={7} className="p-6 text-center text-slate-500">No entries found matching the current criteria.</td></tr>
//                             ) : (
//                                 entriesToDisplay.map((e) => (
//                                     <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50">
//                                         <td className="px-4 py-3 text-sm">{new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}</td>
//                                         <td className="px-4 py-3 text-sm font-medium">{e.employeeName}</td> 
//                                         <td className="px-4 py-3 text-sm font-medium">{e.project}</td>
//                                         <td className="px-4 py-3 text-sm">{e.startTime}</td>
//                                         <td className="px-4 py-3 text-sm">{e.endTime}</td>
//                                         <td className="px-4 py-3">{renderStatusPill(e.status)}</td>
//                                         <td className="px-4 py-3">
//                                             <button 
//                                                 onClick={() => handleViewDetails(e)}
//                                                 className="text-sm text-purple-600 hover:text-purple-800 font-medium underline"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
                
//                 {/* Display limit message */}
//                 {filteredEntries.length > 10 && entriesToDisplay.length === 10 && (
//                      <div className="mt-4 p-3 text-center bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-200">
//                         Displaying only the **latest 10 entries** out of {filteredEntries.length} total entries. Use the search or filters to find specific historical entries.
//                     </div>
//                 )}
//                  {filteredEntries.length > 10 && entriesToDisplay.length > 10 && (
//                      <div className="mt-4 p-3 text-center bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-200">
//                         Displaying all {filteredEntries.length} entries matching the active filters/search criteria.
//                     </div>
//                 )}
//             </div>
            
//             {/* --- Details Modal --- */}
//             <DetailsModal entry={detailsView} onClose={() => setDetailsView(null)} />

//         </div>
//     );
// }

import React, { useEffect, useMemo, useState } from "react";
import { timesheetService } from "../services/timesheetService";
// Replace bulky inline data with the exported employee list
import { EMPLOYEE_HIERARCHY_DATA_FULL as EMPLOYEE_DATA_RAW } from "../assets/employee"; // adjust path if needed
 
// Timesheet.jsx - Connected to Backend API
 
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
    const [updating, setUpdating] = useState(false);
   
    // Filter states
    const [employeeCategory, setEmployeeCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
   
    // WEEK and MONTH State
    const [selectedWeek, setSelectedWeek] = useState(4); // Default to the latest week (Week 4)
    const [selectedMonth, setSelectedMonth] = useState("October 2025"); // Default to October 2025
 
    // State for modal
    const [detailsView, setDetailsView] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
 
    // Fetch data from backend API
    useEffect(() => {
        const fetchTimesheets = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching timesheets from API...');
               
                const data = await timesheetService.getAllTimesheets();
                console.log('API Response:', data);
               
                // Transform backend data to match frontend structure
                const transformedData = data.map(entry => ({
                    id: entry.timesheetId,
                    date: entry.date.toString(),
                    timestamp: new Date(entry.date.toString()).getTime(),
                    project: entry.project,
                    durationHours: parseFloat(entry.hoursWorked),
                    role: employeeDirectory[entry.employeeId]?.role || "Unknown",
                    employeeName:`${entry.employeeId}`,
                    taskDetail: entry.taskDetail,
                    startTime: entry.startTime,
                    endTime: entry.endTime,
                    duration: formatDuration(parseFloat(entry.hoursWorked)), // Calculate duration from hours
                    isSick: false, // Your backend doesn't have this field
                    status: entry.status,
                    employeeId: entry.employeeId,
                    week: entry.week || 4 // Use week from backend or default to 4
                }));
               
                console.log('Transformed data:', transformedData);
                setRawEntries(transformedData);
            } catch (err) {
                console.error('API Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
 
        fetchTimesheets();
    }, []);
 
    // Fixed Approve/Reject function
    const handleApproveReject = async (employeeId, week, newStatus) => {
        try {
            setUpdating(true);
            setError(null);
            setSuccess(null);
           
            console.log(`Attempting to ${newStatus} timesheets for employee ${employeeId}, week ${week}`);
           
            // Get all entries for this employee and week
            const entriesToUpdate = rawEntries.filter(entry =>
                entry.employeeId === employeeId && entry.week === week
            );
           
            console.log(`Found ${entriesToUpdate.length} entries to update`);
           
            if (entriesToUpdate.length === 0) {
                setError('No entries found to update');
                return;
            }
 
            // Update each entry via API
            const updatePromises = entriesToUpdate.map(async (entry) => {
                // Create the update payload - only send necessary fields that match backend model
                const updatePayload = {
                    timesheetId: entry.id,
                    employeeId: entry.employeeId,
                    date: entry.date,
                    project: entry.project,
                    taskDetail: entry.taskDetail,
                    hoursWorked: entry.durationHours,
                    startTime: entry.startTime,
                    endTime: entry.endTime,
                    status: newStatus // Only change the status
                };
               
                console.log(`Updating entry ${entry.id} with:`, updatePayload);
                return await timesheetService.updateTimesheet(entry.id, updatePayload);
            });
 
            // Wait for all updates to complete
            await Promise.all(updatePromises);
           
            console.log(`Successfully ${newStatus.toLowerCase()} all entries`);
           
            // Update local state only after successful API calls
            setRawEntries(prevEntries =>
                prevEntries.map(entry => {
                    if (entry.employeeId === employeeId && entry.week === week) {
                        return { ...entry, status: newStatus };
                    }
                    return entry;
                })
            );
           
            // Show success message
            setSuccess(`Successfully ${newStatus.toLowerCase()} all timesheet entries for this week!`);
           
            // Close the modal after successful action
            setTimeout(() => {
                setDetailsView(null);
                setSuccess(null);
            }, 2000);
           
        } catch (err) {
            console.error('Error updating timesheet status:', err);
            setError(`Failed to update timesheet status: ${err.message || 'Unknown error'}`);
        } finally {
            setUpdating(false);
        }
    };
 
    // The View button now opens the Employee Weekly Summary Modal
    const handleViewDetails = (entry) => {
        // Create a new object for the modal state that includes the clicked entry's status
        setDetailsView({
            ...entry,
            clickedEntryStatus: entry.status
        });
    };
 
    // Filter by selected week first
    const weeklyEntries = useMemo(() => {
        return rawEntries.filter(e => e.week === selectedWeek);
    }, [rawEntries, selectedWeek]);
 
    // Combined filtering logic applied to the currently selected week's data
    const filteredEntries = useMemo(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();
 
        const filtered = weeklyEntries.filter(e => {
            // 1. Filter by Role (Employee Category dropdown)
            const categoryMatch = employeeCategory === "All" || e.role === employeeCategory;
            const projectMatch = selectedProject === "All" || e.project === selectedProject;
            const searchMatch = lowerCaseSearch === "" ||
                e.employeeName.toLowerCase().includes(lowerCaseSearch) ||
                e.role.toLowerCase().includes(lowerCaseSearch) ||
                e.project.toLowerCase().includes(lowerCaseSearch) ||
                e.taskDetail.toLowerCase().includes(lowerCaseSearch);
 
            return categoryMatch && projectMatch && searchMatch;
        });
       
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        return filtered;
    }, [weeklyEntries, employeeCategory, selectedProject, searchTerm]);
 
    // Apply the display limit
    const entriesToDisplay = useMemo(() => {
        const hasActiveFilter = employeeCategory !== "All" || selectedProject !== "All" || searchTerm !== "";
        return hasActiveFilter ? filteredEntries : filteredEntries.slice(0, 10);
    }, [filteredEntries, employeeCategory, selectedProject, searchTerm]);
 
    // Clear messages after 5 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);
 
    return (
        <div
            className="mt-10 md:mt-0 w-full max-w-5xl mx-auto p-4 md:p-6 rounded-2xl shadow-xl"
            style={{
                background: "linear-gradient(to bottom right, #EEF1FD, #F5F6FF)", // Home.jsx Background
            }}
        >
            <div className="bg-white rounded-2xl shadow-lg p-6"> {/* Main content wrapper */}
               
                {/* --- Header --- */}
                <header className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h1 className="mt-5 md:mt-0 mx-auto text-3xl font-bold text-[#3C467B]">Timesheet</h1> {/* Matched text-gray-800 */}
                    
                </header>
 
                {/* Enhanced Error Display */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex justify-between items-center">
                        <span>Error: {error}</span>
                        <button
                            onClick={() => setError(null)}
                            className="text-red-700 hover:text-red-900 text-lg font-bold"
                        >
                            ×
                        </button>
                    </div>
                )}
 
                {/* Success Message Display */}
                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex justify-between items-center">
                        <span>{success}</span>
                        <button
                            onClick={() => setSuccess(null)}
                            className="text-green-700 hover:text-green-900 text-lg font-bold"
                        >
                            ×
                        </button>
                    </div>
                )}
 
                {/* Loading Indicator for Updates */}
                {updating && (
                    <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-center">
                        Updating timesheet status...
                    </div>
                )}
 
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
                            <thead className="text-left text-xs bg-gray-50 border-b border-gray-200 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Employee ID</th>
                                    <th className="px-4 py-3 font-medium">Project</th>
                                    <th className="px-4 py-3 font-medium">Start Time</th>
                                    <th className="px-4 py-3 font-medium">End Time</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Summary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={7} className="p-6 text-center text-gray-500">Loading timesheets from backend...</td></tr>
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
                                                    style={{ color: ACCENT_BLUE }}
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
 