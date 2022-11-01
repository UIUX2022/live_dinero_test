import { Steps } from "antd";
const Step3 = (props) => {
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
          <div className="pageTitle text-start">Showcase Your Service</div>
          <form className="serviceForm py-3">
            <h6>Service Image guidelines Upto 10 photos</h6>
            <div>
              <div className="row">
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="newImgCard mt-3 text-center">
                    <div>
                      <p> Drag & Drop Photo or </p>
                      <button>Browse</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="uploadImgCard mt-3">
                    <img src="/images/cardbg.jpg" alt="Profile" />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="uploadImgCard mt-3">
                    <img src="/images/cardbg.jpg" alt="Profile" />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="uploadImgCard mt-3">
                    <img src="/images/cardbg.jpg" alt="Profile" />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="uploadImgCard mt-3">
                    <img src="/images/cardbg.jpg" alt="Profile" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-end mt-5">
              <button
                className="save_Steps"
                onClick={() => props.setActiveStep(3)}
              >
                Save & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Step3;
