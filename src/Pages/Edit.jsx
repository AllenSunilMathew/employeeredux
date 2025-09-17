import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editEmployeeAPI, getEmployeesAPI } from "../Services/allApi";
import Swal from "sweetalert2";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showData, setShowData] = useState({
    id: "",
    username: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await getEmployeesAPI();
        // Fix: id from params is string, convert both to number for comparison
        const employee = employees.find((emp) => emp.id === Number(id));
        if (employee) setShowData(employee);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "❌ Failed to fetch employee.", "error");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      await editEmployeeAPI(showData.id, showData);
      Swal.fire("Success", "✅ Employee updated successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "❌ Failed to update employee.", "error");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="p-4 shadow-lg rounded bg-white w-75 w-md-50">
        <h2 className="text-center text-primary mb-4">Edit Employee</h2>
        <form onSubmit={handleUpdateData}>
          {/* Employee ID (now editable) */}
          <label className="form-label">Employee ID</label>
          <input
            type="number"
            className="form-control mb-3"
            value={showData.id}
            onChange={(e) => setShowData({ ...showData, id: Number(e.target.value) })}
          />

          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control mb-3"
            value={showData.username}
            onChange={(e) => setShowData({ ...showData, username: e.target.value })}
          />

          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            value={showData.email}
            onChange={(e) => setShowData({ ...showData, email: e.target.value })}
          />

          <label className="form-label">Status</label>
          <select
            className="form-select mb-4"
            value={showData.status}
            onChange={(e) => setShowData({ ...showData, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" className="btn btn-primary w-100">
            🔄 Update Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
