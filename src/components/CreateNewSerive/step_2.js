
import { Steps } from "antd";
const Step2 = (props) => {
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
          <div className="pageTitle text-start">Service Description</div>
          <form className="serviceForm">
            <div className="serviceCover my-2">
              <img src="/images/wallpaintbg.jpg" />
              <div className="servicesCoverImg">
                <div className="text-center">
                  <p>Drag & Drop Cover Photo or </p>
                  <button>Browse</button>
                </div>
              </div>
            </div>
            <div className="servicede">
              <h3>Service Description</h3>
              <textarea
                placeholder="Describe your service here..."
                className="form-control"
                rows="8"
              ></textarea>
            </div>
            <div className="text-end mt-5">
            <button className="save_Steps" onClick={()=>props.setActiveStep(2)}> Save & Continue</button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Step2;
