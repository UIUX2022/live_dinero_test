import "./profileSetting.scss";
import AdminLayout from "../../layouts/dashboard/dashboard";
import React, { useState, useEffect } from "react";
import { GetApiWithHeader, PostApiWithHeader } from "../../services";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { COUNTRIES } from "../../components/countryCode/countryCode";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Icon } from "@iconify/react";
import { notification } from "antd";
import { startLoader, endLoader, addUser, addtoken } from "../../redux/actions";

const ProfileSetting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);
  const [userData, setUserData] = useState({});
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  // ==============================================
  // Get Api for User Profile
  // ==============================================
  const getuserData = async () => {
    try {
      dispatch(startLoader());
      const result = await GetApiWithHeader({
        route: "user/profile/edit",
        token,
      });

      if (result.status == 200) {
        setUserData(result.user);
      }
      dispatch(endLoader());
    } catch (e) {
      console.log("Profile api error --", e.toString());
    }
  };
  // ==============================================
  // Get Api for User Profile
  // ==============================================
  const getCountry = async () => {
    dispatch(startLoader());
    await axios
      .get("countries")
      .then((resp) => {
        setCountry(resp.data.countries);
        dispatch(endLoader());
      })
      .catch((error) => {
        // console.log("get country API error", error);
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
  // Get Api for Cities
  // ===============================================================
  const getCities = async (id) => {
    dispatch(startLoader());
    await axios
      .get(`state/${id}/cities`)
      .then((resp) => {
        // console.log("get data for city", resp.data.state_with_cities);
        setCity(resp.data.state_with_cities);
        dispatch(endLoader());
      })
      .catch((error) => {
        // console.log("get cities error", error);
      });
  };
  // ==============================================
  // formik from validation start
  // ==============================================
  const initialValues = {
    name: "",
    email: "",
    country_code: "",
    mobile_no: "",
    date_of_birth: "",
    gender: "",
    password: "",
    password_confirmation: "",
    account_type: "",
    country_id: "",
    state_id: "",
    city_id: "",
    complete_address: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Please add min 3 digits")
      .max(50, "You can add max 50 digits")
      .required("This feild is required"),
    email: Yup.string()
      .email("Please input your valid email!")
      .required("This feild is required"),
    country_code: Yup.string().required("This feild is required"),
    mobile_no: Yup.string()
      .min(8, "Please enter valid phone # (min : 8)")
      .max(8, "Please enter valid phone # (max : 8)")
      .required("This feild is required"),
    gender: Yup.string().required("Please select you gender"),
    account_type: Yup.string().required("This feild is required"),
    country_id: Yup.string().required("Please select your country"),
    city_id: Yup.string().required("Please select your city"),
    state_id: Yup.string().required("Please select your state"),
    complete_address: Yup.string().required("This feild is required"),
  });
  const onSubmit = async (values) => {
    dispatch(startLoader())

    const params = values;
    const result = await PostApiWithHeader({
      route: "user/profile/update",
      token,
      params,
    });
    if (result.data.status == 200) {
      notification["success"]({
        message: `${result.data.message}`,
      });
    } else if (result.data.status == 401 || result.data.status == 500) {
      dispatch(addUser({}));
      dispatch(addtoken(""));
      navigate("/");
    } else {
      notification["error"]({
        message: `${result.data.error}`,
      });
    }
    dispatch(endLoader())
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  useEffect(() => {
    getuserData();
    getCountry();
  }, []);
  useEffect(() => {
    formik.values.name = userData.name;
    formik.values.email = userData.email;
    formik.values.gender = userData.gender;
    formik.values.date_of_birth = userData.date_of_birth;
    formik.values.country_code = userData.country_code;
    formik.values.mobile_no = user.mobile_no;
    formik.values.city_id = user.city_id ? user.city_id : "";
    formik.values.country_id = user.country_id ? user.country_id : "";
    formik.values.state_id = user.state_id ? user.state_id : "";
    formik.values.account_type = user.account_type;
    formik.values.complete_address = user.complete_address
      ? user.complete_address
      : "";
  }, [userData]);

  useEffect(() => {
    getStates(formik.values.country_id);
  }, [formik.values.country_id]);
  useEffect(() => {
    getCities(formik.values.state_id);
  }, [formik.values.state_id]);
  console.log(user, formik.values.country_id);
  return (
    <AdminLayout>
      <div className="profileUpdate">
        <div className="row">
          <div className="col-md-12">
            <div className="pageTitle text-start">General Information</div>
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="profilePic text-center">
                  <img src="/img/profile1.jpg" alt="prfilePic" />
                  <button className="removeProfile mt-3  py-1">
                    Remove Photo
                  </button>
                </div>
              </div>
              <div className="col-md-8">
                {initialValues ? (
                  <form
                    className="profile_form "
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="row">
                      <div md={12} className=" mt-4 col-md-12 text-start">
                        <label>Name:</label>
                        <input
                          type="text"
                          className="form-control "
                          placeholder="Full name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="error">{formik.errors.name}</div>
                        ) : null}
                      </div>
                      <div md={12} className=" mt-4 col-md-12 text-start">
                        <label>Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="error">{formik.errors.email}</div>
                        ) : null}
                      </div>
                      <div className="text-start mt-4 col-md-6">
                        <label>Gender</label>
                        <select
                          className="form-control "
                          name="gender"
                          onChange={formik.handleChange}
                          defaultValue={formik.values.name}
                        >
                          <option value="male">Male</option>
                          <option value="famle" selected>
                            Female
                          </option>
                        </select>
                        {formik.touched.gender && formik.errors.gender ? (
                          <div className="error">{formik.errors.gender}</div>
                        ) : null}
                      </div>
                      <div className="mt-4 my-dropdown col-md-6 input-feilds text-start">
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
                          <option value="">select city</option>
                          {country &&
                            country.map((country, index) => {
                              return (
                                <option value={country.id} key={city.id}>
                                  {country.name}
                                </option>
                              );
                            })}
                        </select>
                        <Icon icon="gridicons:dropdown" />
                        {formik.touched.country_id &&
                        formik.errors.country_id ? (
                          <div className="error">
                            {formik.errors.country_id}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-4 my-dropdown col-md-6 input-feilds text-start">
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
                      <div className="mt-4 my-dropdown col-md-6 input-feilds text-start">
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
                          <option value="">select state</option>
                          {city &&
                            city.map((city, index) => {
                              return (
                                <option value={city.id} key={city.state}>
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
                      <div className="text-start mt-4 col-md-6">
                        <label>DOB</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="date"
                          value={formik.values.date_of_birth}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="date_of_birth"
                        />
                      </div>
                      <div className="text-start mt-4 col-md-6">
                        <div className="row">
                          <div className="text-start col-3 pe-0">
                            <label>Code</label>
                            <select
                              className="form-control "
                              name="country_code"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.country_code}
                            >
                              {COUNTRIES.map((country, index) => {
                                return (
                                  <>
                                    <option
                                      value={country.mobileCode}
                                      id={country.mobileCode}
                                    >
                                      {country.mobileCode}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                            {formik.touched.country_code &&
                            formik.errors.country_code ? (
                              <div className="error">
                                {formik.errors.country_code}
                              </div>
                            ) : null}
                          </div>
                          <div className="text-start col-9">
                            <label>Phone</label>
                            <input
                              type="number"
                              className="form-control"
                              name="mobile_no"
                              value={formik.values.mobile_no}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.mobile_no &&
                            formik.errors.mobile_no ? (
                              <div className="error">
                                {formik.errors.mobile_no}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="text-start mt-4 col-md-6">
                        <label>Acount type</label>
                        <select
                          className="form-control "
                          name="account_type"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.account_type}
                        >
                          <option value=""></option>
                          <option value="individual">individual</option>
                        </select>
                        {formik.touched.account_type &&
                        formik.errors.account_type ? (
                          <div className="error">
                            {formik.errors.account_type}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-4 col-12 input-feilds text-start">
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
                          <div className="error">
                            {formik.errors.complete_address}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-submit  mt-5 text-end">
                        <button type="submit">Save Changes</button>
                      </div>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default ProfileSetting;
