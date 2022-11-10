import "./featuredAdds.scss";
import OwlCarousel from "react-owl-carousel";
import ProfileCard from "../profileCard/profileCard";
import { useState, useEffect } from "react";
import axios from "axios";
const FeaturedAgencies = () => {
  const [listAgencies, setListAgencies] = useState([]);
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
  // =================================================================
  //  Get Api for Featured Agencices
  // =================================================================
  const getFeatured = async () => {
    await axios.get("agencies/featured").then((resp) => {
      setListAgencies(resp.data.agencies);
    });
  };
  useEffect(() => {
    getFeatured();
  }, []);
  console.log("get api Data is ===============>", listAgencies);
  return (
    <>
      <div className="container-fluid px-lg-5 px-md-3 px-1 pt-1">
        <div className="section_heading">
          <h2>Feartured Constructions</h2>
        </div>
        {listAgencies ? (
          <OwlCarousel className="owl-theme owl-theme-2" {...options1}>
            {listAgencies.map((cardItem, index) => {
              return (
                <div className="item">
                  <ProfileCard data={cardItem} />
                </div>
              );
            })}
          </OwlCarousel>
        ) : null}
      </div>
    </>
  );
};
export default FeaturedAgencies;
