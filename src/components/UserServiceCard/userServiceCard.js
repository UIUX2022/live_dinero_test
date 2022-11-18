import "./userServiceCard.scss";
import { useState } from "react";
import { Switch } from "antd";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { baseURLImg } from "../../routes/routes";
import { PostApiWithHeader } from "../../services";
import { useSelector, useDispatch } from "react-redux";
import { startLoader, endLoader } from "../../redux/actions";
import { notification, Modal } from "antd";

const UserServiceCard = ({ data, updateAdList }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authReducer.token);
  const [delModal, setDelModal] = useState(false);
  // ===============================================================
  // Post API for Update status of AD
  // ===============================================================
  const updateStatus = async (value) => {
    const params = {
      status: value == 1 ? 0 : 1,
    };
    try {
      const result = await PostApiWithHeader({
        route: `/user/ad/${data.id}/status/update`,
        token,
        params,
      });
      if (result.data.status == 200) {
        notification["success"]({
          message: `${result.data.address}`,
        });
      }
    } catch (e) {
      console.log("error --", e.toString());
    }
  };
  // ===============================================================
  // Post API for Delete Single AD
  // ===============================================================
  const delSingleAd = async () => {
    dispatch(startLoader());
    const params = {
      _method: "delete",
      id: data.id,
    };
    try {
      const result = await PostApiWithHeader({
        route: "/user/ad/delete/single",
        token,
        params,
      });
      if (result.data.status == 200) {
        notification["success"]({
          message: `${result.data.address}`,
        });
        updateAdList();
      }
      dispatch(endLoader());
    } catch (e) {
      console.log("error --", e.toString());
    }
  };
  // ============================================
  //  Del Modal controls
  // ============================================
  const showDelModal = () => {
    setDelModal(true);
  };
  const delModalOk = () => {
    setDelModal(false);
    delSingleAd();
  };
  const delModalCancel = () => {
    setDelModal(false);
  };
  return (
    <>
      <div className="userCard_service d-sm-flex mt-2 mt-lg-3">
        <div className="Card_img ">
          <img
            src={`${baseURLImg}adds/primary/lg/${data.primary_image}`}
            alt="profile_img"
          />
        </div>
        <div className="card_details p-2">
          <div className="d-flex justify-content-between">
            <span>#{data.ad_uid}</span>
            <Switch
              defaultChecked={data.status == 1 ? true : false}
              onClick={() => updateStatus(data.status)}
            />
          </div>
          <Link to="/" className="Card_name">
            {data.title}
          </Link>
          <h6 className="mb-0">{data.short_description}</h6>
          <p className="mb-0">
            {data.complete_address}, {data.country.name}
          </p>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-3 card_likes_details py-1 align-items-center">
              <div className="d-flex align-items-center">
                <Icon icon="wpf:like" />
                &nbsp;{data.likes}
              </div>
              <div className="d-flex align-items-center">
                <Icon icon="mdi:report-problem" />
                &nbsp;{data.reports}
              </div>
              <div className="d-flex align-items-center">
                <Icon icon="mdi:eye-outline" />
                &nbsp;{data.views}
              </div>
            </div>
            <div className="Card_btns d-sm-flex gap-1 justify-content-end">
              <button className="edit_btn">
                <Icon icon="material-symbols:edit" />
                &nbsp; Edit
              </button>
              <button className="del_btn" onClick={showDelModal}>
                <Icon icon="material-symbols:delete-outline-rounded" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Delete Ad"
        open={delModal}
        onOk={delModalOk}
        onCancel={delModalCancel}
        footer={null}
        header={null}
      >
        <div className="del_ad_modal  text-center">
          <div className="del-ad_icon text-center">
            <Icon icon="material-symbols:warning-rounded" />
          </div>

          <h5 className="py-2">Make sure want to delete AD </h5>
          <div className="del_modal_btns">
            <button className="del_con_btn" onClick={delModalCancel}>
              Cancel
            </button>
            &nbsp; &nbsp;
            <button className="del_sure_btn" onClick={delModalOk}>
              Sure
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UserServiceCard;
