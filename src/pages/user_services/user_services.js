import Adminlayout from "../../layouts/dashboard/dashboard";
import ProfileCard from "../../components/profileCard/profileCard";
import AddNewService from "../../components/addNewService/addNewService";
import "./user_services.scss";
import { GetApiWithHeader, PostApiWithHeader } from "../../services";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs } from "antd";
import UserServiceCard from "../../components/UserServiceCard/userServiceCard";
import { startLoader, endLoader, addUser, addtoken } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
const UserServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer.token);
  const [ads, setAds] = useState([]);

  const getUserAds = async () => {
    try {
      const result = await GetApiWithHeader({
        route: "user/ad/listing",
        token,
      });
      console.log("get user all ads", result);
      if (result?.data?.status == 200) {
        console.log("user ads list is", result);

        setAds(result?.data?.ads.data);
      } else if (
        result?.response?.status == 401 ||
        result?.response?.status == 500
      ) {
        dispatch(addUser({}));
        dispatch(addtoken(""));
        navigate("/login");
      }
    } catch (e) {
      console.log("user ads list error is", e.toString());
    }
  };
  useEffect(() => {
    getUserAds();
  }, []);
  const updateAdList = () => {
    getUserAds();
  };
  return (
    <>
      <Adminlayout pagename="Your All Services ">
        <div className="pageStyle pb-3">
          <div className="pageHeading px-2 py-2 mb-0">
            <h2>Your All ADs </h2>
          </div>
          <div className="userAd_tbs px-lg-4 px-2 ">
            <div className="justify-content-between row px-md-3">
              {ads &&
                ads.map((item, index) => {
                  return (
                    <>
                      <div
                        className="col-md-12 col-lg-12 col-xl-12"
                        key={index}
                      >
                        <UserServiceCard
                          data={item}
                          updateAdList={updateAdList}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </Adminlayout>
    </>
  );
};
export default UserServices;
