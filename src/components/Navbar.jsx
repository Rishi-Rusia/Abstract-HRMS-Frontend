// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ===== Get user info from Redux =====
  const { name, department, email, isAdmin } = useSelector((state) => state.auth);

  const colorPrimary = "#3C467B";
  const colorLight = "#6E8CFB";

  // ===== Dynamic role-based navigation =====
  const adminLinks = [
    { name: "Home", path: "/home" },
    { name: "Employee Management", path: "/employee-management" },
    { name: "Leave Management", path: "/leave-management" },
    { name: "Timesheets", path: "/timesheets" },
    { name: "Feedback", path: "/feedback" },
    { name: "Organization Chart", path: "/orgchart" },
    { name: "Onboard Employee", path: "/onboard" },
  ];

  const employeeLinks = [
    { name: "Home", path: "/home" },
    { name: "Leave Application", path: "/leave-submission" },
    { name: "Leave History", path: "/leave-history" },
    { name: "Log Timesheet", path: "/log-timesheet" },
    { name: "Your Feedback", path: "/your-feedback" },
    { name: "Organisation Chart", path: "/orgchart" },
  ];

  const navLinks = isAdmin ? adminLinks : employeeLinks;

  const handleLogout = () => {
    setProfileOpen(false);
    setIsOpen(false);
    dispatch(logout());
    navigate("/"); // redirect to login page
  };

  return (
    <nav
      className="bg-white shadow-lg w-full fixed top-0 left-0 z-50 md:hidden"
      style={{ borderBottom: `3px solid ${colorPrimary}` }}
    >
      <div className="flex justify-between items-center h-16 px-4">
        {/* Brand */}

        <div className=" flex ">
{/* <img src="https://media.licdn.com/dms/image/v2/D4E0BAQGM8mTYyRDJhw/company-logo_200_200/company-logo_200_200/0/1707204892363/abstract_tech_ltd_logo?e=2147483647&v=beta&t=I0YoAljlfY9YiP0_bQg2IP5VZdHqm9WGvghKrgB8jv8" alt="" /> */}
        <Link
          to="/home"
          className="text-3xl font-bold"
          style={{ color: colorPrimary }}
        >
          HRMS
        </Link>

        </div>

        

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Profile Button */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="focus:outline-none"
          >
            <img
              src={"https://i.pravatar.cc/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-700 hover:text-[#50589C] focus:outline-none"
          >
            <HiOutlineMenu size={28} />
          </button>
        </div>
      </div>

      {/* Profile Dropdown */}
      {profileOpen && (
        <div className="absolute right-4 top-16 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-50">
          <div className="flex flex-col items-center px-4 py-4 border-b border-gray-200 bg-gray-50">
            <img
              src={"https://i.pravatar.cc/80"}
              alt="Profile"
              className="w-16 h-16 rounded-full mb-2"
            />
            <h2 className="text-lg font-semibold text-gray-800">{name || "Employee"}</h2>
            <p className="text-sm text-gray-500">{department || "Department"}</p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>

          <div className="flex flex-col px-2 py-2">
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-[#F2F4FF] hover:text-[#50589C]"
              onClick={() => setProfileOpen(false)}
            >
              My Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-[#F2F4FF] hover:text-[#50589C]"
              onClick={() => setProfileOpen(false)}
            >
              Settings
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-red-100 hover:text-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Mobile Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div
          className="flex justify-between items-center px-4 py-4 border-b"
          style={{ backgroundColor: colorPrimary }}
        >
          {/* <img src="https://media.licdn.com/dms/image/v2/D4E0BAQGM8mTYyRDJhw/company-logo_200_200/company-logo_200_200/0/1707204892363/abstract_tech_ltd_logo?e=2147483647&v=beta&t=I0YoAljlfY9YiP0_bQg2IP5VZdHqm9WGvghKrgB8jv8" alt="" /> */}
          <Link to="/home" onClick={() => setIsOpen(false)}>
            <h1 className="text-xl font-bold text-white">HRMS</h1>
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <HiOutlineX size={26} />
          </button>
        </div>

        <div className="flex flex-col mt-4 space-y-3 px-4">
          {navLinks.map(({ name, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`block px-3 py-2 rounded-md font-medium ${
                  active
                    ? "bg-[#E8EBFF] text-[#3C467B] font-semibold"
                    : "text-gray-700 hover:text-[#50589C] hover:bg-[#F2F4FF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay */}
      {(isOpen || profileOpen) && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => {
            setIsOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </nav>
  );
}

export default Navbar;
