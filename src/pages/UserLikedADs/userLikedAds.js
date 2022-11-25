import "./userLikedADs.scss";
import Adminlayout from "../../layouts/dashboard/dashboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetApiWithHeader } from "../../services";
import { startLoader, endLoader, addUser, addtoken } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/propertyCard/propertyCard";
import { Icon } from "@iconify/react";

const UserLikedADs = () => {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adList, setAdList] = useState([]);
  const GetLikedAds = async () => {
    dispatch(startLoader());
    const result = await GetApiWithHeader({ route: "user/ad/liked", token });

    if (result.data.status == 200) {
      setAdList(result?.data?.ads?.data);
    } else if (
      result?.response?.status == 400 ||
      result?.response?.status == 500
    ) {
      dispatch(addUser({}));
      dispatch(addtoken(""));
      navigate("/");
    }
    dispatch(endLoader());
  };
  useEffect(() => {
    GetLikedAds();
  }, []);
  console.log("my current like ads are", adList);
  return (
    <>
      <Adminlayout>
        <div className="userlikedads">
          <div className="pageTitle">Liked ADs </div>
          {adList.length > 0 ? (
            <div className="row py-3 px-3">
              {adList.map((data, index) => {
                return (
                  <>
                    <div className="col-md-6 col-lg-4 px-0">
                      <PropertyCard data={data.ad} />
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="no_data_found">
                  <div className="text-center">
                  <Icon icon="material-symbols:no-sim-outline-rounded" />
                    <p>No Data Found</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Adminlayout>
    </>
  );
};
export default UserLikedADs;
