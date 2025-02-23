import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerEdit from "../../components/Admin/CusromerEdit/CustomerEdit";

function ManageCustomer() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerEdit />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCustomer;
