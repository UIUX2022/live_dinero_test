import "./menuBar.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoader, endLoader } from "../../redux/actions";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURLImg } from "../../routes/routes";
const MainMenu = () => {
  const [subservices, setSubServices] = useState(null);
  
  const dispatch = useDispatch();

  // ==============================================
  // Get  Services with sub services API
  // ==============================================
  const getSubServices = async () => {
    dispatch(startLoader());
    await axios
      .get("services-with-sub")
      .then((response) => {
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
