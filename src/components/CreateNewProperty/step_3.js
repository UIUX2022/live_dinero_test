import { Steps } from "antd";
import { Icon } from "@iconify/react";
import { Radio, Button } from "antd";
const Step_3 = (props) => {
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
      <div className="propertyCard serviceForm">
        <div className="row">
          <div className="mt-4 col-md-6 col-lg-3">
            <div className="Add-proImgs text-center">
              <div>
                <h6>Drag & Drop Photos or </h6>
                <span>Browse</span>
                <h6> Upto 20 Photos</h6>
              </div>
            </div>
          </div>
          <div className="mt-4 col-md-6 col-lg-3">
            <div className="Add-proImgs-item">
              <img src="/images/add-1.png" alt="pro-img" />
            </div>
          </div>
          <div className="mt-4 col-md-6 col-lg-3">
            <div className="Add-proImgs-item">
              <img src="/images/add-2.png" alt="pro-img" />
            </div>
          </div>
          <div className="mt-4 col-md-6 col-lg-3">
            <div className="Add-proImgs-item">
              <img src="/images/add-3.png" alt="pro-img" />
            </div>
          </div>
        </div>

        <div className="row">
          <div md={12} className="mt-4 col-md-12">
            <div className="servicede">
              <h3>Property Description</h3>
              <textarea
                placeholder="Describe your service here..."
                className="form-control"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-5 row">
          <div className="text-end col-12">
            <Button
              className="pro-add-btn"
              onClick={() => props.setActiveStep(3)}
            >
              Proceed Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Step_3;
