import "./profileCard.scss";
import Profile from "../../images/profileUser.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const ProfileCard = ({ data }) => {
  return (
    <>
      <div className="profile_card px-2 py-2 mt-3">
        <img src={Profile} className="p-1" />
        <div className="user_details">
          <h3>
            <Link to={`/addetails/${data?.user_id}`}>
              {data?.display_name}
            </Link>
          </h3>
          <h6 className="py-1">Suhaim Bin Hamad St</h6>
          <div className="d-flex justify-content-center align-items-center gap-1">
            <a href="#" className="phone_link">
              <button className="w-100">
                <Icon icon="charm:phone-call" /> &nbsp;phone
              </button>
            </a>
            <a href="#" className="whatsapp_link">
              <button className="w-100">
                <Icon icon="bi:whatsapp" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileCard;
