import React from "react";
import ManagerMenu from "../../components/Manager/ManagerMenu/ManagerMenu";
import OrderStepper from "../../components/Admin/NewOrder/OrderStepper";
function NewOrderManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <OrderStepper />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewOrderManager;
