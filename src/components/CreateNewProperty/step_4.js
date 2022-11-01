import { Button, Steps } from "antd";
import { Icon } from "@iconify/react";

const Step4 = (props) => {
  const { Step } = Steps;
  return (
    <>
      <div className="my-3 row">
        <div className="mySteps col-12">
          <Steps size="small" current={props.activeStep} className="px-1">
            <Step title="Property Type " />
            <Step title="Description & FAQ" />
            <Step title="Requirement" />
            <Step title="Person Detail" />
            <Step />
          </Steps>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="pageTitle text-start">Your Details </div>
        </div>
      </div>
      <form className="propertyCard serviceForm py-3">
        <div className="per-details d-block d-lg-flex align-items-center">
          <div className="profile-img p-2">
            <img src="/images/userProfile.png" alt="profile" />
            <div className="changeImg text-center mt-3 py-1">Remove Photo</div>
          </div>
          <div className="row profile-detail-form">
            <div className="col-12">
              <input
                type="text"
                placeholder="Full Name "
                className="form-control"
              />
            </div>
            <div className="mt-4 my-dropdown col-12">
              <select className="form-control">
                <option>location</option>
              </select>
              <Icon icon="gridicons:dropdown" />
            </div>
            <div className="mt-4 my-dropdown col-lg-4 col-xl-2" lg={4} xl={2}>
              <select className="form-control">
                <option>+974</option>
              </select>
              <Icon icon="gridicons:dropdown" />
            </div>
            <div className="mt-4 my-dropdown col-lg-8 col-xl-5" lg={8} xl={5}>
              <input
                type="text"
                placeholder="0000 0000"
                className="form-control"
              />
            </div>
            <div className="mt-4 my-dropdown col-xl-5" xl={5}>
              <input type="text" placeholder="Price" className="form-control" />
            </div>
          </div>
        </div>

        <div className="number-options d-flex mt-4 justify-content-between align-items-center">
          <p>Show my phone number in ads</p>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="mt-5 row">
          <div className="text-end col-12">
            <Button
              className="pro-add-btn"
              onClick={() => props.setActiveStep(4)}
            >
              Ad Preview
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Step4;
