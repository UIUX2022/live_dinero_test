import "./editAds.scss";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { GetApiWithHeader, PostApiWithHeader } from "../../services";
import { addUser, addtoken } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { baseURLImg } from "../../routes/routes";
import { notification } from "antd";
const EditAds = ({ id, editModalOk }) => {
  const token = useSelector((state) => state.authReducer.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adEdit, setAdEdit] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState("abc");
  const [services, setServices] = useState([]);
  const [sebServices, setSubServices] = useState([]);
  const [country, Setcountry] = useState([]);
  const [states, setStates] = useState([]);
  const [city, SetCity] = useState([]);
  const [attribute, Setattribute] = useState([]);
  const [specifications, setspecifications] = useState([]);
  // ===============================================================
  // Get Api for Cities
  // ===============================================================
  const getCities = async (id) => {
    await axios
      .get(`state/${id}/cities`)
      .then((resp) => {
        SetCity(resp.data.state_with_cities);
      })
      .catch((error) => {
        console.log("get cities error", error);
      });
  };
  // ===============================================================
  // Get Api for States
  // ===============================================================
  const getStates = async (id) => {
    await axios
      .get(`country/${id}/states`)
      .then((resp) => {
        setStates(resp.data.states);
      })
      .catch((error) => {
        // console.log("get cities error", error);
      });
  };
  // ===============================================================
  //  Get Api for Country
  // ===============================================================
  const getCountry = async () => {
    await axios
      .get("countries")
      .then((resp) => {
        Setcountry(resp.data.countries);
      })
      .catch((error) => {
        console.log("get country API error", error);
      });
  };
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
  // save Img for Primary-img
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

  // ======================================================================
  // Formik Form Validations
  // =================================================================
  const [initialValues, setinitialValues] = useState({
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
    price: "",
  });
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Please add min 3 digits")
      .max(50, "You can add max 50 digits")
      .required("This feild is required"),

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
    price: Yup.string().required("This feild is required"),
    // primary_image: Yup.string().required("Primary Img is required"),
  });

  const onSubmit = async (values) => {
    
    const params = {
      _method: "put",
      title: values.title,
      short_description: values.short_description,
      detail_description: values.detailed_description,
      country_id: values.country_id,
      state_id: values.state_id,
      city_id: values.city_id,
      complete_address: values.complete_address,
      primary_image: values.primary_image,
      price: values.price,
    };
    const result = await PostApiWithHeader({
      route: `user/ad/${id}/update`,
      params,
      token,
    });

    if (result?.data?.status == 200) {
      notification["success"]({
        message: `${result.data.message}`,
      });
      editModalOk();
    } else if (result?.response?.status == 400 || result?.response?.status == 500) {
      dispatch(addtoken(""));
      dispatch(addUser({}));
      navigate("/");
      editModalOk();
    } else {
      notification["error"]({
        message: "something went wrong please try again",
      });
      editModalOk();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  useEffect(() => {
    if (adEdit) {
      formik.values.title = adEdit?.title;
      formik.values.short_description = adEdit?.short_description
        ? adEdit?.short_description
        : "";
      formik.values.detailed_description = adEdit?.detail_description
        ? adEdit?.detail_description
        : "";
      formik.values.country_id = adEdit?.country_id;
      formik.values.state_id = adEdit?.state_id ? adEdit?.state_id : 0;
      formik.values.city_id = adEdit?.city_id ? adEdit?.city_id : 0;
      formik.values.complete_address = adEdit?.complete_address
        ? adEdit?.complete_address
        : " ";
      formik.values.primary_image = adEdit?.primary_image
        ? adEdit?.primary_image
        : "";
      formik.values.price = adEdit?.price;
    }
  }, [adEdit]);

  useEffect(() => {
    (async () => {
      const result = await GetApiWithHeader({
        route: `user/ad/${id}/edit`,
        token,
      });
      if (result.data.status == 200) {
        setAdEdit(result.data.ad);
      } else if (
        result.response.status == 401 ||
        result.response.status == 500
      ) {
        dispatch(addtoken(""));
        dispatch(addUser({}));
        navigate("/");
      }
    })();
    getCountry();
  }, [id]);
  useEffect(() => {
    if (formik.values.country_id) {
      getStates(formik.values.country_id);
    }
  }, [formik.values.country_id]);
  useEffect(() => {
    if (formik.values.service) {
      ChangeService(formik.values.service);
    }
  }, [formik.values.service]);
  useEffect(() => {
    if (formik.values.state_id) {
      getCities(formik.values.state_id);
    }
  }, [formik.values.state_id]);
  return (
    <>
      <div className="adEditor">
        <form className="serviceForm" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 mt-3">
              <div className="ad_profile input-feilds d-flex align-items-center">
                <div>
                  {selectedImage ? (
                    <img
                      src={
                        selectedImage
                          ? selectedImage.url
                          : "/img/core_placeholder.png"
                      }
                      accept="image/*"
                      alt="not fount"
                    />
                  ) : (
                    <img
                      src={`${baseURLImg}adds/detail/lg${formik.values.primary_image}`}
                      alt=""
                      img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/img/core_placeholder.png";
                      }}
                    />
                  )}

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
            <div className="col-12">
              <div className="row">
                <div className="mt-3 col-lg-6 col-md-10 col-12 input-feilds">
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "#263238;",
                    }}
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="ad Price"
                    className="form-control"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div className="error">{formik.errors.price}</div>
                  ) : null}
                </div>
              </div>
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
                      <div className="service_att_tab mt-3" key={attribute.id}>
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
              <button className="save_Steps" type="submit">
                Save Updates
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditAds;
