// src/pages/Home.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineChartPie,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function Home() {
  const { isAdmin, name, department } = useSelector((state) => state.auth);

  // ===== Dummy data for charts =====
  const employeePerformance = [
    { name: "Jan", performance: 80 },
    { name: "Feb", performance: 85 },
    { name: "Mar", performance: 78 },
    { name: "Apr", performance: 90 },
    { name: "May", performance: 88 },
  ];

  const attendanceData = [
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 9 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 7 },
    { day: "Fri", hours: 8 },
  ];

  const performanceData = [
    { month: "Jan", rating: 7 },
    { month: "Feb", rating: 8 },
    { month: "Mar", rating: 7.5 },
    { month: "Apr", rating: 8.5 },
    { month: "May", rating: 9 },
  ];

  return (
    <div className="p-6 min-h-screen bg-[#F7F8FC]">
      <h1 className="text-3xl font-bold text-[#3C467B] mb-8">
        Welcome, {name || "User"}
      </h1>

      {/* ==================== ADMIN DASHBOARD ==================== */}
      {isAdmin ? (
        <div className="space-y-10">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <HiOutlineUserGroup className="text-[#50589C]" size={28} />
                <span className="text-sm text-gray-400">Employees</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">128</h3>
              <p className="text-sm text-gray-500">Total Employees</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <HiOutlineCalendar className="text-[#50589C]" size={28} />
                <span className="text-sm text-gray-400">This Month</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">12</h3>
              <p className="text-sm text-gray-500">Pending Leave Requests</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <HiOutlineOfficeBuilding className="text-[#50589C]" size={28} />
                <span className="text-sm text-gray-400">Departments</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">5</h3>
              <p className="text-sm text-gray-500">Active Departments</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <HiOutlineTrendingUp className="text-[#50589C]" size={28} />
                <span className="text-sm text-gray-400">Quarterly</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">+14%</h3>
              <p className="text-sm text-gray-500">Employee Growth</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#3C467B] mb-4">
                Employee Performance Overview
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={employeePerformance}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="performance" fill="#6E8CFB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#3C467B] mb-4">
                Department Growth Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={employeePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="performance"
                    stroke="#50589C"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== EMPLOYEE DASHBOARD ==================== */
        <div>
          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <HiOutlineClock className="text-[#50589C]" size={28} />
                <span className="text-sm text-gray-400">This week</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">36 hrs</h3>
              <p className="text-sm text-gray-500">Logged Hours</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <HiOutlineCalendar className="text-[#50589C]" size={28} />
                <span className="text-sm text-gray-400">This month</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">2</h3>
              <p className="text-sm text-gray-500">Leaves Taken</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <HiOutlineUser className="text-[#50589C]" size={28} />
                <span className="text-sm text-gray-400">Team</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{department || "Development"}</h3>
              <p className="text-sm text-gray-500">Department</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <HiOutlineChartPie className="text-[#50589C]" size={28} />
                <span className="text-sm text-gray-400">Quarter</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">8.7 / 10</h3>
              <p className="text-sm text-gray-500">Performance Rating</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Attendance Chart */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#3C467B] mb-4">
                Weekly Attendance
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={attendanceData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#6E8CFB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#3C467B] mb-4">
                Performance Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[6, 10]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#50589C"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* HR Contact / Info Section */}
          <div className="bg-gradient-to-r from-[#50589C] to-[#6E8CFB] text-white rounded-2xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-1">
                HR Contact & Support
              </h3>
              <p className="text-sm text-blue-100">
                Reach out for queries, support or feedback.
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/20 px-6 py-3 rounded-lg">
              <p className="font-semibold text-white">hr@company.com</p>
              <p className="text-sm text-blue-100">+91 98765 43210</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
