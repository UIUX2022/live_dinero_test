import "./profileDetails.scss";
import { Icon } from "@iconify/react";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import Profile from "../../images/profileUser.png";
import ProfileBg from "../../images/profilebg.png";
import ImageGallery from "react-image-gallery";
import axios from 'axios';
import { useEffect, useState } from 'react';
import {baseURL} from '../../routes/routes'

const ServicesDetail = () => {

  const [userDetails, setUserDetails] = useState(null);

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  // ========================================================
  //  Get API for User Profile
  // ========================================================
  const getProfileDetail = async () => {
    await axios.get("ad/14").then((resp) => {
      console.log("get user profile api data -------->", resp.data.ad);
      setUserDetails(resp.data.ad);
    })
 }
  useEffect(() => {
    getProfileDetail();
  },[])
  return (
    <>
      <MainLayout>
        <div className="container">
          <div className="service_detail_head">
            <div className="row">
              <div className="col-12">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0  py-3">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#"> Service Provider</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Profile
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="header-img mb-3">
                  <img src={ProfileBg} alt="serice_head" />
                </div>
              </div>
            </div>
          </div>
          <div className="services_details_body mb-2">
            <div className="row">
              <div className="col-md-8">
                <div className="service_pro_details p--md-3 p-2 d-flex align-items-center gap-3">
                  <div className="servies_pro_img">
                    <img src={`${baseURL}storage/images/ads/detail/${userDetails && userDetails.images[0].image_name}`} alt="pro_img" />
                  </div>
                  <div className="servies_name">
                    <h3>{userDetails && userDetails.title}</h3>
                    <h4>Top Level</h4>
                  </div>
                  <div className="check_fav">
                    <Icon icon="bi:heart" />
                  </div>
                </div>
                <div className="silder_div my-2">
                  <ImageGallery items={images} />
                </div>
                <div className="services_slider mt-3">
                  <div className="slider"></div>
                  <div className="px-2 py-2">
                    <h3>About My Profile </h3>
                    <p>
                      {userDetails && userDetails.short_description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-2 mt-md-0">
                <div className="user_info p-3">
                  <div className="d-flex justify-content-around">
                    <a href="#">
                      <div className="user_info_item">
                        <Icon icon="carbon:phone-voice" />
                      </div>
                      <p className="mb-0">Call</p>
                    </a>
                    <a href="#">
                      <div className="user_info_item">
                        <Icon icon="entypo:direction" />
                      </div>
                      <p className="mb-0">Direction</p>
                    </a>
                    <a href="#">
                      <div className="user_info_item">
                        <Icon icon="clarity:map-marker-line" />
                      </div>
                      <p className="mb-0">Map</p>
                    </a>
                    <a href="#">
                      <div className="user_info_item">
                        <Icon icon="carbon:share" />
                      </div>
                      <p className="mb-0">Share</p>
                    </a>
                  </div>
                </div>
                <div className="service_contact_info mt-2">
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
      </MainLayout>
    </>
  );
};
export default ServicesDetail;
