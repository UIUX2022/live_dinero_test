import "./auth.scss";
import React, { useState } from "react";
import Img from "../../images/authImg.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { notification } from "antd";
import axios from "axios";
import * as Yup from "yup";
import { COUNTRIES  } from "../../components/countryCode/countryCode";

const Register = () => {
  const [data, getData] = useState(null);
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
  };
  const [passShow, setPassShow] = useState(false);

  // ===============================================================
  // Formik SignUp from validation
  //  ===============================================================
  const validationSchema = Yup.object({
    // name: Yup.string()
    //   .min(3, "Please add min 3 digits")
    //   .max(50, "You can add max 50 digits")
    //   .required("This feild is required"),
    // email: Yup.string()
    //   .email("Please input your valid email!")
    //   .required("This feild is required"),
    // country_code: Yup.string().required("This feild is required"),
    // mobile_no: Yup.string()
    //   .min(8, "Please enter valid phone # (min : 8)")
    //   .max(8, "Please enter valid phone # (max : 8)")
    //   .required("This feild is required"),
    // gender: Yup.string().required("Please select you gender"),
    // password: Yup.string()
    //   .min(8, "Password required min 8 digits")
    //   .max(50, "You can add max 50 digits")
    //   .required("This feild is required"),
    // password_confirmation: Yup.string()
    //   .when("password", {
    //     is: (val) => (val && val.length > 0 ? true : false),
    //     then: Yup.string().oneOf(
    //       [Yup.ref("password")],
    //       "Both password need to be the same"
    //     ),
    //   })
    //   .required("This feild is required"),
  });

  const onSubmit = async (values, submitProps, event) => {
    console.log("my submit  values is", values);
    getData(values);
    await axios
      .post("auth/register", {
        name: "abu Sufian",
        email: "sufian111@gmail.com",
        country_code: "974",
        mobile_no: "12345678",
        gender: "male",
        date_of_birth: "12-7-2022",
        password: "12345678",
        password_confirmation: "12345678",
        account_type: "individual",
      })
      .then((respone) => {
        console.log("resjister API response is", respone);
      })
      .catch((error) => {
        console.log("Error register api is", error);
      });

    notification["success"]({
      message: "Address add successfully",
    });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  // ===============================================================
  // Submit from with api
  //  ===============================================================
  const signUp = async () => {};
  return (
    <div className="registerPage">
      <div className="registerPageDiv pt-4">
        <Link className="backtoHome" to="/">
          <Icon icon="ep:close-bold" />
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="px-3 ">Welcome To Dinero</h2>
              <p className="px-3 pt-2 m-0">*All fields are required </p>
              <div className="align-items-center row">
                <div className="col-md-12">
                  <h6 className="text-center py-2">
                    Register your account to access your desire services
                  </h6>
                </div>
                <div className="col-md-12">
                  <form className="px-3 " onSubmit={formik.handleSubmit}>
                    <div className="align-items-center row">
                      <div className="col-md-6">
                        <div className="login-input mt-3">
                          <label>
                            <Icon icon="clarity:user-line" inline={true} />
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                          <div className="error">{formik.errors.name}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6">
                        <div className="login-input mt-3">
                          <label>
                            <Icon icon="carbon:email" inline={true} />
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                          <div className="error">{formik.errors.email}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-4 pl-0">
                            <div className="login-input mt-4">
                              <label>
                                <Icon icon="clarity:world-solid" />
                                Code
                              </label>
                              <select
                                className="form-control"
                                name="country_code"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                defaultValue={formik.values.country_code}
                              >
                                {COUNTRIES.map((country, index) => {
                                  return (
                                    <>
                                      <option value={country.mobileCode} id={country.mobileCode}>{country.mobileCode}</option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                            {formik.touched.country_code &&
                            formik.errors.country_code ? (
                              <div className="error">
                                {formik.errors.country_code}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-8">
                            <div className="login-input mt-4">
                              <label>
                                <Icon icon="bx:phone" />
                                Phone
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="mobile_no"
                                value={formik.values.mobile_no}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.touched.mobile_no &&
                            formik.errors.mobile_no ? (
                              <div className="error">
                                {formik.errors.mobile_no}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="login-input mt-4">
                          <label>
                            <Icon icon="ic:baseline-date-range" />
                            DoB
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="DD-BB-YYYY"
                            value={formik.values.date_of_birth}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="date_of_birth"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className=" mt-4 d-flex add_gender justify-content-between">
                          <label>
                            <Icon icon="bytesize:user" />
                            Gender
                          </label>
                          <div>
                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value="male"
                              onChange={formik.handleChange}
                            />
                            &nbsp;&nbsp;
                            <label for="age1">Male</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value="female"
                              onChange={formik.handleChange}
                            />
                            &nbsp;&nbsp;
                            <label for="age2">Female</label>
                          </div>
                          {formik.touched.gender && formik.errors.gender ? (
                            <div className="error">{formik.errors.gender}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="login-input mt-4">
                          <label>
                          <Icon icon="entypo:add-user" />
                            Acount type
                          </label>
                          <select
                            className="form-control"
                            name="country_code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.country_code}
                          >
                            <option value="individual">individual</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 mt-4">
                        <div className="login-input mt-3">
                          <label>
                            <Icon icon="bx:lock" inline={true} />
                            Password
                          </label>
                          <input
                            type={passShow ? "text" : "password"}
                            className="form-control"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password"
                          />
                          {passShow ? (
                            <Icon
                              icon="fa-solid:eye"
                              onClick={() => setPassShow(!passShow)}
                            />
                          ) : (
                            <Icon
                              icon="fa-solid:eye-slash"
                              onClick={() => setPassShow(!passShow)}
                            />
                          )}
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                          <div className="error">{formik.errors.password}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mt-4">
                        <div className="login-input mt-3">
                          <label>
                            <Icon icon="bx:lock" inline={true} />
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={formik.values.password_confirmation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password_confirmation"
                          />
                          {passShow ? (
                            <Icon
                              icon="fa-solid:eye"
                              onClick={() => setPassShow(!passShow)}
                            />
                          ) : (
                            <Icon
                              icon="fa-solid:eye-slash"
                              onClick={() => setPassShow(!passShow)}
                            />
                          )}
                        </div>
                        {formik.touched.password_confirmation &&
                        formik.errors.password_confirmation ? (
                          <div className="error">
                            {formik.errors.password_confirmation}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-12 mt-4">
                        <div className="text-end">
                          <button className="eng-btn" type="submit">
                            SIGNUP NOW
                          </button>
                          <p className="signUp-note py-2 text-end">
                            Already have an account{" "}
                            <Link to="/login"> LogIn</Link>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="">
              <div className="outhImg pt-4 pt-md-0">
                <img src={Img} alt="img" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
