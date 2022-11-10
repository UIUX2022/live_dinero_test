import { Steps } from "antd";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./steps.scss";
const Step1 = (props) => {
  const { Step } = Steps;
  const [services, setServices] = useState([]);
  const [sebServices, setSubServices] = useState([]);
  const [country, Setcountry] = useState([]);
  const [city, SetCity] = useState([]);
  const ChangeService = (id) => {
    console.log("current id is", id);
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
  // Get Api for Cities
  // ===============================================================
  const getCities = async (id) => {
    console.log("my current id", id);
    await axios
      .get(`country/${id}/cities`)
      .then((resp) => {
        SetCity(resp.data.cities_by_country.cities);
      })
      .catch((error) => {
        console.log("get services error", error);
      });
  };
  useEffect(() => {
    getServices();
    getCountry();
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

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
    city_id: "",
    geo_location: {
      latitude: "",
      longitude: "",
    },
    complete_address: "",
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
    complete_address: Yup.string().required("This feild is required"),
  });
  const onSubmit = (values) => {
    console.log(" from data is", values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  useEffect(() => {
    ChangeService(formik.values.service);
  }, [formik.values.service]);
  useEffect(() => {
    getCities(formik.values.country_id);
    console.log("my current id", formik.values.country_id);
  }, [formik.values.country_id]);

  return (
    <>
      <div className="my-3 row">
        <div className="mySteps col-12">
          <Steps size="small" current={props.activeStep} className="px-5">
            <Step title="Infromation" />
            <Step title="Description & FAQ" />
            <Step title="Requirement" />
            <Step title="Publish" />
          </Steps>
        </div>
      </div>
      <div className="pageStyle pb-4">
        <div className="row">
          <div className="col-12">
            <div className="pageTitle text-start">Ad Infromation</div>
          </div>
        </div>
        <div className=" px-1 px-md-3 px-lg-5">
          <form className="serviceForm" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="mt-4 col-12 input-feilds">
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
