import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import "./auth.scss";
import {
  addUser,
  addtoken,
  startLoader,
  endLoader,
} from "../../redux/actions/index";
const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please input your valid email!")
      .required("This feild is required"),

    password: Yup.string().required("This feild is required"),
  });
  const onSubmit = async (values) => {
    dispatch(startLoader());
    await axios
      .post("auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((resp) => {
        if (resp.data.status == 200) {
          dispatch(addtoken(resp.data.token));
          dispatch(addUser(resp.data.user));
         
        } else {
          notification.error({
            message: "Error",
            description: `${resp.data.errors}`,
          });
        }
      });
    dispatch(endLoader());
  };
  // ===============================================================
  // Formik Login from validation
  //  ===============================================================

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const [passShow, setPassShow] = useState(false);

  useEffect(() => {
    if (token) {
      return navigation("/");
    }
 
  }, [token]);
  return (
    <div className="registerPage">
      <div className="registerPageDiv pt-4">
        <Link className="backtoHome" to="/">
          <Icon icon="ep:close-bold" />
        </Link>
        <div div className="contianer">
          <div className="row">
            <div className="col-12">
              <h2 className="px-3 ">Welcome To Dinero</h2>
              <p className="px-3 pt-2 m-0">*All fields are required </p>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="text-center px-lg-5 px-md-2 px-0">
                    Sign in to continue access your account
                  </h6>
                </div>
                <div className="col-md-6">
                  <form className="px-3 " onSubmit={formik.handleSubmit}>
                    <div className="align-items-center row">
                      <div className="col-12">
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
                      <div className="col-12">
                        <div className="login-input mt-4">
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
                      <div className="col-12  mt-4" m>
                        <div className="d-flex justify-content-between">
                          <Link to="/updatepass" className="forgot-link">
                            Forgot Possward
                          </Link>
                          <div className="text-end">
                            <button className="eng-btn" type="submit">
                              LOGIN NOW
                            </button>
                          </div>
                        </div>
                        <p className="signUp-note py-2 text-end">
                          Don’t have an account{" "}
                          <Link to="/signup">Create Account</Link>.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12">
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
export default Login;
