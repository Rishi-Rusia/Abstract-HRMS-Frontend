import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import EmployeeManagement from "./pages/EmployeeManagement";
import LeaveManagement from "./pages/LeaveManagement";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  // Layout shown only after login
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }

  // Main layout for authenticated pages
  return (
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

        <main className="px-4 py-6">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/employee-management" element={<EmployeeManagement />} />
            <Route path="/leave-management" element={<LeaveManagement />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
