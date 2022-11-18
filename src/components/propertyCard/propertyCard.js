import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { baseURLImg } from "../../routes/routes";
import "./propertyCard.scss";
const PropertyCard = (props) => {
  const [cardData, SetCArdData] = useState(props.data);
  return (
    <Link to={`/addetails/${cardData && cardData.id}`}>
      <div className="AddsCardContainer mt-3 mx-1">
        <div className="coverImg">
          <img
            src={`${baseURLImg}adds/primary/lg/${cardData?.primary_image}`}
            alt="cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/img/core_placeholder.png";
            }}
          />
        </div>
        <div className="cardDetails p-3">
          <h4>{cardData && cardData?.title}</h4>
          <div className="roomdetails my-2">
            <div className="roomItams d-flex justify-content-center align-content-center gap-1">
              <Icon icon="cil:room" />
              <p>5</p>
            </div>
            <div className="roomItams d-flex justify-content-center align-content-center gap-1">
              <Icon icon="fa:bath" />
              <p>4</p>
            </div>
            <div className="roomItams d-flex justify-content-center align-content-center gap-1">
              <Icon icon="nimbus:size-height" />
              <p>1361.25sq</p>
            </div>
          </div>
          <h3>
            <span>QAR</span> {cardData && cardData?.price}
          </h3>
          <div className="aboutAdd">
            <Icon icon="material-symbols:location-on" />
            {cardData && cardData?.country.name}
          </div>
          <div className="addWish">
            <Icon icon="bi:heart" />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PropertyCard;
