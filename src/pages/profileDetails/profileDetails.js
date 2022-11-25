import "./profileDetails.scss";
import { Icon } from "@iconify/react";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURLImg } from "../../routes/routes";
import { useParams } from "react-router-dom";
import PropertyCard from "../../components/propertyCard/propertyCard";
import { useDispatch } from "react-redux";
import { startLoader, endLoader } from "../../redux/actions";
import moment from "moment";
const ServicesDetail = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const [userAds, setuserAds] = useState([]);
  const { id } = useParams();
  // ========================================================
  //  Get API for User Profile
  // ========================================================
  const getProfileDetail = async () => {
    dispatch(startLoader());
    await axios
      .get(`individual/${id}`)
      .then((resp) => {
        // console.log("get user profile api data -------->", resp.data);
        setUserDetails(resp.data.detail);
        setuserAds(resp.data.ads_listing.data);
      })
      .catch((error) => {
        console.log("get user profile api  Error-------->", error);
      });
    dispatch(endLoader());
  };
  useEffect(() => {
    getProfileDetail();
  }, []);
  return (
    <>
      <MainLayout>
        <div className="container-fuild px-1 px-md-5">
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
          </div>
          <div className="services_details_body mb-4">
            <div className="row">
              <div className="col-md-6 col-xl-3">
                <div className="service_pro_details p-md-3 p-2 text-center ">
                  <div className="servies_pro_img mx-auto my-3">
                    <img
                      src={`${baseURLImg}user/md/${userDetails?.profile_image}`}
                      alt="pro_img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/img/placeholder.png";
                      }}
                    />
                  </div>
                  <div className="servies_name">
                    <h4>Top Level</h4>
                  </div>
                  <hr />
                  <div className="user_otherDetails px-1 ">
                    <div className="user_Item d-flex align-items-center justify-content-between py-2">
                      <div className="user_item_heading d-flex align-items-center">
                        <Icon icon="material-symbols:location-on" />
                        &nbsp; Form
                      </div>
                      <h6 className="mb-0 user_item_value">
                        {userDetails?.country ? userDetails?.country : "Qatar"}
                      </h6>
                    </div>
                    <div className="user_Item d-flex align-items-center justify-content-between py-2">
                      <div className="user_item_heading d-flex align-items-center">
                        <Icon icon="mdi:user" />
                        &nbsp; Member since
                      </div>
                      <h6 className="mb-0 user_item_value">
                        {moment(userDetails?.updated_at).format("MMM-YYYY")}
                      </h6>
                    </div>
                    <div className="user_Item d-flex align-items-center justify-content-between py-2">
                      <div className="user_item_heading d-flex align-items-center">
                        <Icon icon="material-symbols:mail-rounded" />
                        &nbsp; Email
                      </div>
                      <h6 className="mb-0 user_item_value">
                        {userDetails?.email}
                      </h6>
                    </div>
                    <div className="mt-4 user_link_btns">
                      <a
                        href={`tel:${userDetails?.country_code}${userDetails?.mobile_no}`}
                      >
                        <button className="w-100 phone_btn">
                          <Icon icon="material-symbols:phone-in-talk" />
                          &nbsp;Phone
                        </button>
                      </a>
                      <a
                        href={`https://api.whatsapp.com/send?phone=${userDetails?.country_code}${userDetails?.mobile_no}`}
                      >
                        <button className="w-100 whats_btn mt-2">
                          <Icon icon="ic:sharp-whatsapp" />
                          &nbsp;Whats App
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="col-md-6 col-xl-9">
                <h3 className="user_name">
                  {userDetails && userDetails?.name} ADs
                </h3>
                <div className="property_ads_details">
                  <div className="row">
                    {userAds &&
                      userAds.map((item, index) => {
                        return (
                          <>
                            <div className="col-md-12 col-xl-4 px-0">
                              <PropertyCard data={item} />
                            </div>
                          </>
                        );
                      })}
                  </div>
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
