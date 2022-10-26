import "./herosection.scss";
import { Carousel } from "antd";
import slider1 from '../../images/slider_img.png';
const HeroSection = () => {
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div className="hero_section">
      <Carousel autoplay>
              <div>
              <img src={slider1} /> 
        </div>
        <div>
        <img src={slider1} /> 
        </div>
        <div>
        <img src={slider1} /> 
        </div>
        <div>
        <img src={slider1} /> 
        </div>
      </Carousel>
    </div>
  );
};
export default HeroSection;
