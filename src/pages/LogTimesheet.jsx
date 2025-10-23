// src/pages/Timesheet.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function Timesheet() {
  const employeeId = useSelector((state) => state.auth?.employeeId);
  const [formData, setFormData] = useState({
    date: "",
    project: "",
    taskDetail: "",
    hoursWorked: "",
    startTime: "",
    endTime: "",
  });
  const [status, setStatus] = useState("");
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);

  const API_URL = `http://localhost:5149/api/Timesheet/employee/${employeeId}`;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      timesheetId: 0,
      employeeId,
      date: formData.date,
      project: formData.project,
      taskDetail: formData.taskDetail,
      hoursWorked: Number(formData.hoursWorked),
      startTime: formData.startTime,
      endTime: formData.endTime,
      status: "Pending",
    };

    try {
      await axios.post("http://localhost:5149/api/Timesheet", payload, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus("Timesheet submitted successfully.");
      setFormData({
        date: "",
        project: "",
        taskDetail: "",
        hoursWorked: "",
        startTime: "",
        endTime: "",
      });
      fetchTimesheets();
    } catch (err) {
      console.error(err);
      setStatus("Error submitting timesheet.");
    }
  };

  const fetchTimesheets = async () => {
    if (!employeeId) return;
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTimesheets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimesheets();
  }, [employeeId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3C467B]/10 via-[#50589C]/10 to-[#636CCB]/10 px-6 py-10">
      {/* Submit Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#3C467B]/10 backdrop-blur-md p-6 rounded-2xl mb-8"
      >
        <h1 className="text-2xl font-bold text-[#3C467B] mb-4">
          Submit Timesheet
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#6E8CFB] bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              Project
            </label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#6E8CFB] bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              Task Detail
            </label>
            <input
              type="text"
              name="taskDetail"
              value={formData.taskDetail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#6E8CFB] bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              Hours Worked
            </label>
            <input
              type="number"
              name="hoursWorked"
              value={formData.hoursWorked}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#6E8CFB] bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#6E8CFB] bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#6E8CFB] bg-white"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-[#6E8CFB] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#636CCB] transition cursor-pointer"
          >
            Submit
          </button>
        </div>

        {status && (
          <p className="mt-2 text-sm text-[#3C467B] text-center font-medium">
            {status}
          </p>
        )}
      </form>

      {/* Timesheet History */}
      <div className="bg-white/10 backdrop-blur-md border border-[#50589C] rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-[#3C467B] mb-4">
          Timesheet History
        </h2>
        {loading ? (
          <p className="text-center text-[#3C467B]">Loading...</p>
        ) : timesheets.length === 0 ? (
          <p className="text-center text-[#3C467B]">No timesheets found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[#3C467B] border-collapse">
              <thead className="bg-[#50589C]/20">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Project</th>
                  <th className="p-3">Task Detail</th>
                  <th className="p-3">Hours</th>
                  <th className="p-3">Start</th>
                  <th className="p-3">End</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {timesheets.map((ts) => (
                  <tr
                    key={ts.timesheetId}
                    className="border-b border-[#636CCB]/30 hover:bg-[#6E8CFB]/10 transition cursor-pointer"
                    onClick={() => setSelectedTimesheet(ts)}
                  >
                    <td className="p-3">{ts.timesheetId}</td>
                    <td className="p-3">{ts.date}</td>
                    <td className="p-3">{ts.project}</td>
                    <td className="p-3">{ts.taskDetail}</td>
                    <td className="p-3">{ts.hoursWorked}</td>
                    <td className="p-3">{ts.startTime}</td>
                    <td className="p-3">{ts.endTime}</td>
                    <td className="p-3">{ts.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTimesheet && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTimesheet(null)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-white/20 dark:bg-[#3C467B]/90 backdrop-blur-md border border-[#50589C] w-[400px] rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl mb-4 text-center font-semibold text-[#3C467B]">
                  Timesheet Details
                </h2>
                <div className="text-[#3C467B] space-y-2">
                  <p><strong>ID:</strong> {selectedTimesheet.timesheetId}</p>
                  <p><strong>Date:</strong> {selectedTimesheet.date}</p>
                  <p><strong>Project:</strong> {selectedTimesheet.project}</p>
                  <p><strong>Task Detail:</strong> {selectedTimesheet.taskDetail}</p>
                  <p><strong>Hours Worked:</strong> {selectedTimesheet.hoursWorked}</p>
                  <p><strong>Start Time:</strong> {selectedTimesheet.startTime}</p>
                  <p><strong>End Time:</strong> {selectedTimesheet.endTime}</p>
                  <p><strong>Status:</strong> {selectedTimesheet.status}</p>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setSelectedTimesheet(null)}
                    className="px-4 py-2 rounded-lg bg-[#6E8CFB] hover:bg-[#636CCB] text-white font-semibold cursor-pointer"
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
