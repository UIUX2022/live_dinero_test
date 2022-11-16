import "./resetPassword.scss";
import AdminLayout from "../../layouts/dashboard/dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PostApiWithHeader } from "../../services";
import { useSelector, useDispatch } from "react-redux";
import { startLoader, endLoader, addUser, addtoken } from "../../redux/actions";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const initialValues = {
    oldpass: "",
    newpass: "",
    confpass: "",
  };
  // ==================================================
  // Form Validation
  // ==================================================
  const validationSchema = Yup.object({
    oldpass: Yup.string().required("old password is required"),
    newpass: Yup.string()
      .min(8, "Password required min 8 digits")
      .max(50, "You can add max 50 digits")
      .required("This feild is required"),
    confpass: Yup.string()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newpass")],
          "Both password need to be the same"
        ),
      })
      .required("This feild is required"),
  });
  const onSubmit = (values) => {
    const params = {
      old_password: values.oldpass,
      new_password: values.newpass,
    };
    resetPassword(params);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  // ==========================================
  // Post API for reset password
  // ==========================================
  const resetPassword = async (params) => {
    dispatch(startLoader());
    const result = await PostApiWithHeader({
      route: "user/profile/password/update",
      token,
      params,
    });
    console.log("update password result is", result);

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
        message: `${result.data.errors}`,
      });
    }
    dispatch(endLoader());
  };
  return (
    <>
      <AdminLayout>
        <div className="reset_password">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle text-start">Reset Password</div>
            </div>
          </div>
          <div className="row pb-3">
            <form className="px-5 profile_form" onSubmit={formik.handleSubmit}>
              <div className=" mt-4 col-md-8 text-start form_validation">
                <label>Old Password:</label>
                <input
                  type="password"
                  className="form-control "
                  placeholder="Enter your old password"
                  name="oldpass"
                  value={formik.values.oldpass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.oldpass && formik.errors.oldpass ? (
                  <div className="error">{formik.errors.oldpass}</div>
                ) : null}
              </div>
              <div className=" mt-4 col-md-8 text-start form_validation">
                <label>New Password:</label>
                <input
                  type="password"
                  className="form-control "
                  placeholder="Enter your new password"
                  name="newpass"
                  value={formik.values.newpass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newpass && formik.errors.newpass ? (
                  <div className="error">{formik.errors.newpass}</div>
                ) : null}
              </div>
              <div className=" mt-4 col-md-8 text-start form_validation">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  className="form-control "
                  placeholder="Enter your confirm password"
                  name="confpass"
                  value={formik.values.confpass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confpass && formik.errors.confpass ? (
                  <div className="error">{formik.errors.confpass}</div>
                ) : null}
              </div>
              <div className="col-md-8 mt-4 text-end">
                <button type="submit">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default ResetPassword;
