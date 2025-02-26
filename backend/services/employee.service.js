// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");

// Function to generate a unique employee ID starting with 'EMP'
const generateEmployeeId = () => {
  // Generate an ID using Date.now() and a random number; adjust this logic as needed.
  return 'EMP' + Date.now() + Math.floor(Math.random() * 1000);
};

// A function to check if an employee exists in the database by email
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ?";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  return rows.length > 0;
}

// A function to create a new employee with an ID that starts with "EMP"
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // Generate a unique employee ID with the EMP prefix
    const employee_id = generateEmployeeId();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // Insert the employee record with the custom employee_id
    const query =
      "INSERT INTO employee (employee_id, employee_email, active_employee) VALUES (?, ?, ?)";
    const rows = await conn.query(query, [
      employee_id,
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Insert the remaining data into employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    await conn.query(query3, [employee_id, hashedPassword]);

    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);

    // Construct the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return createdEmployee;
}

// A function to get an employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}

// A function to get all employees (example: the latest 10)
async function getAllEmployees() {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC LIMIT 10";
  const rows = await conn.query(query);
  return rows;
}

// A function to get a single employee by ID
async function getEmployeeById(employee_id) {
  const query =
    "SELECT employee.employee_email, employee.active_employee, employee_info.employee_first_name, employee_info.employee_last_name, employee_info.employee_phone, company_roles.company_role_id FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee.employee_id = ?";
  const rows = await conn.query(query, [employee_id]);
  return rows;
}

// A function to delete an employee by ID (cascading deletes in related tables)
async function deleteEmployeeById(employee_id) {
  await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [
    employee_id,
  ]);
  await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [
    employee_id,
  ]);
  await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [
    employee_id,
  ]);
  await conn.query("DELETE FROM employee WHERE employee_id = ?", [employee_id]);
  return true;
}

// A function to edit/update employee details
const editEmployee = async (employee) => {
  console.log(employee);
  let updatedEmployee = {};

  const salt = await bcrypt.genSalt(10);
  let hashedPassword = null;
  if (employee.employee_password && employee.employee_password.length > 2) {
    hashedPassword = await bcrypt.hash(employee.employee_password, salt);
  }

  if (employee.employee_email || employee.active_employee) {
    const employeeQuery = `
        UPDATE employee
        SET 
          ${employee.employee_email ? "employee_email = ?," : ""}
          ${employee.active_employee ? "active_employee = ?" : ""}
        WHERE
          employee_id = ?
      `;
    const queryParams = [
      employee.employee_email,
      employee.active_employee,
      employee.employee_id,
    ].filter((param) => param !== undefined);

    await conn.query(employeeQuery, queryParams);
  }

  if (employee.employee_phone) {
    const employeeInfoQuery = `
        UPDATE employee_info
        SET 
          employee_phone = ?
        WHERE
          employee_id = ?
      `;
    const queryParams = [employee.employee_phone, employee.employee_id];
    await conn.query(employeeInfoQuery, queryParams);
  }

  if (hashedPassword) {
    const employeePassQuery = `
        UPDATE employee_pass
        SET 
          employee_password_hashed = ?
        WHERE
          employee_id = ?
      `;
    await conn.query(employeePassQuery, [hashedPassword, employee.employee_id]);
  }

  if (employee.company_role_id) {
    const employeeRoleQuery = `
        UPDATE employee_role
        SET 
          company_role_id = ?
        WHERE
          employee_id = ?
      `;
    await conn.query(employeeRoleQuery, [
      employee.company_role_id,
      employee.employee_id,
    ]);
  }

  updatedEmployee = {
    employee_id: employee.employee_id,
    employee_email: employee.employee_email,
    employee_phone: employee.employee_phone,
    active_employee: employee.active_employee,
    company_role_id: employee.company_role_id,
  };
  return updatedEmployee;
};

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  editEmployee,
};
