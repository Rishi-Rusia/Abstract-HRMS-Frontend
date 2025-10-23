// src/pages/LeaveSubmission.jsx
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LeaveSubmission() {
  const employeeId = useSelector((state) => state.auth?.employeeId);
  const [formData, setFormData] = useState({
    title: "",
    fromDate: "",
    toDate: "",
    reason: "",
    description: "",
  });
  const [status, setStatus] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const isWeekend = (dateStr) => {
    const day = new Date(dateStr).getDay();
    return day === 0 || day === 6;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fromDate" || name === "toDate") {
      const selected = new Date(value);
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      if (selected < now) {
        alert("Past dates are disabled.");
        return;
      }

      if (isWeekend(value)) {
        alert("Saturday and Sunday are not selectable.");
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { leaveId: 0, employeeId, ...formData, status: "pending" };

    try {
      await axios.post("http://localhost:5149/api/Leave", payload, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus("Leave request submitted successfully.");
      setFormData({
        title: "",
        fromDate: "",
        toDate: "",
        reason: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Error submitting leave request.");
    }
  };

  return (
    <div className="mt-10 md:mt-0 flex-1 min-h-screen from-[#3C467B]/20 via-[#50589C]/20 to-[#636CCB]/20 px-6 py-10">
      <h1 className="text-3xl font-bold text-[#3C467B] mb-8 tracking-wide">
        Apply Leave
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-[#50589C]/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#636CCB] bg-white transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              Reason
            </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full border border-[#50589C]/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#636CCB] bg-white transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              min={today}
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="w-full border border-[#50589C]/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#636CCB] bg-white transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              min={today}
              value={formData.toDate}
              onChange={handleChange}
              required
              className="w-full border border-[#50589C]/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#636CCB] bg-white transition shadow-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#3C467B] mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-[#50589C]/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#636CCB] bg-white transition shadow-sm"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-[#6E8CFB] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-[#636CCB] transition cursor-pointer"
          >
            Submit
          </button>
        </div>

        {status && (
          <p className="mt-4 text-center text-sm font-medium text-[#3C467B]">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
