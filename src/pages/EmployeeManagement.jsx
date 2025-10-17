import React, { useState, useEffect } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

// Dummy employee data
const dummyEmployees = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", department: "Engineering", title: "Software Engineer" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", department: "HR", title: "HR Manager" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", department: "Sales", title: "Sales Executive" },
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", department: "", title: "" });

  useEffect(() => {
    // Simulate fetch
    setEmployees(dummyEmployees);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      title: employee.title
    });
  };

  const handleSave = () => {
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? { ...editingEmployee, ...formData } : emp
    ));
    setEditingEmployee(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>

      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Department</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.email}</td>
              <td className="px-4 py-2">{emp.department}</td>
              <td className="px-4 py-2">{emp.title}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button 
                  onClick={() => handleEdit(emp)} 
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <HiOutlinePencil size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(emp.id)} 
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

            <div className="flex flex-col space-y-3">
              <input 
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="border px-3 py-2 rounded-md w-full"
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="border px-3 py-2 rounded-md w-full"
              />
              <input 
                type="text" 
                placeholder="Department" 
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
                className="border px-3 py-2 rounded-md w-full"
              />
              <input 
                type="text" 
                placeholder="Title" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button 
                onClick={() => setEditingEmployee(null)} 
                className="px-4 py-2 rounded-md border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
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
