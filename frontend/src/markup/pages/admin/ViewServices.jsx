import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import ServiceManagment from "../../components/Admin/ServiceManagment/ServiceManagment";

function ViewServices() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ServiceManagment />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewServices;
