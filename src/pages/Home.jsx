import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { Users, Calendar, Clock, MessageSquare } from "lucide-react";

const data = [
  { name: "Jan", Applications: 40, Shortlisted: 24, Rejected: 18 },
  { name: "Feb", Applications: 30, Shortlisted: 13, Rejected: 22 },
  { name: "Mar", Applications: 20, Shortlisted: 18, Rejected: 12 },
  { name: "Apr", Applications: 27, Shortlisted: 23, Rejected: 20 },
  { name: "May", Applications: 18, Shortlisted: 14, Rejected: 15 },
  { name: "Jun", Applications: 23, Shortlisted: 20, Rejected: 17 },
];

export default function Home() {
  const cards = [
    {
      title: "Total Employees",
      value: "256",
      change: "+5%",
      icon: Users,
      color: "#3C467B",
      link: "/employee-management",
    },
    {
      title: "Pending Leaves",
      value: "12",
      change: "-3%",
      icon: Calendar,
      color: "#50589C",
      link: "/leave-management",
    },
    {
      title: "Timesheets Logged",
      value: "134",
      change: "+8%",
      icon: Clock,
      color: "#636CCB",
      link: "/timesheets",
    },
    {
      title: "Feedback Received",
      value: "47",
      change: "+11%",
      icon: MessageSquare,
      color: "#6E8CFB",
      link: "/feedback",
    },
  ];

  return (
    <div
      className="min-h-screen flex justify-center px-6 mt-7 md:mt-0"
      style={{
        background: "linear-gradient(to bottom right, #EEF1FD, #F5F6FF)",
      }}
    >
      <div className="w-full max-w-6xl pt-6 md:pt-16">
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Dashboard
        </motion.h1>

        {/* Stat Cards (Now Clickable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, i) => (
            <Link key={i} to={card.link} className="block group">
              <motion.div
                className="rounded-2xl shadow-lg p-5 text-white flex items-center justify-between cursor-pointer transform transition-transform"
                style={{ backgroundColor: card.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <div>
                  <p className="text-sm opacity-90">{card.title}</p>
                  <h2 className="text-3xl font-semibold mt-1">{card.value}</h2>
                  <p className="text-sm opacity-75">{card.change} this month</p>
                </div>
                <card.icon className="w-10 h-10 opacity-80 transition-transform group-hover:rotate-6" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Chart Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Employee Performance Overview
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Applications" fill="#3C467B" />
                <Bar dataKey="Shortlisted" fill="#636CCB" />
                <Bar dataKey="Rejected" fill="#6E8CFB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Recent Activities
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 border-l-4 border-[#3C467B] pl-3">
                Rahul submitted timesheet for Week 42
              </li>
              <li className="text-sm text-gray-600 border-l-4 border-[#50589C] pl-3">
                Priya applied for 3 days leave
              </li>
              <li className="text-sm text-gray-600 border-l-4 border-[#636CCB] pl-3">
                Arjun completed onboarding checklist
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Upcoming Meetings
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600">
                <span className="font-medium text-[#3C467B]">9:30 AM</span> — HR
                Sync
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-medium text-[#50589C]">2:00 PM</span> —
                Timesheet Review
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-medium text-[#636CCB]">4:30 PM</span> —
                Feedback Session
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
