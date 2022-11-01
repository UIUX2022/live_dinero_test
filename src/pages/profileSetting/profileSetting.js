import "./profileSetting.scss";
import AdminLayout from "../../layouts/dashboard/dashboard";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
const ProfileSetting = () => {
    const [oldpass, setOldPass] = useState(false);
    const [newpass, setNewPass] = useState(false);
    const [confirmpass, setConfirmPass] = useState(false);
  return (
    <AdminLayout>
      <div className="py-3 profileUpdate">
        <div className="row">
          <div className="col-md-12">
            <div className="pageTitle text-start">General Information</div>
          </div>
          <div className="col-md-2">
            <div className="profilePic mt-3">
              <img src="/img/profile1.jpg" alt="prfilePic" />
              <button className="removeProfile mt-3  py-1">Remove Photo</button>
            </div>
          </div>
          <div className="col-md-10">
            <form className="profile_form ">
              <div className="row">
                <div md={12} className=" mt-4 col-md-12">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Full name"
                  />
                </div>
                <div md={12} className=" mt-4 col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                  />
                </div>
                <div  className="text-start mt-4 col-md-6">
                  <label>Gender</label>
                  <select className="form-control ">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="text-start mt-4 col-md-6">
                  <label>DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="date"
                  />
                </div>
                <div className="text-start mt-4 col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="About"
                  />
                </div>
                <div className="form-submit  mt-4 text-end">
                  <button>Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-4 row">
          <div className="col-12">
            <div className="pageTitle text-start">Password Update</div>
            <form className="changePassword profile_form">
              <div className="row">
                <div md={4} className="mt-4 input-col col-md-4">
                  <input
                    type={oldpass ? "text" : "password"}
                    className="form-control"
                    placeholder="Old password"
                  />
                  {oldpass ? (
                    <Icon
                      icon="akar-icons:eye-open"
                      inline={true}
                      onClick={() => setOldPass(!oldpass)}
                    />
                  ) : (
                    <Icon
                      icon="clarity:eye-hide-line"
                      inline={true}
                      onClick={() => setOldPass(!oldpass)}
                    />
                  )}
                </div>
                <div className="mt-4 input-col col-md-4">
                  <input
                    type={newpass ? "text" : "password"}
                    className="form-control"
                    placeholder="New password"
                  />
                  {newpass ? (
                    <Icon
                      icon="akar-icons:eye-open"
                      inline={true}
                      onClick={() => setNewPass(!newpass)}
                    />
                  ) : (
                    <Icon
                      icon="clarity:eye-hide-line"
                      inline={true}
                      onClick={() => setNewPass(!newpass)}
                    />
                  )}
                </div>

                <div className="mt-4 input-col col-md-4">
                  <input
                    type={confirmpass ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm password"
                  />

                  {confirmpass ? (
                    <Icon
                      icon="akar-icons:eye-open"
                      inline={true}
                      onClick={() => setConfirmPass(!confirmpass)}
                    />
                  ) : (
                    <Icon
                      icon="clarity:eye-hide-line"
                      inline={true}
                      onClick={() => setConfirmPass(!confirmpass)}
                    />
                  )}
                </div>
                <div className="form-submit  mt-4 text-end">
                  <button>Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default ProfileSetting;
