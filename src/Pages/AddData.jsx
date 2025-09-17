import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployeeAPI } from "../Services/allApi";
import Swal from "sweetalert2";

function AddData() {
  const [data, setData] = useState({
    username: "",
    email: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddData = async (e) => {
    e.preventDefault();
    // basic validation
    if (!data.username.trim() || !data.email.trim() || !data.status) {
      Swal.fire("Validation", "Please fill all required fields.", "warning");
      return;
    }

    setLoading(true);
    try {
      // Do not send id — let json-server auto-generate it
      await addEmployeeAPI(data);
      await Swal.fire("Success", "Employee added successfully!", "success");
      navigate("/"); // go back to list
    } catch (error) {
      console.error("Add Error:", error);
      Swal.fire("Error", "Failed to add employee.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="p-4 shadow-lg rounded bg-white w-75 w-md-50">
        <h2 className="text-center text-success mb-4">Create Employee</h2>
        <form onSubmit={handleAddData}>
          {/* Username */}
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
          />

          {/* Email */}
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          {/* Status */}
          <label className="form-label">Status</label>
          <select
            className="form-select mb-4"
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Adding..." : "➕ Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddData;
