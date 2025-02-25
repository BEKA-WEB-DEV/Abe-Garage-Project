import React, { useState } from 'react';
import "./adminMenu.css";

function AdminMenu() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // If you have a global dark-mode approach, call it here
  };

  return (
    <div className={`sidebar-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar Title/Logo */}
      {/* <div className="sidebar-logo">
        Admin Menu
      </div> */}

      {/* Menu Links */}
      <div className="sidebar-menu">
        <a href="/admin" className="sidebar-link">
          <i className="fa fa-tachometer icon" aria-hidden="true"></i>
          <span>Dashboard</span>
        </a>
        <a href="/admin/orders" className="sidebar-link">
          <i className="fa fa-shopping-cart icon" aria-hidden="true"></i>
          <span>Orders</span>
        </a>
        <a href="/admin/order" className="sidebar-link">
          <i className="fa fa-plus icon" aria-hidden="true"></i>
          <span>New Order</span>
        </a>
        <a href="/admin/add-employee" className="sidebar-link">
          <i className="fa fa-user-plus icon" aria-hidden="true"></i>
          <span>Add Employee</span>
        </a>
        <a href="/admin/employees" className="sidebar-link">
          <i className="fa fa-users icon" aria-hidden="true"></i>
          <span>Employees</span>
        </a>
        <a href="/admin/add-customer" className="sidebar-link">
          <i className="fa fa-user-plus icon" aria-hidden="true"></i>
          <span>Add Customer</span>
        </a>
        <a href="/admin/customers" className="sidebar-link">
          <i className="fa fa-users icon" aria-hidden="true"></i>
          <span>Customers</span>
        </a>
        <a href="/admin/services" className="sidebar-link">
          <i className="fa fa-cogs icon" aria-hidden="true"></i>
          <span>Services</span>
        </a>
      </div>

      {/* Footer (Dark Mode Toggle, etc.) */}
      <div className="sidebar-footer">
        <label className="toggle-label">
          Dark Mode
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
          <span className="toggle-switch"></span>
        </label>
      </div>
    </div>
  );
}

export default AdminMenu;
