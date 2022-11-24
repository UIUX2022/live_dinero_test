import "./propertyDetails.scss";
import { Icon } from "@iconify/react";
import Profile from "../../images/profileUser.png";
import MainLayout from "../../layouts/mainLayout/mainLayout.jsx";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import axios from "axios";
import { startLoader, endLoader } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { baseURLImg } from "../../routes/routes";
import OwlCarousel from "react-owl-carousel";
import PropertyCard from "../../components/propertyCard/propertyCard";
import { Modal } from "antd";
import { PostApiWithHeader, GetApiWithHeader } from "../../services/index";
import { notification } from "antd";
import moment from "moment";
const PropertyDetailPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer.token);
  const options = {
    margin: 10,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    loop: true,
    smartSpeed: 600,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };
  const dispatch = useDispatch();
  let { id } = useParams();
  const [details, Setdetails] = useState({});
  const [detailsImgs, SetdetailsImgs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addReport, setAddReport] = useState(null);
  const [relatedAds, SetrelatedAds] = useState([]);
  const [reportReas, SetReportRes] = useState([]);
  const [reportDetails, setreportDetail] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setAddReport(null);
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
      SetrelatedAds(resp.data.realted_ads);
    });
    dispatch(endLoader());
  };
  // =============================================
  // Get API for Report Reasons
  // =============================================
  const getReportReas = async () => {
    await axios
      .get("report-reasons")
      .then((resp) => {
        if (resp.data.status == 200) {
          SetReportRes(resp.data.report_reasons);
        }
      })
      .catch((error) => {
        console.log("get api error is report-reasons", error);
      });
  };
  useEffect(() => {
    getDetails();
    getReportReas();
  }, []);
  useEffect(() => {
    detailsImgs.map((item, index) => {
      images.push({
        original: `${baseURLImg}adds/detail/lg/${item.image_name}`,
        thumbnail: `${baseURLImg}adds/detail/sm/${item.image_name}`,
      });
    });
  }, [detailsImgs]);
  // =============================================
  // Post API for AD Report
  // =============================================
  const PostAdReport = async () => {
    const params = {
      ad_id: details.id,
      report_reason_id: addReport,
      comment: reportDetails,
    };
    try {
      const result = await PostApiWithHeader({
        route: "user/ad/report",
        token,
        params,
      });
      if (result.data.status == 200) {
        notification["success"]({
          message: `${result.data.message}`,
        });
      } else if (result.response.status == 401) {
        navigate("/login");
      }
    } catch (error) {
      console.log("post ad report error", error);
    }

    setIsModalOpen(false);
    setAddReport(null);
    setreportDetail("");
  };
  // =============================================
  // Post API to Set Ad Fav
  // =============================================
  const setAdFav = async () => {
    try {
      const result = await GetApiWithHeader({
        route: `user/ad/like/${details.id}`,
        token,
      });
      if (result.data.status == 200) {
        notification["success"]({
          message: `${result.data.message}`,
        });
      }
      else if(result.response.status == 401){
        navigate("/login");
      }
    } catch (e) {
      console.log("set ad like api error", e);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="property_detailPage px-1 px-md-5">
          <div className="container-fuild">
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
                      <div className="silder_div">
                        {detailsImgs?.length > 0 ? (
                          <ImageGallery items={images} />
                        ) : (
                          <img
                            src={`${baseURLImg}adds/primary/lg/${details?.primary_image}`}
                            alt="pri_img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/img/placeholder.png";
                            }}
                            className="primary_image"
                          />
                        )}
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
                                    <div className="specif_value">
                                      {item.key.title}
                                    </div>
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
                      <div className="property_locations">
                        <h4>Property Location</h4>
                        <div className="property_locations">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27219.49487772679!2d74.30641360941783!3d31.484673856109683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904106691c4c7%3A0xfb24ddaf1e7bc6c2!2sModel%20Town%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1669192769437!5m2!1sen!2s"
                            width="100%"
                            height=" 350"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 ">
                      <div className="add_side_bar">
                        <div className="perporty_sale_details mt-4 mt-md-0 ">
                          <div className="d-flex justify-content-between">
                            <h5>QAR {details && details.price}</h5>
                            <div onClick={setAdFav}>
                              <Icon icon="akar-icons:heart" />
                            </div>
                          </div>
                          <p>{details && details.title} </p>
                          <button className="report-ad" onClick={showModal}>
                            <Icon icon="ph:flag-banner" /> &nbsp;Report
                          </button>
                          <div className="d-flex justify-content-between mt-4 perporty_details_footer">
                            <span>
                              <Icon icon="material-symbols:location-on-outline-rounded" />
                              {details?.country?.name}.
                            </span>
                            <span>
                              <Icon icon="mdi:clock-time-five-outline" />
                              &nbsp;
                              {moment(details?.updated_at).format("DD-MM-YYYY")}
                            </span>
                          </div>
                        </div>
                        <div className="perporty_saler_details mt-4">
                          <h3>Contact With Seller</h3>
                          <div className="perporty_saler_info pt-2 ">
                            <img
                              src={`${baseURLImg}adds/primary/lg/${details?.primary_image}`}
                              alt="pri_img"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/placeholder.png";
                              }}
                              className="primary_image"
                            />
                            <div className="px-1">
                              <Link to={`/individual/${details?.user?.slug}`}>
                                {details?.user?.name}
                              </Link>
                              <p>Member since may 2022</p>
                            </div>
                            <div className="perporty_seller_contact mt-4">
                              <div className=" gap-2">
                                <a
                                  href={`tel:${details?.user?.country_code}${details?.user?.mobile_no}`}
                                >
                                  <button className="phone_btn py-2">
                                    <Icon icon="carbon:phone-voice" />
                                    &nbsp;&nbsp;Phone
                                  </button>
                                </a>
                                <a
                                  href={`https://api.whatsapp.com/send?phone=${details?.user?.country_code}${details?.user?.mobile_no}`}
                                >
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
            <div className="row">
              <div className="realted_ads my-3 ">
                <h3>Realted Ads</h3>
                <div className="realted-ads-slider py-2">
                  {relatedAds.length > 0 ? (
                    <>
                      <OwlCarousel className="owl-theme" {...options}>
                        {relatedAds.map((item, index) => {
                          return (
                            <>
                              <PropertyCard data={item} />
                            </>
                          );
                        })}
                      </OwlCarousel>
                    </>
                  ) : (
                    <>
                      <div className="realtedAdd_no d-flex align-items-center justify-content-center">
                        <div className="text-center">
                          <Link to="/user/create/services">
                            <Icon icon="material-symbols:add-chart-rounded" />
                          </Link>

                          <h6 className="mb-0">No Ads Founds</h6>
                        </div>
                      </div>
                    </>
                  )}
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
              <textarea
                className="form-control"
                row="10"
                onChange={(e) => setreportDetail(e.target.value)}
                value={reportDetails}
              ></textarea>
              <button onClick={PostAdReport} className="mt-2">
                Submit
              </button>
            </div>
          ) : (
            <>
              <h5>Please select a Report Reason</h5>
              <ul>
                {reportReas &&
                  reportReas.map((item, index) => {
                    return (
                      <>
                        <li
                          className="d-flex justify-content-between align-item-center"
                          onClick={() => setAddReport(item.id)}
                          key={index}
                        >
                          {item.reason}
                          <Icon icon="ic:baseline-navigate-next" />
                        </li>
                      </>
                    );
                  })}
              </ul>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
export default PropertyDetailPage;
