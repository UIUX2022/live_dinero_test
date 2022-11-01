import "./userPropertyAdd.scss";
import Adminlayout from "../../layouts/dashboard/dashboard";
import PropertyCard from "../../components/propertyCard/propertyCard";
import AddNewPropertyCard from "../../components/addNewPropCard/addnewPropCard";
const UserPropertyAdd = () => {
  const data = {
    id: "99",
    price: 0,
  };
  return (
    <Adminlayout>
      <div className="pageTitle">Your All Ads </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <PropertyCard data />
        </div>
        <div className="col-lg-4 col-md-6">
          <PropertyCard data />
        </div>
        <div className="col-lg-4 col-md-6">
          <PropertyCard data />
        </div>
        <div className="col-lg-4 col-md-6">
          <AddNewPropertyCard />
        </div>
      </div>
    </Adminlayout>
  );
};
export default UserPropertyAdd;
