import { Steps, notification } from "antd";
import { Icon } from "@iconify/react";
import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./steps.scss";
import { startLoader, endLoader } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { PostApiWithHeader } from "../../services";

const Step1 = (props) => {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState("abc");
  const { Step } = Steps;
  const [services, setServices] = useState([]);
  const [sebServices, setSubServices] = useState([]);
  const [country, Setcountry] = useState([]);
  const [states, setStates] = useState([]);
  const [city, SetCity] = useState([]);
  const [attribute, Setattribute] = useState([]);

  // ===============================================================
  // Set SubService according to Main Service and
  // ===============================================================
  const ChangeService = (id) => {
    if (id == "") {
      setSubServices([]);
    } else {
      services.map((service, index) => {
        if (id == service.id) {
          setSubServices(service.sub_services);
        }
      });
    }
  };
  const saveImg = (img) => {
    const createImg = {
      type: img.type,
      filename: img.name,
      url: URL.createObjectURL(img),
    };
    setSelectedImage(createImg);
    const fromdata = new FormData();
    fromdata.append("image", img, img.name);
    formik.values.primary_image = fromdata;
  };
  // ===============================================================
  // Get Api for services with sub services
  // ===============================================================
  const getServices = async () => {
    await axios
      .get("services-with-sub")
      .then((resp) => {
        setServices(resp.data.services);
      })
      .catch((error) => {
        console.log("get services error", error);
      });
  };
  // ===============================================================
  //  Get Api for Country
  // ===============================================================
  const getCountry = async () => {
    dispatch(startLoader());
    await axios
      .get("countries")
      .then((resp) => {
        Setcountry(resp.data.countries);
        dispatch(endLoader());
      })
      .catch((error) => {
        console.log("get country API error", error);
      });
  };
  // ===============================================================
  // Get Api for Cities
  // ===============================================================
  const getCities = async (id) => {
    dispatch(startLoader());
    await axios
      .get(`state/${id}/cities`)
      .then((resp) => {
        SetCity(resp.data.state_with_cities);
        dispatch(endLoader());
      })
      .catch((error) => {
        console.log("get cities error", error);
      });
  };
  // ===============================================================
  // Get Api for States
  // ===============================================================
  const getStates = async (id) => {
    dispatch(startLoader());
    await axios
      .get(`country/${id}/states`)
      .then((resp) => {
        setStates(resp.data.states);
        dispatch(endLoader());
      })
      .catch((error) => {
        // console.log("get cities error", error);
      });
  };

  // ===============================================================
  // Get User Current Location
  // ===============================================================
  // function showPosition(position) {
  //   console.log("get user location function is working");
  //   console.log("Latitude: ", position.coords.latitude);
  //   console.log("Longitude: ", position.coords.longitude);
  // }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var positionInfo =
          "Your current position is (" +
          "Latitude: " +
          position.coords.latitude +
          ", " +
          "Longitude: " +
          position.coords.longitude +
          ")";
        document.getElementById("result").innerHTML = positionInfo;
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }

  useEffect(() => {
    getServices();
    getCountry();
    getLocation();
  }, []);
  const [specifications, setspecifications] = useState([]);
  // ===============================================================
  // Get Api for Service Attributes or specifications
  // ===============================================================

  const getserviceAttribut = async (id) => {
    dispatch(startLoader());
    await axios
      .get(`service/${id}/attributes`)
      .then((resp) => {
        // console.log(
        //   "attribute response is =================>",
        //   resp.data.services.attributes
        // );
        Setattribute(resp.data.services.attributes);
        dispatch(endLoader());
      })
      .catch((error) =>
        console.log("get services attributes api error", error)
      );
  };
  // ======================================================================
  // Formik Form Validations
  // =================================================================
  const [initialValues, setinitialValues] = useState({
    service: "",
    service_id: 0,
    title: "",
    short_description: "",
    detailed_description: "",
    country_id: "",
    state_id: "",
    city_id: "",
    geo_location: {
      latitude: "",
      longitude: "",
    },
    complete_address: "",
    primary_image: "",
  });
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Please add min 3 digits")
      .max(50, "You can add max 50 digits")
      .required("This feild is required"),
    service: Yup.string().required("Please select the services"),
    service_id: Yup.string().required("Please select sub services"),
    short_description: Yup.string()
      .required("This feild is required")
      .max(250, "You can add max 250 digits"),
    detailed_description: Yup.string()
      .required("This feild is required")
      .max(500, "You can add max 500 digits"),
    country_id: Yup.string().required("Please select your country"),
    city_id: Yup.string().required("Please select your city"),
    state_id: Yup.string().required("Please select your state"),
    complete_address: Yup.string().required("This feild is required"),
    // primary_image: Yup.string().required("Primary Img is required"),
  });

  const onSubmit = (values) => {
    const params = {
      service_id: values.service_id,
      title: values.title,
      short_description: values.short_description,
      detailed_description: values.detailed_description,
      country_id: values.country_id,
      state_id: values.state_id,
      city_id: values.city_id,
      area: "1.5",
      geo_location: location,
      complete_address: values.complete_address,
      specifications: attribute,
      primary_image: values.primary_image,
      ad_type_id: "1",
    };
    createAD(params);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  // ==================================================
  //  Get add specif Array
  // ==================================================
  const addSpecif = (key, value) => {
    let addNew = false;
    if (specifications.length == 0) {
      const newKey = {
        key: key,
        value: value,
      };
      setspecifications([...specifications, newKey]);
    }
    for (let i = 0; i < specifications.length; i++) {
      if (specifications[i].key == key) {
        specifications[i].value = value;
        addNew = false;
        break;
      } else {
        addNew = true;
      }
    }
    if (addNew) {
      const newKey = {
        key: key,
        value: value,
      };

      setspecifications([...specifications, newKey]);
    }
  };
  useEffect(() => {
    if (formik.values.service) {
      ChangeService(formik.values.service);
    }
  }, [formik.values.service]);

  useEffect(() => {
    if (formik.values.country_id) {
      getStates(formik.values.country_id);
    }
  }, [formik.values.country_id]);

  useEffect(() => {
    if (formik.values.state_id) {
      getCities(formik.values.state_id);
    }
  }, [formik.values.state_id]);

  useEffect(() => {
    if (formik.values.service_id) {
      getserviceAttribut(formik.values.service_id);
    }
  }, [formik.values.service_id]);
  // =====================================================
  // Create new AD Post API
  // =====================================================
  const createAD = async (params) => {
    dispatch(startLoader());
    try {
      const result = await PostApiWithHeader({
        route: "user/ad/store",
        token,
        params,
      });
      // console.log(" create use add api resp is", result);
      if (result?.data?.status == 200) {
        notification["success"]({
          message: `${result?.data?.message}`,
        });
        formik.resetForm();
        setStates([]);
        SetCity([]);
        setSubServices([]);
      } else {
        notification["error"]({
          message: `something want wrong please try again`,
        });
      }
    } catch (e) {
      console.log("error --", e.toString());
    }
    dispatch(endLoader());
  };

  return (
    <>
      <div className="pageStyle pb-4">
        <div className="row">
          <div className="col-12">
            <div className="pageTitle text-start">Ad Infromation</div>
          </div>
        </div>
        <div className=" px-1 px-md-3 px-lg-5">
          <form className="serviceForm" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12 mt-3">
                <div className="ad_profile input-feilds d-flex align-items-center">
                  <div>
                    <img
                      src={
                        selectedImage
                          ? selectedImage.url
                          : "/img/core_placeholder.png"
                      }
                      accept="image/*"
                      alt="not fount"
                    />
                    {formik.touched.primary_image &&
                    formik.errors.primary_image ? (
                      <div className="error">{formik.errors.primary_image}</div>
                    ) : null}
                  </div>

                  <div>
                    <input
                      type="file"
                      className="ms-3"
                      name="primary_image"
                      onChange={(event) => saveImg(event.target.files[0])}
                    />
                    <p className="px-3">Upload Ad Core Img</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12 input-feilds">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#263238;",
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  placeholder="ad title"
                  className="form-control"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="error">{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="mt-4 my-dropdown col-md-6 input-feilds">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#263238;",
                  }}
                >
                  Service
                </label>
                <select
                  className="form-control"
                  onChange={formik.handleChange}
                  name="service"
                  value={formik.values.service}
                  onBlur={formik.handleBlur}
                >
                  <option value="">select services</option>
                  {services.map((service, index) => {
                    return (
                      <option
                        id={index}
                        value={service.id}
                        onClick={() => alert("on click is working")}
                      >
                        {service?.title}
                      </option>
                    );
                  })}
                </select>
                <Icon icon="gridicons:dropdown" />
                {formik.touched.service && formik.errors.service ? (
                  <div className="error">{formik.errors.service}</div>
                ) : null}
              </div>
              <div className={"mt-4 my-dropdown col-md-6 input-feilds"}>
                {sebServices.length == 0 ? null : (
                  <>
                    <label
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#263238;",
                      }}
                    >
                      Sub Service
                    </label>
                    <select
                      className="form-control"
                      name="service_id"
                      value={formik.values.service_id}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option value="">select sub services</option>
                      {sebServices.map((subservice, index) => {
                        return (
                          <option value={subservice.id}>
                            {subservice.title}
                          </option>
                        );
                      })}
                    </select>
                    <Icon icon="gridicons:dropdown" />
                    {formik.touched.service_id && formik.errors.service_id ? (
                      <div className="error">{formik.errors.service_id}</div>
                    ) : null}
                  </>
                )}
              </div>
              <div className="mt-4 col-md-12 input-feilds">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#263238;",
                  }}
                >
                  Short Description
                </label>
                <input
                  type="text"
                  placeholder="add short description"
                  className="form-control"
                  name="short_description"
                  value={formik.values.short_description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.short_description &&
                formik.errors.short_description ? (
                  <div className="error">{formik.errors.short_description}</div>
                ) : null}
              </div>
              <div className="mt-4 col-md-12 input-feilds">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#263238;",
                  }}
                >
                  Detail Description
                </label>
                <textarea
                  className="form-control"
                  cols="10"
                  rows="5"
                  name="detailed_description"
                  value={formik.values.detailed_description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></textarea>
                {formik.touched.detailed_description &&
                formik.errors.detailed_description ? (
                  <div className="error">
                    {formik.errors.detailed_description}
                  </div>
                ) : null}
              </div>
              <div className="mt-4 my-dropdown col-md-6 input-feilds">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#263238;",
                  }}
                >
                  Country
                </label>
                <select
                  className="form-control"
                  name="country_id"
                  value={formik.values.country_id}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value="">select country</option>
                  {country &&
                    country.map((country, index) => {
                      return (
                        <option value={country.id} id={index}>
                          {country.name}
                        </option>
                      );
                    })}
                </select>
                <Icon icon="gridicons:dropdown" />
                {formik.touched.country_id && formik.errors.country_id ? (
                  <div className="error">{formik.errors.country_id}</div>
                ) : null}
              </div>
              <div className="mt-4 my-dropdown col-md-6 input-feilds">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#263238;",
                  }}
                >
                  State
                </label>
                <select
                  className="form-control"
                  name="state_id"
                  value={formik.values.state_id}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value="">select state</option>
                  {states &&
                    states.map((state, index) => {
                      return (
                        <option value={state.id} key={state.id}>
                          {state.name}
                        </option>
                      );
                    })}
                </select>
                <Icon icon="gridicons:dropdown" />
                {formik.touched.state_id && formik.errors.state_id ? (
                  <div className="error">{formik.errors.state_id}</div>
                ) : null}
              </div>
              <div className="mt-4 my-dropdown col-md-6 input-feilds">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#263238;",
                  }}
                >
                  City
                </label>
                <select
                  className="form-control"
                  name="city_id"
                  value={formik.values.city_id}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value="">select city</option>
                  {city &&
                    city.map((city, index) => {
                      return (
                        <option value={city.id} key={city.id}>
                          {city.name}
                        </option>
                      );
                    })}
                </select>
                <Icon icon="gridicons:dropdown" />
                {formik.touched.city_id && formik.errors.city_id ? (
                  <div className="error">{formik.errors.city_id}</div>
                ) : null}
              </div>
              <div className="mt-4 col-12 input-feilds">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#263238;",
                  }}
                >
                  Address
                </label>
                <input
                  type="text"
                  placeholder="complete address"
                  className="form-control"
                  name="complete_address"
                  value={formik.values.complete_address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.complete_address &&
                formik.errors.complete_address ? (
                  <div className="error">{formik.errors.complete_address}</div>
                ) : null}
              </div>

              {attribute.length > 0 ? (
                <div className="servies_specfication mt-3">
                  {attribute.map((attribute) => {
                    return (
                      <>
                        <div
                          className="service_att_tab mt-3"
                          key={attribute.id}
                        >
                          <h5>{attribute.title}</h5>
                          <div className="row">
                            {attribute.keys.map((item) => {
                              return (
                                <div className="col-3 mt-1">
                                  <input
                                    type="radio"
                                    value={item.id}
                                    name={attribute.id}
                                    onClick={() =>
                                      addSpecif(attribute.id, item.id)
                                    }
                                  />
                                  &nbsp;
                                  {item.title}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              ) : null}

              <div className="text-end mt-5 col-12">
                <button
                  className="save_Steps"
                  type="submit"
                  onClick={() => props.setActiveStep(0)}
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Step1;
