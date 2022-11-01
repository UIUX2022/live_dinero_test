import Adminlayout from "../../layouts/dashboard/dashboard";
import ProfileCard from "../../components/profileCard/profileCard";
import AddNewService from "../../components/addNewService/addNewService";
const UserServices = () => {
  return (
    <>
      <Adminlayout pagename="Your All Services ">
        <div className="pageHeading px-2 py-2 mb-0">
          <h2>Your All Services </h2>
        </div>
        <div className="justify-content-between row">
          <div className="col-md-6 col-lg-6 col-xl-3">
            <ProfileCard />
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <ProfileCard />
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <ProfileCard />
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <ProfileCard />
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <AddNewService/>
          </div>
        </div>
      </Adminlayout>
    </>
  );
};
export default UserServices;
