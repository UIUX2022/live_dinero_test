import OwlCarousel from "react-owl-carousel";
import ProppertyCard from "../propertyCard/propertyCard";
import axios from "axios";
import { useState, useEffect } from "react";

const FearturedAdds = () => {
  const [feartAdds, SetfeatAdds] = useState(null);
  const getFearturedAdds = async () => {
    await axios
      .get("ad/featured")
      .then((response) => {
        SetfeatAdds(response.data.ads);
      })
      .catch((error) => {
        console.log("featured add list error", error);
      });
  };
  useEffect(() => {
    getFearturedAdds();
  }, []);
  
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
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
      <div className="property_card_list pt-3">
        <div className="container-fluid px-lg-5 px-md-3 px-1 pt-1">
          <div class="section_heading">
            <h2>Feartured Constructions</h2>
          </div>
          {feartAdds ? (
            <OwlCarousel className="owl-theme owl-theme-2" {...options}>
              {feartAdds &&
                feartAdds.map((item1,index) => {
                  return (
                    <div class="item" key={index}>
                      <ProppertyCard data={item1} />
                    </div>
                  );
                })}
            </OwlCarousel>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default FearturedAdds;
