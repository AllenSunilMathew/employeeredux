import React, { useEffect, useState } from "react";
import { getEmployeesAPI, addEmployeeAPI, editEmployeeAPI, deleteEmployeeAPI } from "../Services/allApi";
import Swal from "sweetalert2";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ id: "", username: "", email: "", status: "Active" });
  const [editId, setEditId] = useState(null); // track which employee is being edited

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await getEmployeesAPI();
      setEmployees(res);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "❌ Failed to fetch employees.", "error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await addEmployeeAPI(formData);
      Swal.fire("Success", "✅ Employee added successfully!", "success");
      setFormData({ id: "", username: "", email: "", status: "Active" });
      fetchEmployees();
    } catch (error) {
      Swal.fire("Error", "❌ Failed to add employee.", "error");
    }
  };

  // Save edits for inline edit
  const handleSaveEdit = async (emp) => {
    try {
      await editEmployeeAPI(emp.id, emp);
      Swal.fire("Updated", "✅ Employee updated successfully!", "success");
      setEditId(null);
      fetchEmployees();
    } catch (error) {
      Swal.fire("Error", "❌ Failed to update employee.", "error");
    }
  };

  // Delete employee
  const handleDelete = async (emp) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete employee: ${emp.username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteEmployeeAPI(emp.id); // always pass the original ID from employee object
      Swal.fire("Deleted!", "🗑️ Employee removed successfully.", "success");
      fetchEmployees();
    } catch (error) {
      Swal.fire("Error", "❌ Failed to delete employee.", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Employee Management</h2>

      {/* Add Employee Form */}
      <form onSubmit={handleAddEmployee} className="mb-5">
        <div className="row g-3">
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="ID"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: Number(e.target.value) })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">➕ Add</button>
          </div>
        </div>
      </form>

      {/* Employees Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                {editId === emp.id ? (
                  <>
                    {/* Inline edit fields */}
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={emp.id}
                        disabled // keep ID fixed to avoid delete issues
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={emp.username}
                        onChange={(e) =>
                          setEmployees(
                            employees.map((item) =>
                              item.id === emp.id ? { ...item, username: e.target.value } : item
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        className="form-control"
                        value={emp.email}
                        onChange={(e) =>
                          setEmployees(
                            employees.map((item) =>
                              item.id === emp.id ? { ...item, email: e.target.value } : item
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={emp.status}
                        onChange={(e) =>
                          setEmployees(
                            employees.map((item) =>
                              item.id === emp.id ? { ...item, status: e.target.value } : item
                            )
                          )
                        }
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSaveEdit(emp)}>
                        💾 Save
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                        ❌ Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Normal row */}
                    <td>{emp.id}</td>
                    <td>{emp.username}</td>
                    <td>{emp.email}</td>
                    <td>{emp.status}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => setEditId(emp.id)}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* About Section */}
      <div className="card shadow-lg border-0 p-4 mt-5">
        <h2 className="text-center text-primary mb-3">About Employee Management App</h2>
        <p>
          The <strong>Employee Management App</strong> is a simple and efficient tool
          designed to help organizations manage their workforce effectively.
        </p>
        <ul>
          <li>
            <strong>Add Employees:</strong> Register new employees with username, email, and status.
          </li>
          <li>
            <strong>View Employees:</strong> Display all employees in a structured table.
          </li>
          <li>
            <strong>Edit Employee Details:</strong> Update existing records inline.
          </li>
          <li>
            <strong>Delete Employees:</strong> Remove employees safely with confirmation.
          </li>
        </ul>
        <p>
          Built using <strong>React</strong> frontend and <strong>JSON Server</strong> backend, demonstrating
          <strong> CRUD operations</strong> in a clean interface.
        </p>
      </div>
    </div>
  );
}

export default Home;
