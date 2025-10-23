import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineSearch,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineTicket,
} from "react-icons/hi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { fetchLeaves, updateLeaveStatus } from "../redux/leaveAdminSlice";

export default function LeaveManagement() {
  const dispatch = useDispatch();
  const { leaves, status, error } = useSelector((state) => state.leaveAdmin);

  const [filter, setFilter] = useState("Pending");
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState({
    department: [],
    fromDate: [],
    toDate: [],
  });
  const [openDropdown, setOpenDropdown] = useState("");
  const dropdownRefs = useRef({});

  // Fetch all leaves on mount
  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!Object.values(dropdownRefs.current).some((ref) => ref?.contains(event.target))) {
        setOpenDropdown("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = useSelector((state) => state.auth);

  const handleStatusChange = (id, newStatus) => {
    if (!user || !user.employeeId) {
      console.error("No logged-in user found!");
      return;
    }
    dispatch(updateLeaveStatus({ leaveId: id, newStatus, updaterId: user.employeeId }));
  };


  if (status === "loading") return <p>Loading leaves...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // --- Filtering logic ---
  const filteredLeaves = leaves.filter((l) => {
    const matchesStatus =
      filter === "All" || l.status?.toLowerCase() === filter.toLowerCase();

    const matchesSearch =
      (l.title?.toLowerCase().includes(search.toLowerCase()) ||
        l.reason?.toLowerCase().includes(search.toLowerCase()) ||
        l.employeeName?.toLowerCase().includes(search.toLowerCase()) ||
        l.employee?.name?.toLowerCase().includes(search.toLowerCase()));

    const matchesColumns = Object.keys(columnFilters).every((col) => {
      if (columnFilters[col].length === 0) return true;
      return columnFilters[col].includes(String(l[col]));
    });

    return matchesStatus && matchesSearch && matchesColumns;
  });

  // --- Metrics ---
  const pendingCount = leaves.filter((l) => l.status === "Pending").length;
  const approvedCount = leaves.filter(
    (l) => l.status?.toLowerCase() === "accepted"
  ).length;
  const rejectedCount = leaves.filter((l) => l.status === "Rejected").length;

  const cancelledCount = leaves.filter((l) => l.status === "Cancelled").length; //---------------------------------- added for cancelled

  const totalCount = leaves.length;

  const upcomingApprovedLeaves = leaves.filter((l) => {
    const today = new Date();
    const fromDate = new Date(l.fromDate);
    return (
      l.status?.toLowerCase() === "accepted" &&
      fromDate >= today &&
      fromDate <= new Date(today.setDate(today.getDate() + 7))
    );
  }).length;

  const MOCK_TOTAL_AVAILABLE_DAYS = 200; // keep static for now

  const colors = {
    Pending: "text-[#50589C] bg-[#E8EBFF] border-[#E8EBFF]",
    Accepted: "text-[#1C7C2E] bg-[#DFFFE2] border-[#DFFFE2]",
    Rejected: "text-[#C62828] bg-[#FFE4E4] border-[#FFE4E4]",
    Cancelled: "text-gray-600 bg-gray-200 border-gray-200",
    Total: "text-gray-700 bg-gray-100 border-gray-100",
  };

  // Columns (added employeeName first)
  const columns = ["employeeName", "title", "reason", "fromDate", "toDate", "status"];

  const StatusCard = ({ status, count, icon: Icon, colorClass }) => (
    <motion.div
      className={`flex flex-col items-start p-4 bg-white rounded-xl shadow-lg border-b-4 ${colorClass.replace(
        "bg-",
        "border-"
      )}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Icon size={24} className={colorClass.split(" ")[0]} />
      <span className="text-3xl font-bold text-gray-800 mt-2">{count}</span>
      <span className="text-sm font-medium text-gray-500">{status}</span>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#3C467B]">
          Leave Management Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Action pending requests and review team's leave schedule.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusCard
          status="Total Requests"
          count={totalCount}
          icon={HiOutlineTicket}
          colorClass={colors.Total}
        />
        <StatusCard
          status="Pending Review"
          count={pendingCount}
          icon={HiOutlineClock}
          colorClass={colors.Pending}
        />
        <StatusCard
          status="Accepted"
          count={approvedCount}
          icon={HiOutlineCheckCircle}
          colorClass={colors.Accepted}
        />
        <StatusCard
          status="Rejected"
          count={rejectedCount}
          icon={HiOutlineXCircle}
          colorClass={colors.Rejected}
        />
        <StatusCard
          status="Cancelled"
          count={cancelledCount}
          icon={HiOutlineXCircle}
          colorClass={colors.Cancelled}
        />

      </div>

      {/* Upcoming & Available Days */}
      <div className="mt-10 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center p-4 bg-white rounded-xl shadow-md border-l-4 border-[#3C467B] space-x-3">
          <HiOutlineCalendar size={28} className="text-[#3C467B]" />
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {upcomingApprovedLeaves}
            </p>
            <p className="text-sm text-gray-500">
              Upcoming Approved Leaves (7 Days)
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-xl shadow-md border-l-4 border-gray-400 space-x-3">
          <HiOutlineShieldCheck size={28} className="text-gray-500" />
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {MOCK_TOTAL_AVAILABLE_DAYS}
            </p>
            <p className="text-sm text-gray-500">
              Total Available Leave Days (Team)
            </p>
          </div>
        </div>
      </div>

      {/* Notification */}
      {pendingCount > 0 && (
        <motion.div
          className="bg-[#F2F4FF] border-l-4 border-[#50589C] rounded-xl p-4 flex items-center space-x-3 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MdOutlineNotificationsActive
            size={24}
            className="text-[#3C467B] animate-pulse"
          />
          <p className="text-sm text-gray-700">
            You have{" "}
            <span className="font-semibold text-[#3C467B]">
              {pendingCount} pending
            </span>{" "}
            leave requests to review.
          </p>
        </motion.div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <div className="flex space-x-2 flex-wrap">
          {["All", "Pending", "Accepted", "Rejected", "Cancelled"].map((statusBtn) => (
            <button
              key={statusBtn}
              onClick={() => setFilter(statusBtn)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 mb-2 ${filter === statusBtn
                ? "bg-[#3C467B] text-white border-[#3C467B]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {statusBtn}
              {statusBtn === "Pending" && pendingCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white text-[#3C467B] font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80 flex items-center">
          <HiOutlineSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Employee Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#50589C] transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="min-w-full border-collapse relative">
          <thead className="bg-[#EEF1FD] text-gray-700 sticky top-0 z-10 shadow-sm">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left relative text-sm font-semibold whitespace-nowrap"
                >
                  <span className="flex items-center">
                    {col === "employeeName"
                      ? "Employee Name"
                      : col.charAt(0).toUpperCase() +
                      col.slice(1).replace("Date", " Date")}
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {filteredLeaves.map((leave) => (
                <motion.tr
                  key={leave.leaveId}
                  className="border-t border-gray-100 hover:bg-[#F9FAFF] transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {leave.employeeName || leave.employee?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {leave.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {leave.reason}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {new Date(leave.fromDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {new Date(leave.toDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[leave.status]}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    {leave.status === "Pending" ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <button
                          onClick={() =>
                            handleStatusChange(leave.leaveId, "Accepted")
                          }
                          className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition"
                          title="Accept"
                        >
                          <HiOutlineCheckCircle size={22} />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(leave.leaveId, "Rejected")
                          }
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition"
                          title="Reject"
                        >
                          <HiOutlineXCircle size={22} />
                        </button>
                      </motion.div>
                    ) : (
                      <HiOutlineClock
                        size={20}
                        className="text-gray-400 mx-auto"
                        title="Status Finalized"
                      />
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredLeaves.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No leave requests found matching the current filters.
          </p>
        )}
      </motion.div>
    </div>
  );
}


