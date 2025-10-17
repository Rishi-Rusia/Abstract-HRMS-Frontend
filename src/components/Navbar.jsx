import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
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
    { name: "Home", path: "/" },
    { name: "Employee Management", path: "/employees" },
    { name: "Leave Management", path: "/leaves" },
    { name: "Timesheets", path: "/timesheets" },
    { name: "Feedback", path: "/feedback" },
    { name: "Organization Chart", path: "/org-chart" },
    { name: "Onboard Employee", path: "/onboard" },
  ];

  const colorPrimary = "#3C467B";
  const colorLight = "#6E8CFB";

  return (
    <nav
      className="bg-white shadow-lg w-full fixed top-0 left-0 z-50 md:hidden"
      style={{ borderBottom: `3px solid ${colorPrimary}` }}
    >
      <div className="flex justify-between items-center h-16 px-4">
        {/* HRMS Brand */}
        <Link to="/" className="text-3xl font-bold" style={{ color: colorPrimary }}>
          HRMS
        </Link>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          {/* Profile Button */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="focus:outline-none"
          >
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
          </button>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-700 hover:text-blue-700 focus:outline-none"
          >
            <HiOutlineMenu size={28} />
          </button>
        </div>
      </div>

      {/* Profile Dropdown */}
      {profileOpen && (
        <div className="absolute right-4 top-16 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-50">
          <div className="flex flex-col items-center px-4 py-4 border-b border-gray-200 bg-gray-50">
            <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full mb-2" />
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.title}</p>
            <p className="text-sm text-gray-500">{user.department}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <div className="flex flex-col px-2 py-2">
            <Link
              to={user.profileLink}
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setProfileOpen(false)}
            >
              My Profile
            </Link>
            <Link
              to={user.settingsLink}
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setProfileOpen(false)}
            >
              Settings
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-red-100 hover:text-red-600"
              onClick={() => {
                setProfileOpen(false);
                alert("Logged out");
              }}
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
          <Link to="/" onClick={() => setIsOpen(false)}>
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
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
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
