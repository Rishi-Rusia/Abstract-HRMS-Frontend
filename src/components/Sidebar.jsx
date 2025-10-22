// src/components/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
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
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch();

  // ===== Pull employee info directly from Redux =====
  const { name, department, email, isAdmin } = useSelector((state) => state.auth);

  // ===== Assume juniors array is added in state later =====
  const juniors = useSelector((state) => state.auth.juniors || []);

  // ===== Build navigation dynamically =====
  let navLinks = [];

  if (isAdmin) {
    navLinks = [
      { label: "Home", path: "/home", icon: <HiOutlineHome size={20} /> },
      { label: "Employee Management", path: "/employee-management", icon: <HiOutlineUserGroup size={20} /> },
      { label: "Leave Management", path: "/leave-management", icon: <HiOutlineCalendar size={20} /> },
      { label: "Timesheets", path: "/timesheets", icon: <HiOutlineClock size={20} /> },
      { label: "Organization Chart", path: "/orgchart", icon: <HiOutlineOfficeBuilding size={20} /> },
      { label: "Onboard Employee", path: "/onboard", icon: <HiOutlineUserAdd size={20} /> },
    ];
  } else {
    navLinks = [
      { label: "Home", path: "/home", icon: <HiOutlineHome size={20} /> },
      { label: "Leave Application", path: "/leave-submission", icon: <HiOutlineCalendar size={20} /> },
      { label: "Leave History", path: "/leave-history", icon: <HiOutlineCalendar size={20} /> },
      { label: "Log Timesheet", path: "/log-timesheet", icon: <HiOutlineClock size={20} /> },
      { label: "Your Feedback", path: "/your-feedback", icon: <HiOutlineChatAlt2 size={20} /> },
      { label: "Organisation Chart", path: "/orgchart", icon: <HiOutlineOfficeBuilding size={20} /> },
    ];

    if (juniors.length > 0) {
      navLinks.push({ label: "My Juniors", path: "/my-juniors", icon: <HiOutlineUserGroup size={20} /> });
    }
  }

  // ===== Handle Logout =====
  const handleLogout = () => {
    setProfileOpen(false);
    dispatch(logout());
    navigate("/"); // Redirect to login page
  };

  return (
    <aside className="flex flex-col w-72 bg-white border-r border-gray-200 shadow-xl min-h-screen p-5">
      {/* Logo */}
      <Link
        to="/home"
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

      {/* Profile Section */}
      <div className="mt-auto relative">
        <div
          className="flex items-center space-x-3 p-3 mt-10 rounded-lg bg-gray-50 cursor-pointer border border-gray-200 hover:bg-gray-100 transition"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            src={"https://i.pravatar.cc/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <div>
            <p className="font-semibold text-gray-800">{name || "Employee"}</p>
            <p className="text-sm text-gray-500">{department || "Department"}</p>
          </div>
        </div>

        {profileOpen && (
          <div className="absolute bottom-16 left-0 w-full bg-white border border-gray-200 shadow-2xl rounded-lg z-50 overflow-hidden">
            <div className="flex flex-col items-center px-4 py-4 border-b border-gray-200 bg-gray-50">
              <img
                src={"https://i.pravatar.cc/80"}
                alt="Profile"
                className="w-16 h-16 rounded-full mb-2"
              />
              <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
              <p className="text-sm text-gray-500">{department}</p>
              <p className="text-xs text-gray-400 truncate">{email}</p>
            </div>

            <div className="flex flex-col px-2 py-2">
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-[#F2F4FF] hover:text-[#50589C]"
                onClick={() => setProfileOpen(false)}
              >
                <HiOutlineUser className="mr-2" /> My Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-[#F2F4FF] hover:text-[#50589C]"
                onClick={() => setProfileOpen(false)}
              >
                <HiOutlineCog className="mr-2" /> Settings
              </Link>
              <button
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-red-100 hover:text-red-600"
                onClick={handleLogout}
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
