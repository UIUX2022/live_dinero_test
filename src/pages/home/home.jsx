import "./home.scss";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import HeroSection from "../../components/heroSection/heroSection";
import CategoryCard from "../../components/categoryCard/categoryCard";
import OwlCarousel from "react-owl-carousel";
import { Row, Col } from "antd";
import ProppertyCard from "../../components/propertyCard/propertyCard";
import ProfileCard from "../../components/profileCard/profileCard";
import { useState, useEffect } from "react";
import axios from "axios";
import FeaeturedAdds from "../../components/fearturedAdds/fearturedAdds";
const Home = () => {
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    loop: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const options1 = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    loop: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      700: {
        items: 4,
      },
      1000: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
  };

  const [services, Setservices] = useState(null);
  const [constr, setconstr] = useState(null);
  const [consult, setconsult] = useState(null);
  const [interdesign, setinterDesing] = useState(null);

  //==============================================
  //  Get API for Services
  // ==============================================
  const getServices = async () => {
    await axios.get("services-with-sub").then((resp) => {
      Setservices(resp.data.services);
      setconstr(resp.data.services[1]);
      setconsult(resp.data.services[0]);
      setinterDesing(resp.data.services[4]);
    });
  };
  useEffect(() => {
    getServices();
  }, []);
  console.log("get data of services==========>", services);
  return (
    <>
      <MainLayout>
        <HeroSection />
        <div className="cat_section my-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center px-lg-5 px-md-3 px-1 pt-1">
                  <h2>{constr && constr.title}</h2>
                  <img src="./img/cat_img.png" />
                </div>
              </div>
            </div>
            <Row>
              {constr &&
                constr.sub_services.map((item, index) => {
                  return (
                    <Col lg={3} md={4} sm={6} xs={12} id={`cat${index}`}>
                      <CategoryCard
                        name={item.title}
                        id={item.id}
                        img="./img/cat_1.png"
                        bg="rgba(20, 136, 204, 0.1)"
                      />
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
        <div className="property_card_list pt-4">
          <div className="container-fluid px-lg-5 px-md-3 px-1 pt-1">
            <div class="section_heading">
              <h2>Feartured Constructions</h2>
            </div>
            <OwlCarousel className="owl-theme owl-theme-2" {...options1}>
              <div class="item">
                <ProfileCard />
              </div>
              <div class="item">
                <ProfileCard />
              </div>
              <div class="item">
                <ProfileCard />
              </div>
              <div class="item">
                <ProfileCard />
              </div>
              <div class="item">
                <ProfileCard />
              </div>
              <div class="item">
                <ProfileCard />
              </div>
              <div class="item">
                <ProfileCard />
              </div>
              <div class="item">
                <ProfileCard />
              </div>
              <div class="item">
                <ProfileCard />
              </div>
            </OwlCarousel>
          </div>
        </div>
        <div className="cat_section my-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center px-lg-5 px-md-3 px-1 pt-1">
                  <h2>{consult && consult.title}</h2>
                  <img src="./img/cat_img.png" />
                </div>
              </div>
            </div>
            <Row>
              {consult &&
                consult.sub_services.map((item2) => {
                  return (
                    <Col lg={3} md={4} sm={6} xs={12}>
                      <CategoryCard
                        name={item2.title}
                        img="./img/cat_1.png"
                        bg="rgba(20, 136, 204, 0.1)"
                      />
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
        {/* <div className="property_card_list pt-4">
          <div className="container-fluid px-lg-5 px-md-3 px-1 pt-1">
            <div class="section_heading">
              <h2>Feartured Constructions</h2>
            </div>
            <OwlCarousel className="owl-theme owl-theme-2" {...options}>
              <div class="item">
                <ProppertyCard />
              </div>
              <div class="item">
                <ProppertyCard />
              </div>
              <div class="item">
                <ProppertyCard />
              </div>
              <div class="item">
                <ProppertyCard />
              </div>
              <div class="item">
                <ProppertyCard />
              </div>
              <div class="item">
                <ProppertyCard />
              </div>
            </OwlCarousel>
          </div>
        </div> */}
        <FeaeturedAdds />
        <div className="cat_section my-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center px-lg-5 px-md-3 px-1 pt-1">
                  <h2>{interdesign && interdesign.title}</h2>
                  <img src="./img/cat_img.png" />
                </div>
              </div>
            </div>
            <Row>
              {interdesign &&
                interdesign.sub_services.map((item3) => {
                  return (
                    <Col lg={3} md={4} sm={6} xs={12}>
                      <CategoryCard
                        name={item3.title}
                        img="./img/cat_1.png"
                        bg="rgba(20, 136, 204, 0.1)"
                      />
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default Home;
