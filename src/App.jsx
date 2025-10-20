import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import EmployeeManagement from "./pages/EmployeeManagement";
import Timesheet from "./pages/Timesheet";
import Orgchart from "./pages/Orgchart";

function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 z-[100]">
        <Sidebar />
      </div>

      {/* Main content scrollable independently */}
      <div className="flex flex-col flex-1 h-screen overflow-auto">
        {/* Navbar for mobile/tablet */}
        <div className="md:hidden">
          <Navbar />
        </div>

        <main className="px-4 py-6 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/employee-management" element={<EmployeeManagement/>}/>
            <Route path="/timesheets" element={<Timesheet/>}/>
            {/* 🎯 UPDATED ROUTE: Changed from /organisation-chart to /orgchart */}
            <Route path="/orgchart" element={<Orgchart/>}/> 
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;