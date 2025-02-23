import React from "react";
import EmployeeMenu from "../../Components/Employee/EmployeeMenu/EmployeeMenu";
import Tasks from "../../Components/Employee/Tasks/Tasks";

function EmployeeTasks() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Tasks />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeTasks;
