import "./services.scss";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import CategoryCard from "../../components/categoryCard/categoryCard";
import { Icon } from "@iconify/react";
import OwlCarousel from "react-owl-carousel";
import CategoryFilter from "../../components/filters/CategoryFillters/CategoryFilter";
import LocationFilter from "../../components/filters/locationFilters/locationFilter";
import Pricefilter from "../../components/filters/priceFilter/priceFilter";
import ProfileCard from "../../components/profileCard/profileCard";
import ProdileCard2 from "../../components/profileLandCard/ProfileLandCArd";
import { Collapse } from "antd";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "../../components/propertyCard/propertyCard";
const Services = () => {
  const { id } = useParams();
  const [gridCard, setGridCard] = useState(true);
  const [servicedata, setServicedata] = useState(null);
  const [ads, SetAds] = useState(null);
  const { Panel } = Collapse;
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: false,
    dots: false,
    autoplay: false,
    loop: true,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      600: {
        items: 4,
      },
      700: {
        items: 5,
      },
      1000: {
        items: 7,
      },
      1200: {
        items: 8,
      },
    },
  };

  // =========================================================================
  // Get API for services data
  // =========================================================================
  const getServicesDetail = async () => {
    await axios
      .get(`service/${id}`)
      .then((resp) => {
        console.log("get services API is ", resp.data.services);
        setServicedata(resp.data.services);
        SetAds(resp.data.services.ads);
      })
      .catch((error) => {
        console.log("error services API is ", error);
      });
  };
  useEffect(() => {
    getServicesDetail();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="servicePage_section">
          <div className="servicePage_header py-lg-5 py-md-3 py-2">
            <div className="container my-lg-5 my-md-3 my-2">
              <div className="row">
                <div className="col-12 text-center">
                  <h1>Consultants</h1>
                  <p>Thousands of talented consultants in one place.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="services_page_cat">
            <div className="container-fluid px-lg-5 px-md-3 px-1">
              <OwlCarousel className="owl-theme" {...options}>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_2.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_2.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_3.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_4.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_5.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_6.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_1.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_3.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_2.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_5.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_4.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
                <div className="item">
                  <CategoryCard
                    name="Land"
                    img="/img/cat_6.png"
                    bg="rgba(20, 136, 204, 0.1)"
                  />
                </div>
              </OwlCarousel>
            </div>
          </div>
          <div className="catPage_detail pb-5 mt-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-0">
                  <div className="cat_filters">
                    <div className="propsSales_filters">
                      <Collapse defaultActiveKey={["1", "2", "3", "4"]}>
                        <Panel header="Categories" key="1">
                          <CategoryFilter />
                        </Panel>
                        <Panel header="Locations" key="2">
                          <LocationFilter />
                        </Panel>
                        <Panel header="Price" key="3">
                          <Pricefilter />
                        </Panel>
                      </Collapse>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-12 mt-2 mt-md-0">
                  <div className="cart_list">
                    <div className="cart_list_header py-2 px-2">
                      <div className="row align-items-center">
                        <div className="col-lg-6 ">
                          <nav aria-label="breadcrumb" className="">
                            <ol className="breadcrumb mb-0">
                              <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                Services
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {servicedata && servicedata.title}
                              </li>
                            </ol>
                          </nav>
                        </div>
                        <div className="col-lg-6 mt-2">
                          <div className="header_filter d-flex justify-content-lg-end justify-content-between gap-2 align-items-lg-center align-items-end">
                            <div>
                              <span>Filter By:&nbsp;</span>
                              <select defaultValue="10">
                                <option selected>Default</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                            <div>
                              <span>Sort By:&nbsp;</span>
                              <select defaultValue="20">
                                <option selected>Default</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                            <div
                              className="grid_icon"
                              onClick={() => setGridCard(!gridCard)}
                            >
                              {gridCard ? (
                                <Icon icon="bx:menu" />
                              ) : (
                                <Icon icon="gg:menu-grid-r" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="services_pro_list ">
                    {gridCard == 1 ? (
                      <>
                        <div className="row justify-content-center justify-content-md-start">
                          {ads &&
                            ads.map((adItems, index) => {
                              return (
                                <>
                                  {adItems.ad_type_id == 1 ? (
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-10">
                                      <PropertyCard data={adItems} />
                                    </div>
                                  ) : (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-10">
                                      <ProfileCard data={adItems} />
                                    </div>
                                  )}
                                </>
                              );
                            })}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row">
                          {ads &&
                            ads.map((adItems, index) => {
                              return (
                                <>
                                  {adItems.ad_type_id == 1 ? (
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-10">
                                      <PropertyCard data={adItems} />
                                    </div>
                                  ) : (
                                    <div className="col-xl-6 col-lg-12">
                                      <ProdileCard2 />
                                    </div>
                                  )}
                                </>
                              );
                            })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default Services;
