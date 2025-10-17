// src/components/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineChatAlt2,
  HiOutlineOfficeBuilding,
  HiOutlineUserAdd,
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineUser,
} from "react-icons/hi";

function Sidebar() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const user = {
    name: "John Doe",
    title: "Software Engineer",
    department: "Engineering",
    email: "john.doe@example.com",
    profileImage: "https://i.pravatar.cc/40",
    profileLink: "/profile",
    settingsLink: "/settings",
  };

  const navLinks = [
    { label: "Home", path: "/", icon: <HiOutlineHome size={20} /> },
    { label: "Employee Management", path: "/employee-management", icon: <HiOutlineUserGroup size={20} /> },
    { label: "Leave Management", path: "/leaves", icon: <HiOutlineCalendar size={20} /> },
    { label: "Timesheets", path: "/timesheets", icon: <HiOutlineClock size={20} /> },
    { label: "Feedback", path: "/feedback", icon: <HiOutlineChatAlt2 size={20} /> },
    { label: "Organization Chart", path: "/orgchart", icon: <HiOutlineOfficeBuilding size={20} /> },
    { label: "Onboard Employee", path: "/onboard", icon: <HiOutlineUserAdd size={20} /> },
  ];

  return (
    <aside className="flex flex-col w-72 bg-white border-r border-gray-200 shadow-xl min-h-screen p-5">
      {/* Logo (clickable) */}
      <Link
        to="/"
        className="mb-10 text-3xl font-bold tracking-tight bg-gradient-to-r from-[#3C467B] via-[#50589C] to-[#636CCB] text-transparent bg-clip-text hover:opacity-90 transition"
      >
        HRMS
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3">
        {navLinks.map(({ label, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-md font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#E8EBFF] text-[#3C467B] font-semibold"
                  : "text-gray-700 hover:text-[#50589C] hover:bg-[#F2F4FF]"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="mt-auto relative">
        <div
          className="flex items-center space-x-3 p-3 mt-10 rounded-lg bg-gray-50 cursor-pointer border border-gray-200 hover:bg-gray-100 transition"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <div>
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.title}</p>
          </div>
        </div>

        {profileOpen && (
          <div className="absolute bottom-16 left-0 w-full bg-white border border-gray-200 shadow-2xl rounded-lg z-50 overflow-hidden">
            <div className="flex flex-col items-center px-4 py-4 border-b border-gray-200 bg-gray-50">
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full mb-2"
              />
              <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.title}</p>
              <p className="text-sm text-gray-500">{user.department}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>

            <div className="flex flex-col px-2 py-2">
              <Link
                to={user.profileLink}
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-[#F2F4FF] hover:text-[#50589C]"
                onClick={() => setProfileOpen(false)}
              >
                <HiOutlineUser className="mr-2" /> My Profile
              </Link>
              <Link
                to={user.settingsLink}
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-[#F2F4FF] hover:text-[#50589C]"
                onClick={() => setProfileOpen(false)}
              >
                <HiOutlineCog className="mr-2" /> Settings
              </Link>
              <button
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-red-100 hover:text-red-600"
                onClick={() => {
                  setProfileOpen(false);
                  alert("Logged out");
                }}
              >
                <HiOutlineLogout className="mr-2" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
