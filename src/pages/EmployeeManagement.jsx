import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineSearch } from "react-icons/hi";
import Select from "react-select";
import { fetchEmployees, deleteEmployee, updateEmployee } from "../redux/employeeSlice";

export default function EmployeeManagement() {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employees);
  const { department: userDept, isAdmin } = useSelector((state) => state.auth);

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [filters, setFilters] = useState({ name: "", email: "", department: "", isAdmin: "" });

  const gradientHeader = "bg-gradient-to-r from-[#3C467B] via-[#50589C] to-[#636CCB]";

  // ===== Fetch employees =====
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // ===== Apply filters =====
  useEffect(() => {
    let result = employees;
    if (!isAdmin) result = result.filter((emp) => emp.department === userDept);

    result = result.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        emp.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        emp.department.toLowerCase().includes(filters.department.toLowerCase()) &&
        (filters.isAdmin === "" || emp.isAdmin === (filters.isAdmin === "true"))
      );
    });

    setFilteredEmployees(result);
  }, [filters, employees, isAdmin, userDept]);

  // ===== CRUD =====
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({ ...employee });
  };

  const handleSave = () => {
    dispatch(updateEmployee({ id: editingEmployee.employeeId, employee: formData }));
    setEditingEmployee(null);
  };

  return (
    <div className="mt-10 md:mt-0 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#3C467B]">Employee Management</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-[#3C467B] flex items-center gap-2">
          <HiOutlineSearch size={20} /> Search Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
          />
          <input
            type="text"
            placeholder="Search by email"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
          />
          <input
            type="text"
            placeholder="Search by department"
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            disabled={!isAdmin}
            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#636CCB] ${
              !isAdmin ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
          <select
            value={filters.isAdmin}
            onChange={(e) => setFilters({ ...filters, isAdmin: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
          >
            <option value="">All Roles</option>
            <option value="true">Admins</option>
            <option value="false">Employees</option>
          </select>
        </div>
      </div>

      {/* Employee Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => {
            const avatarUrl = `https://avatar.iran.liara.run/public/${emp.employeeId}`;
              // const avatarUrl = `https://i.pravatar.cc/40`;

            // Map junior IDs to names
            const juniorNames =
              emp.myJuniors && emp.myJuniors.length > 0
                ? emp.myJuniors
                    .map((id) => employees.find((e) => e.employeeId === id)?.name)
                    .filter(Boolean)
                    .join(", ")
                : "None";

            return (
              <div
                key={emp.employeeId}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={avatarUrl}
                    alt={emp.name}
                    className="w-16 h-16 rounded-full border-2 border-[#636CCB]"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-[#3C467B]">{emp.name}</h3>
                    <p className="text-gray-600">{emp.email}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Employee ID:</strong> {emp.employeeId}
                    </p>
                  </div>
                </div>

                <p className="text-sm mt-1 text-gray-500">
                  <strong>Department:</strong> {emp.department}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  <strong>Role:</strong> {emp.isAdmin ? "Admin" : "Employee"}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  <strong>Manager ID:</strong> {emp.managerId}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  <strong>Juniors:</strong> {juniorNames}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  <strong>Total Leaves:</strong> {emp.totalLeaves}
                </p>

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="px-3 py-1.5 rounded-md bg-[#E8EBFF] text-[#3C467B] hover:bg-[#D8DCFF] transition"
                    title="Edit"
                  >
                    <HiOutlinePencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(emp.employeeId)}
                    className="px-3 py-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-[#3C467B] mb-4">Edit Employee</h2>

            <div className="flex flex-col space-y-4">
              {/* Editable fields */}
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
              />

              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
              />

              <label className="text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                value={formData.department || ""}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
              />

              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                value={formData.isAdmin ? "true" : "false"}
                onChange={(e) =>
                  setFormData({ ...formData, isAdmin: e.target.value === "true" })
                }
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
              >
                <option value="false">Employee</option>
                <option value="true">Admin</option>
              </select>

              <label className="text-sm font-medium text-gray-700">Employee ID</label>
              <input
                type="number"
                value={formData.employeeId || ""}
                onChange={(e) => setFormData({ ...formData, employeeId: Number(e.target.value) })}
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
              />

              <label className="text-sm font-medium text-gray-700">Manager ID</label>
              <input
                type="number"
                value={formData.managerId || 0}
                onChange={(e) => setFormData({ ...formData, managerId: Number(e.target.value) })}
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
              />

              <label className="text-sm font-medium text-gray-700">Juniors</label>
              <Select
                isMulti
                options={employees
                  .filter((emp) => emp.employeeId !== formData.employeeId)
                  .map((emp) => ({ value: emp.employeeId, label: emp.name }))}
                value={employees
                  .filter((emp) => formData.myJuniors?.includes(emp.employeeId))
                  .map((emp) => ({ value: emp.employeeId, label: emp.name }))}
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    myJuniors: selectedOptions.map((opt) => opt.value),
                  })
                }
                className="basic-multi-select"
                classNamePrefix="select"
              />

              <label className="text-sm font-medium text-gray-700">Total Leaves</label>
              <input
                type="number"
                value={formData.totalLeaves || 0}
                onChange={(e) =>
                  setFormData({ ...formData, totalLeaves: Number(e.target.value) })
                }
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#636CCB]"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingEmployee(null)}
                className="px-5 py-2 rounded-md border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`${gradientHeader} text-white px-5 py-2 rounded-md hover:opacity-90 transition`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
