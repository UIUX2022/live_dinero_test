import { Button, Steps } from "antd";
import { Icon } from "@iconify/react";
const Step2 = (props) => {
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
          <div className="pageTitle text-start">Property Detail </div>
        </div>
      </div>
      <form className="serviceForm propertyCard">
        <div className="row">
          <div className="mt-4 col-12">
            <input
              type="text"
              placeholder="Property Title"
              className="form-control"
            />
          </div>
          <div className="mt-4 my-dropdown col-md-6">
            <select className="form-control">
              <option>Select Property Type</option>
            </select>
            <Icon icon="gridicons:dropdown" />
          </div>
          <div className="mt-4 my-dropdown col-md-6">
            <select className="form-control">
              <option>Select Property Type</option>
            </select>
            <Icon icon="gridicons:dropdown" />
          </div>
          <div className="mt-4 my-dropdown col-md-6">
            <select className="form-control">
              <option>Select Property Type</option>
            </select>
            <Icon icon="gridicons:dropdown" />
          </div>

          <div className="mt-4 col-md-6">
            <input
              type="text"
              placeholder="Area Unit"
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-5 row">
          <div className="text-end col-12">
            <Button
              className="pro-add-btn"
              onClick={() => props.setActiveStep(2)}
            >
              Proceed Next
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Step2;
