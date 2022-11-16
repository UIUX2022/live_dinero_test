import "./adminSideBar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, addtoken } from "../../redux/actions";
import axios from "axios";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);
  const local = useLocation(AdminSidebar);
  const getjwtToken = "bearer-" + token;
  const logOut = async () => {
    dispatch(addUser({}));
    dispatch(addtoken(""));
    navigation("/");
    await axios
      .post(
        "auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        console.log("log out response is", resp);
        if (resp.data.status == 200) {
          dispatch(addUser({}));
          dispatch(addtoken(""));
        }
      })
      .catch((error) => {
        console.log("logout Api error is", error);
      });
  };

  return (
    <div className="sidebar">
      <div className="userProfile">
        <img src="/img/profileUser.png" alt="pic" />
        <div>
          <h6>{user.name}</h6>
          <p>{user.email}</p>
        </div>
      </div>
      <ul className="my-3 sideBar-menu">
        <li
          className={`sideBarLink px-2 ${
            local.pathname == "/user/profile/setting" ? " active" : " "
          }`}
        >
          <Link to="/user/profile/setting">
            <Icon icon="carbon:user-avatar-filled" />
            <span>Profile</span>
          </Link>
        </li>
        <li
          className={`sideBarLink px-2 ${
            local.pathname == "/user/services" ? " active" : " "
          }`}
        >
          <Link to="/user/services">
            <Icon icon="entypo:tools" />
            <span>Ads</span>
          </Link>
        </li>
        <li
          className={`sideBarLink px-2 ${
            local.pathname == "/user/create/services" ? " active" : " "
          }`}
        >
          <Link to="/user/create/services">
            <Icon icon="uil:create-dashboard" />
            <span>Create Ad</span>
          </Link>
        </li>

        <li className="sideBarLink px-2">
          <Link to="/">
            <Icon icon="clarity:notification-solid-badged" />
            <span>Notifications</span>
          </Link>
        </li>
        <li className="sideBarLink px-2">
          <Link to="/">
            <Icon icon="ant-design:customer-service-twotone" />
            <span>Customer Care </span>
          </Link>
        </li>
        <li className="sideBarLink px-2">
          <Link to="/user/restPassword">
            <Icon icon="clarity:settings-solid-badged" />
            <span>Reset Password</span>
          </Link>
        </li>
        <li className="sideBarLink px-2 logou_out_item" onClick={logOut}>
          <a>
            <Icon icon="ant-design:logout-outlined" />
            <span>Log Out </span>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default AdminSidebar;
