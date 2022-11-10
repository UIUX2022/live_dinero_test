import "./addNewService.scss";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const AddNewService = () => {
  return (
    <>
      <Link to="/user/create/services">
        <div className="addNewCard mt-3">
          <div className="CardItems text-center">
            <Icon icon="carbon:add-alt" />
            <h5>Create New Service</h5>
          </div>
        </div>
      </Link>
    </>
  );
};
export default AddNewService;
