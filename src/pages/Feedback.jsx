import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineChatAlt2,
  HiOutlineUserCircle,
  HiOutlineClock,
} from "react-icons/hi";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Dummy feedback data (9 entries)
    setFeedbacks([
      {
        id: 1,
        manager: "Anita Verma",
        message:
          "Excellent work on the HR portal revamp. Your UI improvements have made it much more intuitive.",
        date: "2025-10-21",
      },
      {
        id: 2,
        manager: "Rohit Singh",
        message:
          "You’ve shown great ownership in managing backend bugs under tight deadlines. Keep it up.",
        date: "2025-10-19",
      },
      {
        id: 3,
        manager: "Priya Menon",
        message:
          "Your problem-solving during the last sprint was impressive. Would love to see more initiative during planning sessions.",
        date: "2025-10-15",
      },
      {
        id: 4,
        manager: "Arjun Patel",
        message:
          "Strong debugging skills and reliable under pressure. Try to communicate blockers a bit earlier next time.",
        date: "2025-10-12",
      },
      {
        id: 5,
        manager: "Neha Sharma",
        message:
          "Your attention to detail during testing prevented multiple release issues. Keep applying that same focus.",
        date: "2025-10-10",
      },
      {
        id: 6,
        manager: "Vikram Das",
        message:
          "Appreciate your proactive approach in taking up the migration task. Shows great ownership of your role.",
        date: "2025-10-08",
      },
      {
        id: 7,
        manager: "Meena Rao",
        message:
          "Loved how you collaborated with the design team for consistent UX. Maintain that cross-functional attitude.",
        date: "2025-10-06",
      },
      {
        id: 8,
        manager: "Karan Bansal",
        message:
          "Quick learner. You adapted to new tech stacks faster than expected and delivered solid results.",
        date: "2025-10-03",
      },
      {
        id: 9,
        manager: "Divya Kapoor",
        message:
          "Good communication and composure during review meetings. Continue building that leadership presence.",
        date: "2025-09-30",
      },
    ]);
  }, []);

  return (
    <div className="mt-10 md:mt-0  p-6">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#636CCB] mb-6 text-center"
      >
        Feedback
      </motion.h1>

      {/* Feedback List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb, index) => (
          <motion.div
            key={fb.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-5 border border-[#e1e4ff] hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <HiOutlineUserCircle className="text-[#636CCB] text-3xl" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {fb.manager}
                </h2>
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <HiOutlineClock />
                  <span>{fb.date}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <HiOutlineChatAlt2 className="text-[#636CCB] text-2xl mt-1" />
              <p className="text-gray-700 leading-relaxed">{fb.message}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {feedbacks.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 mt-10"
        >
          No feedback available yet.
        </motion.p>
      )}
    </div>
  );
}
