import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

import StatsDashboard from "../../components/StatsDashboard/StatsDashboard";
import "./Addcustomer.css";
function AdminDashbord() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side ">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side p-0 m-0">
            <StatsDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashbord;
