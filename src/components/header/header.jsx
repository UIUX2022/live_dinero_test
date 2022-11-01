import "./header.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { startLoader, endLoader } from "../../redux/actions/index";
import { Button, Dropdown, Menu } from "antd";

const Header = () => {
  const token = useSelector((state) => state.authReducer.token);

  const dispatch = useDispatch();
  const [current, setCurrent] = useState("mail");
  const [services, setServices] = useState(null);
  const [subservices, setSubServices] = useState(null);

  const menu = (
    <Menu>
      <Menu.Item icon={<Icon icon="carbon:user-avatar-filled" />}>
        <Link to="/profile/manage-profile">&nbsp;Profile</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="entypo:tools" />}>
        <Link to="/profile/order">&nbsp;Services</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="teenyicons:search-property-solid" />}>
        <Link to="/profile/address">&nbsp;Property Info</Link>
      </Menu.Item>

      <Menu.Item icon={<Icon icon="icon-park-outline:transaction-order" />}>
        <Link to="/profile/wishlist">&nbsp;Orders</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="entypo:wallet" />}>
        <Link to="/profile/store">&nbsp;wallet</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="fa-solid:address-card" />}>
        <Link to="/profile/my-reviews">&nbsp;address</Link>
      </Menu.Item>
      <Menu.Item icon={<Icon icon="clarity:notification-solid-badged" />}>
        <Link to="/profile/my-question">&nbsp;Notifications</Link>
      </Menu.Item>
      <Menu.Item danger icon={<Icon icon="ant-design:logout-outlined" />}>
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
        setSubServices(response.data.services);

        dispatch(endLoader());
      })
      .catch((error) => {
        console.log("error services api with sub-services", error);
      });
  };
  useEffect(() => {
    getSubServices();
  }, []);
  return (
    <div className="header_section px-5">
      <div className="container-fluid pt-2 ">
        <div className="d-flex justify-content-between align-items-center">
          <div className="header_logo py-1">
            <Link to="/">
              <img src={Logo} width="100" />
            </Link>
          </div>
          <div className="main_menu text-center d-none d-lg-block">
            <ul className="mx-auto">
              <li className="main_menu_items active">
                <Link to="/">Home</Link>
              </li>
              <li className="main_menu_items custom_dropdown">
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
                              <Link className="dropdown_item">
                                <img src="/img/cat_2.png" />
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
                                      <img src="/img/cat_2.png" />
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
            <a href="#" className="me-2">
              <button className="primray py-1">POST AD</button>
            </a>
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
