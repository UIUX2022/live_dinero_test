import { Steps } from "antd";
import { Icon } from "@iconify/react";
const Step4 = (props) => {
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
            </div>
            <div className="row">
              <div className="mt-4 col-12">
                <input
                  type="text"
                  placeholder="Service Title"
                  className="form-control"
                  readonly
                />
              </div>
              <div className="mt-4 my-dropdown col-md-6">
                <select className="form-control" readonly>
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
                  <div md={3} xs={4} className="my-dropdown col-md-3 col-xs-4">
                    <select className="form-control">
                      <option>+974</option>
                      <option>+973</option>
                      <option>+972</option>
                    </select>
                    <Icon icon="gridicons:dropdown" />
                  </div>
                  <div md={9} xs={8} className="col-md-9 col-xs-8">
                    <input
                      type="number"
                      placeholder="000 000 00"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="servicede mt-3">
              <h3>Service Description</h3>
              <textarea
                placeholder="Describe your service here..."
                className="form-control"
                rows="8"
                readonly
              >
                I will make the painters paint your logo/image or text on
                building wall and send this amazing image to you in high
                resolution printable jpeg image. The picture on the wall is
                digitally created. You can use this picture on your Facebook
                pages, website, blog for advertise or boost your business.
              </textarea>
            </div>
            <div className="row">
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
              <div className="col-md-6 col-lg-4 col-xl-3" md={6} lg={4} xl={3}>
                <div className="uploadImgCard mt-3">
                  <img src="/images/cardbg.jpg" alt="Profile" />
                </div>
              </div>
            </div>
            <div className="text-end mt-5">
              <button
                className="save_Steps"
                onClick={() => props.setNewItems(false)}
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Step4;
