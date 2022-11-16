import "./categorySilder.scss";
import OwlCarousel from "react-owl-carousel";
import { useState, useEffect } from "react";
import CategoryCard from "../categoryCard/categoryCard";
import { baseURLImg } from "../../routes/routes";
const CategorySlider = (props) => {
  const [data, setData] = useState(props.data);
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    loop: true,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 4,
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
  return (
    <>
      <div className="category_slider">
        <OwlCarousel className="owl-theme" {...options}>
          {data.map((item, index) => {
            return (
              <CategoryCard
                key={index}
                name={item.title}
                id={item.id}
                img={`${baseURLImg}services/logo/lg/${item.logo_image}`}
                bg="rgba(20, 136, 204, 0.1)"
              />
            );
          })}
        </OwlCarousel>
      </div>
    </>
  );
};
export default CategorySlider;
