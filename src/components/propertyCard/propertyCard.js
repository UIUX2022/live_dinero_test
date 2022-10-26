import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./propertyCard.scss";
const ProppertyCard = (props) => {
  const [cardData, SetCArdData] = useState(props.data);

  return (
    <Link to={`/propertydetails/${cardData.id}`}>
      <div className="AddsCardContainer mt-3 mx-1">
        <div className="coverImg">
          <img src="/img/addbg.jpg" alt="cover" />
        </div>
        <div className="cardDetails p-2">
          <h4>{cardData.title}</h4>
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
          <h3>QAR {cardData.price}</h3>
          <div className="aboutAdd">Zone 4, Doha Qatar . 10 Min ago</div>
          <div className="addWish">
            <Icon icon="bi:heart" />
          </div>
        </div>
      </div>{" "}
    </Link>
  );
};
export default ProppertyCard;
