import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import EmployeeManagement from "./pages/EmployeeManagement";
import Timesheet from "./pages/Timesheet";
import Orgchart from "./pages/Orgchart";
import Login from './pages/Login';
import LeaveManagement from "./pages/LeaveManagement";
import OnboardEmployee from './pages/OnboardEmployee';
import Profile from "./pages/Profile";
import LeaveSubmission from "./pages/LeaveSubmission";
import LeaveHistory from "./pages/LeaveHistory";
import LogTimeSheet from "./pages/LogTimesheet";

// Enhanced Loader Component
function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="relative w-20 h-20">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 border-4 border-[#3C467B] border-t-[#6E8CFB] rounded-full animate-spin"></div>

        {/* Middle spinning ring slower */}
        <div className="absolute inset-2 border-4 border-[#50589C] border-b-[#636CCB] rounded-full animate-[spin_1s_linear_infinite]"></div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-4 bg-[#6E8CFB] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}


function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const isLoginPage = location.pathname === "/";

  // Trigger loader on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600); // spinner duration increased
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoginPage) {
    return (
      <>
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 h-screen overflow-auto">
          {/* Navbar for mobile */}
          <div className="md:hidden">
            <Navbar />
          </div>

          <main className="px-4 py-6 flex-1">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/employee-management" element={<EmployeeManagement/>}/>
            <Route path="/timesheets" element={<Timesheet/>}/>
            {/* 🎯 UPDATED ROUTE: Changed from /organisation-chart to /orgchart */}
            <Route path="/orgchart" element={<Orgchart/>}/> 
              <Route path="/leave-management" element={<LeaveManagement/>}/>
            <Route path="/onboard" element={<OnboardEmployee/>} />
            <Route path="/profile" element={<Profile />} />
              <Route path="/leave-submission" element={<LeaveSubmission />} />
              <Route path="/leave-history" element={<LeaveHistory />} />
              <Route path="/log-timesheet" element={<LogTimeSheet/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;