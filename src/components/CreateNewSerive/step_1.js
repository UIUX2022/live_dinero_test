import { Steps } from "antd";
import { Icon } from "@iconify/react";
const Step1 = (props) => {
  const { Step } = Steps;
  return (
    <>
      <div className="my-3 row">
        <div className="mySteps col-12">
          <Steps size="small" current={props.activeStep} className="px-5">
            <Step title="Overview" />
            <Step title="Description & FAQ" />
            <Step title="Requirement" />
            <Step title="Publish" />
          </Steps>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="pageTitle text-start">Service Infromation</div>
        </div>
      </div>
      <form className="serviceForm">
        <div className="row">
          <div className="mt-4 col-12">
            <input
              type="text"
              placeholder="Service Title"
              className="form-control"
            />
          </div>
          <div className="mt-4 my-dropdown col-md-6">
            <select className="form-control">
              <option>Select Services</option>
            </select>
            <Icon icon="gridicons:dropdown" />
          </div>
          <div className="mt-4 my-dropdown col-md-6">
            <select className="form-control">
              <option>Select Subservices</option>
            </select>
            <Icon icon="gridicons:dropdown" />
          </div>
          <div className="mt-4 my-dropdown col-md-6">
            <select className="form-control">
              <option>Conatct Phone Number</option>
            </select>
            <Icon icon="gridicons:dropdown" />
          </div>
          <div className="mt-4 col-md-6">
            <div className="row">
              <div className="my-dropdown col-md-3 col-xs-4">
                <select className="form-control">
                  <option>+974</option>
                  <option>+973</option>
                  <option>+972</option>
                </select>
                <Icon icon="gridicons:dropdown" />
              </div>
              <div className="col-md-9 col-xs-8">
                <input
                  type="number"
                  placeholder="000 000 00"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="text-end mt-5 col-12">
            <button
              className="save_Steps"
              onClick={() => props.setActiveStep(1)}
            >

              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Step1;
