import "./header.scss";
import { Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import axios from "axios";
import { Icon } from "@iconify/react";
const Header = () => {
  const [current, setCurrent] = useState("mail");
  const [services, setServices] = useState(null);
  const [subservices, setSubServices] = useState(null);

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "mail",
    },

    {
      label: <Link to="/services">Services</Link>,
      key: "SubMenu",

      children: [
        {
          type: "group",
          label: "Item 1",
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          About Us
        </a>
      ),
      key: "about",
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Contact Us
        </a>
      ),
      key: "contact",
    },
  ];
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  // ==============================================
  // Get  Services with sub services API
  // ==============================================
  const getSubServices = async () => {
    await axios
      .get("services-with-sub")
      .then((response) => {
        setSubServices(response.data.services);
        console.log("services api with sub-services", response.data.services);
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
            {/* <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            /> */}
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
                                      to="/"
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
            <Link to="/login">
              <button className="py-1">Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
