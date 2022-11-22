import "./propertyDetails.scss";
import { Icon } from "@iconify/react";
import Profile from "../../images/profileUser.png";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import axios from "axios";
import { startLoader, endLoader } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { baseURLImg } from "../../routes/routes";

import { Modal } from "antd";
const PropertyDetailPage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [details, Setdetails] = useState({});
  const [detailsImgs, SetdetailsImgs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addReport, setAddReport] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const images = [];
  // =============================================
  // Get API for Property data
  // =============================================
  const getDetails = async () => {
    dispatch(startLoader());
    await axios.get(`ad-detail/${id}`).then((resp) => {
      Setdetails(resp.data.ad);
      SetdetailsImgs(resp.data.ad.images);
    });
    dispatch(endLoader());
  };

  useEffect(() => {
    getDetails();
  }, []);
  useEffect(() => {
    detailsImgs.map((item, index) => {
      images.push({
        original: `${baseURLImg}adds/detail/lg/${item.image_name}`,
        thumbnail: `${baseURLImg}adds/detail/sm/${item.image_name}`,
      });
    });
  }, [detailsImgs]);

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
                      <Link to={`/services/${details?.service?.slug}`}>
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
                        <h4>{details && details.title}</h4>
                        <div className="d-flex">
                          <p>{details && details.short_description}</p>
                        </div>
                      </div>
                      <div className="perporty_description ">
                        <h4>Property Info</h4>
                        <div className="product_detials">
                          {details.specifications &&
                            details.specifications.map((item, index) => {
                              return (
                                <>
                                  <div className="p-3 d-flex product_detials_items">
                                    <div className="specif_name">
                                      <Icon icon="carbon:types" /> &nbsp;
                                      {item.attribute.title}
                                    </div>
                                    <div className="specif_value">Null</div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </div>
                      <div className="perporty_self_details">
                        <h4>Property Details</h4>
                        <p>{details?.detail_description}</p>
                      </div>
                    </div>
                    <div className="col-lg-4 ">
                      <div className="add_side_bar">
                        {" "}
                        <div className="perporty_sale_details mt-4 mt-md-0 ">
                          <div className="d-flex justify-content-between">
                            <h5>QAR {details && details.price}</h5>
                            <div>
                              <Icon icon="ant-design:share-alt-outlined" />
                              &nbsp;&nbsp;
                              <Icon icon="akar-icons:heart" />
                            </div>
                          </div>
                          <p>{details && details.title} </p>
                          <button className="report-ad" onClick={showModal}>
                            <Icon icon="ph:flag-banner" /> &nbsp;Report
                          </button>
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
                              <Link to="/">{details?.user?.name}</Link>
                              <p>Member since may 2022</p>
                            </div>
                            <div className="perporty_seller_contact mt-4">
                              <div className=" gap-2">
                                <a>
                                  <button className="phone_btn py-2">
                                    <Icon icon="carbon:phone-voice" />
                                    &nbsp;&nbsp;Phone
                                  </button>
                                </a>
                                <a>
                                  <button className="whats_btn mt-2 py-2">
                                    <Icon icon="ant-design:whats-app-outlined" />
                                    &nbsp; Whats app
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
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
      <Modal
        title="Report this ad"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        header={false}
      >
        <div className="report_ads_modal">
          {addReport ? (
            <div>
              <p className="report_note">
                Note: We only remove content that goes against our Community
                Standards.
              </p>
              <p className="report_discription">
                We remove content about any non-governmental group or person
                that engages in or supports planned acts of violence for
                political, religious or ideological reasons.
              </p>
              <button>Submit</button>
            </div>
          ) : (
            <>
              {" "}
              <h5>Please select a problem</h5>
              <p>
                If someone is in immediate danger, get help before reporting to
                dinero. Don't wait.
              </p>
              <ul>
                <li
                  className="d-flex justify-content-between align-item-center"
                  onClick={() => setAddReport(true)}
                >
                  Nudity <Icon icon="ic:baseline-navigate-next" />
                </li>
                <li
                  className="d-flex justify-content-between align-item-center"
                  onClick={() => setAddReport(true)}
                >
                  Spam <Icon icon="ic:baseline-navigate-next" />
                </li>
                <li
                  className="d-flex justify-content-between align-item-center "
                  onClick={() => setAddReport(true)}
                >
                  Violence <Icon icon="ic:baseline-navigate-next" />
                </li>
                <li
                  className="d-flex justify-content-between align-item-center"
                  onClick={() => setAddReport(true)}
                >
                  Hate Speech <Icon icon="ic:baseline-navigate-next" />
                </li>
              </ul>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
export default PropertyDetailPage;
