import "./herosection.scss";
import { Carousel } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURLImg } from "../../routes/routes";
import { Link } from "react-router-dom";
const HeroSection = () => {
  const [banners, setBanners] = useState([]);
  const getSliderImgs = async () => {
    await axios.get("banners/active").then((resp) => {
      setBanners(resp.data.banners);
    });
  };
  useEffect(() => {
    getSliderImgs();
  }, []);
  return (
    <div className="hero_section">
      <Carousel autoplay>
        {banners &&
          banners.map((banner, index) => {
            return (
              <div key={index}>
                <Link to={banner.link}>
                  <img
                    src={`${baseURLImg}banners/lg/${banner.image_name}`}
                    alt="slider_img"
                  />
                </Link>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};
export default HeroSection;
