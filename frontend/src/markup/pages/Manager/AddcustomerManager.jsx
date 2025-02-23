import React from "react";
import ManagerMenu from "../../components/Manager/ManagerMenu/ManagerMenu";
import AddCustomerForm from "../../components/Admin/AddCustomer/AddCustomerForm";

function AddcustomerManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddCustomerForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddcustomerManager;
