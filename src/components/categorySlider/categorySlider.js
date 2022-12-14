import "./categorySilder.scss";
import OwlCarousel from "react-owl-carousel";
import { useState, useEffect } from "react";
import CategoryCard from "../categoryCard/categoryCard";
import { Link } from "react-router-dom";
import { baseURLImg } from "../../routes/routes";
const CategorySlider = (props) => {
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
  useEffect(() => {}, [props]);
  return (
    <>
      <div className="category_slider">
        <OwlCarousel className="owl-theme" {...options}>
          {props.data?.map((item, index) => {
            return (
              <Link to={`/services/${item?.slug}`}>
                <CategoryCard
                  key={index}
                  name={item.title}
                  id={item.slug}
                  img={`${baseURLImg}services/logo/lg/${item.logo_image}`}
                  bg="rgba(20, 136, 204, 0.1)"
                />
              </Link>
            );
          })}
        </OwlCarousel>
      </div>
    </>
  );
};
export default CategorySlider;
