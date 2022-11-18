import "./categoryCardland.scss";
import profile from "../../images/profileUser.png";
import { Icon } from "@iconify/react";

const ProfileLandCard = () => {
  return (
    <>
      
      <div className="landCartCategory d-flex mt-3 gap-2 p-2">
        <img src={profile} />
        <div className="card_details py-1">
          <div className="card_profile d-flex justify-content-between align-items-center">
            <div>
              <h3>
                <a href="#">Person-1</a>
              </h3>
            </div>
            <div className="Profile_details">
              <Icon icon="bi:heart" />
            </div>
          </div>
          <h6>Suhaim Bin Hamad St</h6>
          <div className="card_btns d-flex gap-2">
            <a href="#" className="phone_link">
              <button >
                <Icon icon="charm:phone-call" />
                &nbsp;
                phone
              </button>
            </a>
            <a href="#" className="whatsapp_link">
              <button>
                <Icon icon="bi:whatsapp" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileLandCard;
