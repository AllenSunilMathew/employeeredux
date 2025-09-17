import commonAPI from "./commonAPI";

// Add new employee (no id -> json-server will auto-generate)
export const addEmployeeAPI = (employee) => commonAPI("POST", "/employees", employee);

// Get all employees
export const getEmployeesAPI = () => commonAPI("GET", "/employees");

// Edit employee
export const editEmployeeAPI = (id, employee) => commonAPI("PUT", `/employees/${id}`, employee);

// Delete employee
export const deleteEmployeeAPI = (id) => commonAPI("DELETE", `/employees/${id}`);
