import "./adminSideBar.scss";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
const AdminSidebar = () => {
  const local = useLocation(AdminSidebar);
  return (
    <div className="sidebar">
      <div className="userProfile">
        <img src="/img/profileUser.png" alt="pic" />
        <div>
          <h6>Ahmad Nur Fawaid</h6>
          <p>ahmadnur@gmail.com</p>
        </div>
      </div>
      <ul className="my-3 sideBar-menu">
        <li
          className={`sideBarLink ${
            local.pathname == "/user/profile/setting" ? " active" : " "
          }`}
        >
          <Link to="/user/profile/setting">
            <Icon icon="carbon:user-avatar-filled" />
            <span>Profile</span>
          </Link>
        </li>
        <li className={`sideBarLink ${
            local.pathname == "/user/services" ? " active" : " "
          }`}>
          <Link to="/user/services">
            <Icon icon="entypo:tools" />
            <span>Ads</span>
          </Link>
        </li>
        <li className={`sideBarLink ${
            local.pathname == "/user/create/services" ? " active" : " "
          }`}>
          <Link to="/user/create/services">
            <Icon icon="teenyicons:search-property-solid" />
            <span>Create Ad</span>
          </Link>
        </li>
        <li className="sideBarLink">
          <Link to="/">
            <Icon icon="icon-park-outline:transaction-order" />
            <span>Orders</span>
          </Link>
        </li>
        <li className="sideBarLink">
          <Link to="/">
            <Icon icon="entypo:wallet" />
            <span>Wallet</span>
          </Link>
          <li className="sideBarLink">
            <Link to="/">
              <Icon icon="fa-solid:address-card" />
              <span>Addresses </span>
            </Link>
          </li>
          <li className="sideBarLink">
            <Link to="/">
              <Icon icon="clarity:notification-solid-badged" />
              <span>Notifications</span>
            </Link>
          </li>
          <li className="sideBarLink">
            <Link to="/">
              <Icon icon="ant-design:customer-service-twotone" />
              <span>Customer Care </span>
            </Link>
          </li>
          <li className="sideBarLink">
            <Link to="/">
              <Icon icon="clarity:settings-solid-badged" />
              <span>Settings</span>
            </Link>
          </li>
          <li className="sideBarLink">
            <Link to="/">
              <Icon icon="ant-design:logout-outlined" />
              <span>Log Out </span>
            </Link>
          </li>
        </li>
      </ul>
    </div>
  );
};
export default AdminSidebar;
