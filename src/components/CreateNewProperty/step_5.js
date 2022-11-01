import { Radio, Button, Steps } from "antd";
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
          <div className="pageTitle text-start">Your Add Preview </div>
        </div>
      </div>
      <div className="your-add-previews propertyCard serviceForm">
        <div className="row">
          <div className="mt-3 col-12">
            <h5>
              Property Type <span>(Lands & Plots)</span>
            </h5>
          </div>
        </div>
        <div className="adds-Imgs">
          <div className="row">
            <div md={6} lg={3} className="mt-3 col-md-6 col-lg-3">
              <div className="pre-img-items">
                <img src="/images/add-1.png" alt="pro-img" />
              </div>
            </div>
            <div md={6} lg={3} className="mt-3 col-md-6 col-lg-3">
              <div className="pre-img-items">
                <img src="/images/add-2.png" alt="pro-img" />
              </div>
            </div>
            <div md={6} lg={3} className="mt-3 col-md-6 col-lg-3">
              <div className="pre-img-items">
                <img src="/images/add-3.png" alt="pro-img" />
              </div>
            </div>
            <div md={6} lg={3} className="mt-3 col-md-6 col-lg-3">
              <div className="pre-img-items">
                <img src="/images/add-1.png" alt="pro-img" />
              </div>
            </div>
          </div>
        </div>
        <div className="other-adds-details">
          <div className="row">
            <div md={12} className="mt-4 col-12">
              <input
                type="text"
                placeholder="Full Name "
                className="form-control"
                value=" Kanal Plot For Sale in zone 4 Doha "
              />
            </div>
            <div className="mt-4 my-dropdown col-md-6">
              <select className="form-control">
                <option>Commercial Plots</option>
              </select>
              <Icon icon="gridicons:dropdown" />
            </div>
            <div  className="mt-4 my-dropdown col-md-6">
              <select className="form-control">
                <option>Corner Plot</option>
              </select>
              <Icon icon="gridicons:dropdown" />
            </div>
            <div className="mt-4 my-dropdown col-md-6">
              <select className="form-control">
                <option>Kanal</option>
              </select>
              <Icon icon="gridicons:dropdown" />
            </div>
            <div  className="mt-4 col-md-6">
              <input
                type="text"
                placeholder="Full Name "
                className="form-control"
                value=" 1 kanal"
              />
            </div>
            <div md={12} className="mt-4 col-12">
              <div className="servicede">
                <h3>Property Description</h3>
                <textarea
                  placeholder="Describe your service here..."
                  className="form-control"
                  rows="5"
                >
                  I will make the painters paint your logo/image or text on
                  building wall and send this amazing image to you in high
                  resolution printable jpeg image. The picture on the wall is
                  digitally created. You can use this picture on your Facebook
                  pages, website, blog for advertise or boost your business.
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-views mt-4">
          <h4>Review your details</h4>
          <div className="per-details d-block d-md-flex align-items-center ">
            <div className="profile-img p-2">
              <img src="/images/userProfile.png" alt="profile" />
            </div>
            <div className=" profile-detail-form row">
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
              <div className="mt-4 my-dropdown col-md-2">
                <select className="form-control">
                  <option>+974</option>
                </select>
                <Icon icon="gridicons:dropdown" />
              </div>
              <div className="mt-4 my-dropdown col-md-5">
                <input
                  type="text"
                  placeholder="0000 0000"
                  className="form-control"
                />
              </div>
              <div className="mt-4 my-dropdown col-md-6">
                <input
                  type="text"
                  placeholder="Price"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 row">
          <div className="text-end col-12">
            <Button
              className="pro-add-btn"
              onClick={() => props.setActiveStep(4)}
            >
              Publish Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Step4;
