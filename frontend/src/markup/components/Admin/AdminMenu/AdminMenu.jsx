import React from "react";
import { Link } from "react-router-dom";
import "./adminMenu.css";

function AdminMenu() {
  return (
    <div className="admin-position">
      
      <div className='admin-menu'>
        <h2>Admin Menu</h2>
      </div>
      <div className='list-group'>
        <Link to={"/admin"} className='list-group-item'>
        <i className="fa fa-tachometer icon" aria-hidden="true"></i>
        <span>Dashboard</span>
        </Link>
        <Link to={"/admin/order/orders"} className='list-group-item'>
        <i className="fa fa-shopping-cart icon" aria-hidden="true"></i>
        <span>Orders</span>
        </Link>
        <Link to={"/admin/order/new-order"} className='list-group-item'>
        <i className="fa fa-plus icon" aria-hidden="true"></i>
        <span>New Order</span>
        </Link>
        <Link to={"/admin/employee/add-employee"} className='list-group-item'>
        <i className="fa fa-user-plus icon" aria-hidden="true"></i>
        <span>Add Employee</span>
        </Link>
        <Link to={"/admin/employee/employees"} className='list-group-item'>
        <i className="fa fa-users icon" aria-hidden="true"></i>
        <span>Employees</span>
        </Link>
        <Link to={"/admin/customer/add-customer"} className='list-group-item'>
        <i className="fa fa-user-plus icon" aria-hidden="true"></i>
        <span>Add Customer</span>
        </Link>
        <Link to={"/admin/customer/customers"} className='list-group-item'>
        <i className="fa fa-users icon" aria-hidden="true"></i>
        <span>Customers</span>
        </Link>
        <Link to={"/admin/services/services"} className='list-group-item'>
        <i className="fa fa-cogs icon" aria-hidden="true"></i>
        <span>Services</span>
        </Link>
      </div>
    </div>
  );
}

export default AdminMenu;
