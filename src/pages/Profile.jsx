// src/pages/Profile.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
    HiOutlineMail,
    HiOutlineOfficeBuilding,
    HiOutlineUserCircle,
    HiOutlineBriefcase,
    HiOutlinePhone,
    HiOutlineCalendar,
    HiOutlineClock,
    HiOutlineChartBar,
    HiOutlineCheckCircle,
} from "react-icons/hi";

const Profile = () => {
    const { name, email, department, isAdmin, employeeId, phone, joiningDate, employmentType } = useSelector(
        (state) => state.auth
    );

    return (
        <div className="mt-10 md:mt-0 p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-extrabold text-[#3C467B] mb-6">
                    My Profile
                </h1>

                {/* Profile Card */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                    {/* Animated Gradient Banner */}
                    <div
  className="h-36 bg-gradient-to-r from-[#3C467B] via-[#50589C] to-[#636CCB] animate-gradient-x bg-cover bg-bottom"
  style={{
    backgroundImage: "url('https://media.licdn.com/dms/image/v2/D4E16AQEll6r5geBzTg/profile-displaybackgroundimage-shrink_200_800/B4EZc12vNjG4AY-/0/1748955231815?e=2147483647&v=beta&t=lox5YKVHuYPcqljOk9MXNMjFNaxauZo1P81xmfU4ZS8')",
  }}
/>



                    {/* Profile Info */}
                    <div className="flex flex-col items-center -mt-16 pb-6">
                        <img
                            src={`https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png`}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                        />

                        <h2 className="mt-4 text-2xl font-bold text-gray-800">{name}</h2>
                        <p className="text-sm text-gray-500 mb-1">
                            {isAdmin ? "HR / Admin" : "Employee"}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:space-x-6 mt-4 text-gray-600 text-sm">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <HiOutlineOfficeBuilding
                                    className="mr-2 text-[#50589C]"
                                    size={18}
                                />
                                <span>{department || "Department"}</span>
                            </div>
                            <div className="flex items-center">
                                <HiOutlineMail className="mr-2 text-[#50589C]" size={18} />
                                <span>{email || "Email not available"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-gray-100">
                        {[
                            {
                                icon: <HiOutlineCheckCircle size={22} />,
                                label: "Leaves Taken",
                                value: "12",
                                color: "text-[#3C467B]",
                            },
                            {
                                icon: <HiOutlineClock size={22} />,
                                label: "Upcoming Leaves",
                                value: "2",
                                color: "text-[#50589C]",
                            },
                            {
                                icon: <HiOutlineChartBar size={22} />,
                                label: "Timesheets Logged",
                                value: "46",
                                color: "text-[#636CCB]",
                            },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center py-4 hover:bg-[#F9FAFF] transition-all"
                            >
                                <div className={`${stat.color} mb-1`}>{stat.icon}</div>
                                <span className="text-2xl font-bold text-gray-800">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Info Sections */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 py-8 bg-[#F9FAFF]">
                        {/* Personal Info Section */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E8EBFF] hover:shadow-md transition">
                            <h3 className="text-[#3C467B] font-semibold text-sm mb-3 uppercase tracking-wide">
                                Personal Information
                            </h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                <li className="flex items-center">
                                    <HiOutlineMail className="mr-2 text-[#50589C]" />
                                    {email || "N/A"}
                                </li>
                                <li className="flex items-center">
                                    <HiOutlinePhone className="mr-2 text-[#50589C]" />
                                    {phone
                                        ? `+91 ${phone}`
                                        : `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`}
                                </li>

                                <li className="flex items-center">
                                    <HiOutlineCalendar className="mr-2 text-[#50589C]" />
                                    Joined: {joiningDate
                                        ? new Date(joiningDate).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "long",
                                        })
                                        : new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12)).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "long",
                                        })}
                                </li>

                            </ul>
                        </div>

                        {/* Company Info Section */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E8EBFF] hover:shadow-md transition">
                            <h3 className="text-[#3C467B] font-semibold text-sm mb-3 uppercase tracking-wide">
                                Company Information
                            </h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                <li className="flex items-center">
                                    <HiOutlineOfficeBuilding className="mr-2 text-[#50589C]" />
                                    Department: {department || "N/A"}
                                </li>
                                <li className="flex items-center">
                                    <HiOutlineBriefcase className="mr-2 text-[#50589C]" />
                                    Employment Type: {employmentType || "Fulltime"}
                                </li>
                                <li className="flex items-center">
                                    <HiOutlineUserCircle className="mr-2 text-[#50589C]" />
                                    Employee ID: {employeeId || "N/A"}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center py-4 border-t border-gray-100 text-gray-400 text-sm">
                        <HiOutlineUserCircle className="inline-block mr-2" size={18} />
                        Last updated recently
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
