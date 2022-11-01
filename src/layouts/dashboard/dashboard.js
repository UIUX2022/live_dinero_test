import React from "react";
import "./dashboard.scss";
import AdminSidebar from "../../components/adminSideBar/adminSideBar";
import Header from "../../components/header/header";

const Adminlayout = ({ pagename, children }) => {
  return (
    <div>
      <Header />
      <div className="admin_layout container">
        <div className="row">
          <div className="col-12">
            <div class="adminPanel py-4">
              <AdminSidebar />
              <div className="layoutChild">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Adminlayout;
