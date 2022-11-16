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
import { baseURLImg } from "../../routes/routes";

const Header = () => {
  const navigation = useNavigate();
  const local = useLocation();
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("mail");
  const [services, setServices] = useState(null);
  const [subservices, setSubServices] = useState(null);

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
        <Link to="/user/services">&nbsp;Ads</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="teenyicons:search-property-solid" />}>
        <Link to="/user/create/services">&nbsp;Create Ad</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="clarity:notification-solid-badged" />}>
        <Link to="/profile/my-question">&nbsp;Notifications</Link>
      </Menu.Item>
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

  // ==============================================
  // Get  Services with sub services API
  // ==============================================
  const getSubServices = async () => {
    dispatch(startLoader());
    await axios
      .get("services-with-sub")
      .then((response) => {
        // console.log("get data about services", response.data);
        setSubServices(response.data.services);
      })
      .catch((error) => {
        console.log("error services api with sub-services", error);
      });
    dispatch(endLoader());
  };
  useEffect(() => {
    getSubServices();
  }, []);
  
  return (
    <div className="header_section px-1 px-md-5">
      <div className="container-fuild pt-2 mx-auto">
        <div className="d-flex justify-content-between align-items-center">
          <div className="header_logo py-1">
            <Link to="/">
              <img src={Logo} width="100" />
            </Link>
          </div>
          <div className="main_menu text-center d-none d-lg-block">
            <ul className="mx-auto">
              <li
                className={
                  local.pathname == "/"
                    ? "main_menu_items active"
                    : "main_menu_items"
                }
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={
                  local.pathname == "/services/"
                    ? "main_menu_items custom_dropdown active"
                    : "main_menu_items custom_dropdown"
                }
              >
                <Link to="/">
                  Services <Icon icon="akar-icons:chevron-down" />
                </Link>
                <div className="custom_dropdown_block">
                  <ul>
                    {subservices &&
                      subservices.map((item, index) => {
                        return (
                          <li key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                              <Link
                                className="dropdown_item"
                                to={`/services/${item.id}`}
                              >
                                <img
                                  src={`${baseURLImg}services/logo/lg/${item.logo_image}`}
                                  alt="alt_img"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/img/main_placeholder.png";
                                  }}
                                />
                                &nbsp;{item.title}
                              </Link>
                              <Icon icon="akar-icons:chevron-down" />
                            </div>

                            <div className="dropdown_details">
                              {item.sub_services.map((sub_item, index) => {
                                return (
                                  <div
                                    className="sub_cat_items px-2"
                                    key={`submenu${index}`}
                                  >
                                    <Link
                                      to={`/services/${sub_item.id}`}
                                      className="d-flex gap-1 align-item-center"
                                    >
                                      <img
                                        src={`${baseURLImg}services/logo/lg/${sub_item.logo_image}`}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            "/img/main_placeholder.png";
                                        }}
                                      />

                                      <p>{sub_item.title}</p>
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </li>
              <li className="main_menu_items">
                <Link to="/">About Us</Link>
              </li>
              <li className="main_menu_items">
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
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
                <button className="py-1">Log in</button>
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
