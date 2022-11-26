import "./header.scss";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../images/logo.png";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoader,
  endLoader,
  addUser,
  addtoken,
} from "../../redux/actions/index";
import { Button, Dropdown, Menu } from "antd";

const Header = () => {
  const navigation = useNavigate();
  const local = useLocation();
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("mail");
  const [services, setServices] = useState(null);
  const [searchValue, SetSearchValue] = useState("");
  // ==============================================
  // Post Api for logout
  // ==============================================
  const logOut = async () => {
    dispatch(startLoader());
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
        if (resp.data.status == 200) {
          dispatch(addUser({}));
          dispatch(addtoken(""));
          navigation("/");
        }
      })
      .catch((error) => {
        console.log("logout successful ", error.response);
        if (error.response.status == 401) {
          dispatch(addUser({}));
          dispatch(addtoken(""));
          navigation("/");
        }
      });
    dispatch(endLoader());
  };
  const menu = (
    <Menu>
      <Menu.Item icon={<Icon icon="carbon:user-avatar-filled" />}>
        <Link to="/user/profile/setting">&nbsp;{user.name} Profile</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="entypo:tools" />}>
        <Link to="/user/ads">&nbsp;Ads</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="teenyicons:search-property-solid" />}>
        <Link to="/user/create/services">&nbsp;Create Ad</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="mdi:like-outline" />}>
        <Link to="/user/LikedADs">&nbsp;Liked Ads</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="material-symbols:flag-circle-outline" />}>
        <Link to="/user/reportedADs">&nbsp;Reportd Ads</Link>
      </Menu.Item>
      {/* <Menu.Item icon={<Icon icon="clarity:notification-solid-badged" />}>
        <Link to="/profile/my-question">&nbsp;Notifications</Link>
      </Menu.Item> */}
      <Menu.Item
        icon={<Icon icon="clarity:settings-solid-badged" className="log_out" />}
      >
        <Link to="/user/restPassword">&nbsp;Reset Password</Link>
      </Menu.Item>
      <Menu.Item
        danger
        icon={<Icon icon="ant-design:logout-outlined" />}
        onClick={logOut}
      >
        &nbsp;Logout
      </Menu.Item>
    </Menu>
  );
  // ==============================================================
  // Post Api for Search
  // ===============================================================
  const submitSearch = (event) => {
    SetSearchValue("");
    event.preventDefault();
  };
  return (
    <div className="header_section px-1 px-md-5">
      <div className="container-fuild py-1 mx-auto">
        <div className="d-flex justify-content-between align-items-center">
          <div className="header_logo py-2">
            <Link to="/">
              <img src={Logo} width="100" />
            </Link>
          </div>
          <div className="searchBar px-5">
            <form className="search_barInput" onSubmit={submitSearch}>
              <input
                className="form-control"
                placeholder="Find Your Near By"
                onChange={(e) => SetSearchValue(e.target.value)}
                value={searchValue}
                required
              />
              <button className="search_btn">
                <Icon icon="material-symbols:search" />
              </button>
            </form>
          </div>
          <div className="header_btns d-flex gap-2 d-none d-lg-block">
            {token ? (
              <Dropdown
                overlay={menu}
                placement="bottom"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Button className="user_menu">
                  <Icon icon="bx:user" />
                </Button>
              </Dropdown>
            ) : (
              <Link to="/login">
                <button className="py-1">Log In</button>
              </Link>
            )}
            <Link to="/user/create/services" className="ms-2">
              <button className="primray py-1">POST AD</button>
            </Link>
          </div>
          <div className="menuMobile_icon d-lg-none">
            <Icon icon="ci:menu-alt-01" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
