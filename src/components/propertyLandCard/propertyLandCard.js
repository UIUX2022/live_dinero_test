import "./propertyLandCard.scss";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { baseURLImg } from "../../routes/routes";
const PropertyLandCard = (props) => {
  const [data, setData] = useState(props.data);

  return (
    <Link to={`/addetails/${data.id}`}>
      <div className="propertyLandCard  mt-2 mt-md-3 ">
        <div className="d-flex">
          <div className="cardImg-Side">
            <img
              src={`${baseURLImg}adds/primary/lg/${data?.primary_image}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/img/core_placeholder.png";
              }}
            />
          </div>
          <div className="cardDetails py-2 px-2">
            <div className="carddel_head d-flex justify-content-between">
              <h2>{data.title}</h2>
              <span className="mx-1">
                <Icon icon="bi:heart" />
              </span>
            </div>
            <div className="carddel_body py-1">
              <div className="d-flex gap-2 align-items-center">
                <Icon icon="ion:bed-outline" />
                <span>5</span>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Icon icon="fa:bath" />
                <span>3</span>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Icon icon="nimbus:size-height" />
                <span>5</span>
              </div>
            </div>
            <div className="carddel_footer d-flex justify-content-between align-items-end">
              <p>
                <Icon icon="material-symbols:location-on" /> {data.country.name}
              </p>
              <h6>
                <span>QAR</span>
                <br /> 2,000
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PropertyLandCard;
