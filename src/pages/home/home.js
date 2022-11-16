import "./home.scss";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import HeroSection from "../../components/heroSection/heroSection";
import { useState, useEffect } from "react";
import axios from "axios";
import FeaeturedAdds from "../../components/fearturedAdds/fearturedAdds";
import CategorySilder from "../../components/categorySlider/categorySlider";
import { baseURLImg } from "../../routes/routes";
import FeaturedAgencies from "../../components/featuredAgencies/featureAgencies";
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

  const [services, Setservices] = useState(null);
  const [constr, setconstr] = useState(null);
  const [consult, setconsult] = useState(null);
  const [interdesign, setinterDesing] = useState(null);
  const [IDF, setIDF] = useState(null);
  const [Home_lifrstyle, setHome_lifrstyle] = useState(null);
  //==============================================
  //  Get API for Services
  // ==============================================
  const getServices = async () => {
    await axios.get("services-with-sub").then((resp) => {
      Setservices(resp.data.services);
      setconstr(resp.data.services[1]);
      setconsult(resp.data.services[0]);
      setinterDesing(resp.data.services[2]);
      setIDF(resp.data.services[4]);
      setHome_lifrstyle(resp.data.services[5]);
      console.log(" get user services:---------------->", resp.data); // Api response check
    });
  };
  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <MainLayout>
        <HeroSection />
        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fuild">
            <div className="row">
              <div className="col-12 b-3">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{constr && constr.title}</h2>
                </div>
              </div>
            </div>
            {constr ? <CategorySilder data={constr.sub_services} /> : null}
          </div>
        </div>
        {/* <div className="featuredAdds_section">
          <FeaeturedAdds />
        </div> */}

        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fuild">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{consult && consult.title}</h2>
                </div>
              </div>
            </div>
            {consult ? <CategorySilder data={consult.sub_services} /> : null}
          </div>
        </div>

        {/* <div className="featuredAgancies_section">
          <FeaturedAgencies />
        </div> */}

        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{interdesign && interdesign.title}</h2>
                </div>
              </div>
            </div>

            {interdesign ? (
              <CategorySilder data={interdesign.sub_services} />
            ) : null}
          </div>
        </div>

        {/* IDF */}
        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{IDF && IDF.title}</h2>
                </div>
              </div>
            </div>

            {IDF ? <CategorySilder data={IDF.sub_services} /> : null}
          </div>
        </div>
        {/* Home_lifrstyl */}
        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{Home_lifrstyle && Home_lifrstyle.title}</h2>
                </div>
              </div>
            </div>

            {Home_lifrstyle ? (
              <CategorySilder data={Home_lifrstyle.sub_services} />
            ) : null}
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default Home;
