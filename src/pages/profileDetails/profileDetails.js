import "./profileDetails.scss";
import { Icon } from "@iconify/react";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import Profile from '../../images/profileUser.png';
const ServicesDetail = () => {
  return (
    <>
      <MainLayout />
      <div className="container">
        <div className="service_detail_head">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Library</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="header-img">
                <img src={Profile} alt="serice_head" />
              </div>
            </div>
          </div>
        </div>
        <div className="services_details_body ">
          <div className="row">
            <div className="col-md-8">
              <div className="service_pro_details p-3 d-flex align-items-center gap-3">
                <div className="servies_pro_img">
                  <img src={Profile} alt="pro_img" />
                </div>
                <div className="servies_name">
                  <h3>Abu Sufian</h3>
                  <h4>Top Level</h4>
                </div>
              </div>
              <div className="services_slider mt-3">
                <div className="slider"></div>
                <div className="px-2">
                  <h3>About My Profile </h3>
                  <p>
                    I will make the painters paint your logo/image or text on
                    building wall and send this amazing image to you in high
                    resolution printable jpeg image. The picture on the wall is
                    digitally created. You can use this picture on your Facebook
                    pages, website, blog for advertise or boost your business.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service_contact_info">
                <div className="service_contact_card p-3">
                  <p>Contact Information</p>
                  <button className="w-100 py-2">CONTACT FOR inquiry</button>
                </div>
              </div>
              <div className="services-Prolinks py-2">
                <a className="phone-items py-2">
                  <Icon icon="carbon:phone-voice" />
                  &nbsp; Phone
                </a>
                <a className="Whatsapp-items py-2">
                  <Icon icon="bi:whatsapp" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ServicesDetail;
