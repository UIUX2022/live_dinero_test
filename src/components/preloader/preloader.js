import "./preloader.scss";
import Loader from "./Preloader.gif";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { endLoader } from "../../redux/actions/index";
const Preloader = () => {
  const dispatch = useDispatch();
  const load = useSelector((state) => state.authReducer.loader);
  
  return (
    <div className={load ? "preloader_section " : "preloader_section d-none"}>
      <img src={Loader} className="loader_img" alt="img" />
    </div>
  );
};
export default Preloader;
