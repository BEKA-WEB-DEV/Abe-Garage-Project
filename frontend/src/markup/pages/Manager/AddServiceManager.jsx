import React from "react";
import ManagerMenu from "../../components/Manager/ManagerMenu/ManagerMenu";
import ServiceManagment from "../../components/Admin/ServiceManagment/ServiceManagment";
function AddServiceManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ServiceManagment />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddServiceManager;
