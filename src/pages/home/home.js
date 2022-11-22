import "./home.scss";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import HeroSection from "../../components/heroSection/heroSection";
import CategorySilder from "../../components/categorySlider/categorySlider";
import { baseURLImg } from "../../routes/routes";
import { useSelector } from "react-redux";


const Home = () => {
  const ourServices = useSelector((state) => state.authReducer.services);
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

  return (
    <>
      <MainLayout>
        <HeroSection />
        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fuild">
            <div className="row">
              <div className="col-12 b-3">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{ourServices && ourServices[0].title}</h2>
                </div>
              </div>
            </div>
            {ourServices ? (
              <CategorySilder data={ourServices[0].sub_services} />
            ) : null}
          </div>
        </div>

        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fuild">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{ourServices && ourServices[1].title}</h2>
                </div>
              </div>
            </div>
            {ourServices ? (
              <CategorySilder data={ourServices[1].sub_services} />
            ) : null}
          </div>
        </div>

        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{ourServices && ourServices[2].title}</h2>
                </div>
              </div>
            </div>

            {ourServices ? (
              <CategorySilder data={ourServices[2].sub_services} />
            ) : null}
          </div>
        </div>

        {/* IDF */}
        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{ourServices && ourServices[4].title}</h2>
                </div>
              </div>
            </div>

            {ourServices ? (
              <CategorySilder data={ourServices[4].sub_services} />
            ) : null}
          </div>
        </div>
        {/* Home_lifrstyl */}
        <div className="cat_section mx-lg-5 mx-md-3 mx-2 my-4 pb-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="cat_section_head d-flex justify-content-between align-items-center p-lg-3 p-md-2 p-2">
                  <h2>{ourServices && ourServices[5].title}</h2>
                </div>
              </div>
            </div>

            {ourServices ? (
              <CategorySilder data={ourServices[5].sub_services} />
            ) : null}
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default Home;
