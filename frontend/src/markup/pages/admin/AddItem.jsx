import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddItemForm from "../../components/Admin/AddItem/AddItemForm";

function AddItem() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <AddItemForm />
        </div>
      </div>
    </div>
  );
}

export default AddItem;
