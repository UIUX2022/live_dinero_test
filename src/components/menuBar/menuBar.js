import "./menuBar.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { baseURLImg } from "../../routes/routes";
const MainMenu = () => {
  const ourServices = useSelector((state) => state.authReducer.services);
  const [subservices, setSubServices] = useState();


  useEffect(() => {
    setSubServices(ourServices);
  }, [ourServices]);
  return (
    <div className="main_section px-1 px-xl-5 ">
      <div className="container-fuild mx-auto">
        <div className="d-flex mainMenu_bar align-items-center ">
          <div className="mainHeading">
            <Icon icon="gg:menu-grid-r" /> Main Services
            <div className="main_cat_block">
              {subservices &&
                subservices.map((item, index) => {
                  return (
                    <>
                      {item.sub_services.length > 0 ? (
                        <div className="cat_items" key={index}>
                          <Link to={`/services/${item.slug}`}>
                            {item.title}
                          </Link>
                          {item &&
                            item.sub_services.map((sub_item, index) => {
                              return (
                                <div className="sub_item_list" key={index}>
                                  <Link to={`/services/${sub_item?.slug}`}>
                                    <img
                                      src={`${baseURLImg}services/logo/lg/${sub_item?.logo_image}`}
                                      alt="logo"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/img/placeholder.png";
                                      }}
                                    />
                                    &nbsp;
                                    {sub_item.title}
                                  </Link>
                                </div>
                              );
                            })}
                        </div>
                      ) : null}
                    </>
                  );
                })}
            </div>
          </div>
          <ul className="main_menu  px-0 ms-4">
            {subservices &&
              subservices.map((item, index) => {
                return (
                  <>
                    <li className="main_menuItem  mx-xl-3 mx-lg-2" key={index}>
                      <Link to={`/services/${item.slug}`}>{item.title}</Link>
                      <div className="custome_dropdown_menu">
                        <ul className="ps-0">
                          {item?.sub_services &&
                            item?.sub_services.map((sub_item, index) => {
                              return (
                                <>
                                  <li key={index}>
                                    <Link to={`/services/${sub_item?.slug}`}>
                                      <img
                                        src={`${baseURLImg}services/logo/lg/${sub_item?.logo_image}`}
                                        alt="logo"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = "/img/placeholder.png";
                                        }}
                                      />
                                      &nbsp;
                                      {sub_item.title}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                        </ul>
                      </div>
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default MainMenu;
