import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import ItemList from "../../components/Admin/ItemList/ItemList";

function Items() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ItemList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;
