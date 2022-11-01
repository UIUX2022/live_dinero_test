import "./addNewPropCard.scss";
import AddNewPropCard from "./addnewPropCard";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const AddNewPropertyCard = () => {
  return (
    <>
      <Link to="/user/create/properyAdd">
        <div className="AddnewCard mt-3">
          <div>
            <Icon icon="carbon:add-alt"  />
            <p>Create New Add</p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default AddNewPropertyCard;
