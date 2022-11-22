import "./propertyDetails.scss";
import { Icon } from "@iconify/react";
import Profile from "../../images/profileUser.png";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import axios from "axios";
const PropertyDetailPage = () => {
  let { id } = useParams();
  const [details, Setdetails] = useState({});
  const [detailsImgs, SetdetailsImgs] = useState([]);
  const images = [];
  // =============================================
  // Get API for Property data
  // =============================================
  const getDetails = async () => {
    await axios.get(`ad/${id}`).then((resp) => {
      Setdetails(resp.data.ad);
      const Imgs = [1, 2, 3, 4, 5, 6];
      Imgs.map((item, index) => {
        console.log("current img", item);
        SetdetailsImgs([...detailsImgs, "new value"]);
      });
      SetdetailsImgs();
    });
  };

  useEffect(() => {
    getDetails();
  }, []);
  console.log("my currents Images is", detailsImgs);
  return (
    <>
      <MainLayout>
        <div className="property_detailPage">
          <div className="container">
            <div className="row">
              <div className="col-12 mt-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to={`/services/${details?.service?.id}`}>
                        {details?.service?.title}
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active text-capitalize"
                      aria-current="page"
                    >
                      {details?.type?.type}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="property py-2">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="silder_div my-2">
                        <ImageGallery items={images} />
                      </div>
                      <div className="property_details_info mt-4">
                        <h4>Property Details</h4>
                        <div className="row justify-content-between">
                          <div className="col-md-5">
                            <div className="d-flex align-items-center justify-content-between">
                              <p>Price</p>
                              <h6>{details && details.price}</h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <p>Area unit</p>
                              <h6>Square Feet</h6>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex align-items-center justify-content-between">
                              <p>Type</p>
                              <h6>Commercial Plots</h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <p>Area</p>
                              <h6>1,200</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="perporty_description mt-4">
                        <h4>Property Description</h4>
                        <p>{details && details.short_description}</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="perporty_sale_details mt-4 mt-md-0">
                        <div className="d-flex justify-content-between">
                          <h5>QAR {details && details.price}</h5>
                          <div>
                            <Icon icon="ant-design:share-alt-outlined" />{" "}
                            &nbsp;&nbsp;
                            <Icon icon="akar-icons:heart" />
                          </div>
                        </div>
                        <p>{details && details.title} </p>
                        <div className="d-flex justify-content-between mt-4">
                          <span>{details?.country?.name}.</span>
                          <span>10 Min ago</span>
                        </div>
                      </div>
                      <div className="perporty_saler_details mt-4">
                        <h3>Contact With Seller</h3>
                        <div className="perporty_saler_info pt-2 ">
                          <img src={Profile} alt="seller_profile" />
                          <div className="px-1">
                            <h4>{details?.user?.name}</h4>
                            <p>Member since may 2022</p>
                          </div>
                        </div>
                      </div>
                      <div className="perporty_seller_contact mt-4">
                        <div className="d-flex gap-2">
                          <button className="phone_btn py-2">
                            <Icon icon="carbon:phone-voice" />
                            &nbsp;&nbsp;Phone
                          </button>
                          <button className="whats_btn">
                            <Icon icon="ant-design:whats-app-outlined" />
                          </button>
                        </div>
                      </div>
                    </div>
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
export default PropertyDetailPage;
