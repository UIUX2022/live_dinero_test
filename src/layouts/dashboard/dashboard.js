import React from "react";
import "./dashboard.scss";
import AdminSidebar from "../../components/adminSideBar/adminSideBar";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import MainMenu from "../../components/menuBar/menuBar";

const Adminlayout = ({ pagename, children }) => {
  return (
    <div>
      <Header />
      <MainMenu />
      <div className="admin_layout container">
        <div className="row">
          <div className="col-12">
            <div className="adminPanel py-4">
              <AdminSidebar />
              <div className="layoutChild">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Adminlayout;
