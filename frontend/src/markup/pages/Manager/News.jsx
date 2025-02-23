import React from "react";
import ManagerMenu from "../../components/Manager/ManagerMenu/ManagerMenu";
import NewsForm from "../../components/News/NewsForm";
function News() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <NewsForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
