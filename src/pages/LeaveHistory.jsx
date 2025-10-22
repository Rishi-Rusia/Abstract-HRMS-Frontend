// src/pages/LeaveHistory.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function LeaveHistory() {
  const employeeId = useSelector((state) => state.auth?.employeeId);
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = `http://localhost:5149/api/Leave/employee/${employeeId}`;

  useEffect(() => {
    if (!employeeId) return;
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_URL);
        setLeaves(res.data);
      } catch (err) {
        console.error("Failed to fetch leaves:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, [employeeId]);

  const handleCancel = async (leaveId) => {
  if (!window.confirm("Cancel this leave?")) return;
  try {
    const res = await axios.put(
      `http://localhost:5149/api/Leave/${leaveId}/status?newStatus=Cancelled&updaterId=2`
    );

    // ✅ Log backend message
    console.log("Backend response:", res.data);

    // If backend sends a message field, log it clearly
    if (res.data?.message) {
      console.log("Message from backend:", res.data.message);
    }

    // Update local state after success
    setLeaves((prev) =>
      prev.map((l) =>
        l.leaveId === leaveId ? { ...l, status: "Cancelled" } : l
      )
    );
  } catch (err) {
    console.error("Cancel failed:", err.response?.data || err.message);
  }
};


  return (
    <div className="min-h-scree from-[#3C467B]/20 via-[#50589C]/20 to-[#636CCB]/20 px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-[#3C467B]">Leave History</h1>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg pt-1">
        {loading ? (
          <p className="text-center text-[#50589C]">Loading...</p>
        ) : leaves.length === 0 ? (
          <p className="text-center text-[#50589C]">No leave records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[#3C467B]">
              <thead className="bg-[#636CCB]/20">
                <tr>
                  <th className="p-3">Leave ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">From</th>
                  <th className="p-3">To</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr
                    key={leave.leaveId}
                    className="border-b border-[#50589C]/30 hover:bg-[#6E8CFB]/20 transition"
                  >
                    <td className="p-3 font-mono">{leave.leaveId}</td>
                    <td className="p-3">{leave.title}</td>
                    <td className="p-3">{leave.fromDate}</td>
                    <td className="p-3">{leave.toDate}</td>
                    <td className="p-3">{leave.reason}</td>
                    <td
                      className={`p-3 font-semibold ${
                        leave.status === "Pending"
                          ? "text-yellow-500"
                          : leave.status === "Accepted"
                          ? "text-green-400"
                          : leave.status === "Rejected"
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {leave.status}
                    </td>
                    <td className="p-3 flex justify-center gap-3">
                      <button
                        onClick={() => setSelectedLeave(leave)}
                        className="cursor-pointer px-4 py-2 rounded-lg bg-[#50589C] hover:bg-[#636CCB] text-white font-semibold transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleCancel(leave.leaveId)}
                        disabled={leave.status !== "Pending"}
                        className={`cursor-pointer px-4 py-2 rounded-lg text-white font-semibold transition ${
                          leave.status === "Pending"
                            ? "bg-[#6E8CFB] hover:bg-[#636CCB]"
                            : "bg-[#636CCB]/50 cursor-not-allowed"
                        }`}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedLeave && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#3C467B]/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeave(null)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-[#50589C] border border-[#3C467B] w-[400px] rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl mb-4 text-center font-bold text-white">
                  Leave Details
                </h2>
                <div className="text-white space-y-2">
                  <p>
                    <strong>Leave ID:</strong> {selectedLeave.leaveId}
                  </p>
                  <p>
                    <strong>Title:</strong> {selectedLeave.title}
                  </p>
                  <p>
                    <strong>From:</strong> {selectedLeave.fromDate}
                  </p>
                  <p>
                    <strong>To:</strong> {selectedLeave.toDate}
                  </p>
                  <p>
                    <strong>Reason:</strong> {selectedLeave.reason}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedLeave.description}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${
                        selectedLeave.status === "Pending"
                          ? "text-yellow-400"
                          : selectedLeave.status === "Accepted"
                          ? "text-green-400"
                          : selectedLeave.status === "Rejected"
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {selectedLeave.status}
                    </span>
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setSelectedLeave(null)}
                    className="cursor-pointer px-4 py-2 rounded-lg bg-[#6E8CFB] hover:bg-[#636CCB] text-white font-semibold transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
