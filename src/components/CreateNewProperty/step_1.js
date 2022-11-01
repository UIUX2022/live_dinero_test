import { Icon } from "@iconify/react";
import { Radio, Button } from "antd";
import { Steps } from "antd";
const Step1 = ( props ) => {
  const { Step } = Steps;
  return (
    <>
      <div className="my-3 row">
        <div className="mySteps col-12">
          <Steps size="small" current="1" className="px-1">
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
          <div className="pageTitle text-start">Property Type </div>
        </div>
      </div>

      <Radio.Group defaultValue="z" size="large" className="w-100 propertyCard">
        <div className="row">
          <div className="mt-3 col-md-6 col-lg-3">
            <Radio.Button value="a">
              <div className="pro-Card w-100 text-center">
                <div className="pro-Card-icon">
                  <Icon icon="entypo:location" />
                </div>
                <div className="pro-Card-Name py-1">Lands & Plots</div>
              </div>
            </Radio.Button>
          </div>
          <div className="mt-3 mt-3 col-md-6 col-lg-3">
            <Radio.Button value="b">
              <div className="pro-Card w-100 text-center">
                <div className="pro-Card-icon">
                  <Icon icon="fa6-solid:house" />
                </div>
                <div className="pro-Card-Name py-1">Houses</div>
              </div>
            </Radio.Button>
          </div>
          <div className="mt-3 mt-3 col-md-6 col-lg-3">
            <Radio.Button value="c">
              <div className="pro-Card w-100 text-center">
                <div className="pro-Card-icon">
                  <Icon icon="clarity:building-line" />
                </div>
                <div className="pro-Card-Name py-1">Apartments & Flats</div>
              </div>
            </Radio.Button>
          </div>
          <div className="mt-3 mt-3 col-md-6 col-lg-3">
            <Radio.Button value="d">
              <div className="pro-Card w-100 text-center">
                <div className="pro-Card-icon">
                  <Icon icon="ep:office-building" />
                </div>
                <div className="pro-Card-Name py-1">Offices</div>
              </div>
            </Radio.Button>
          </div>
          <div className="mt-3 mt-3 col-md-6 col-lg-3">
            <Radio.Button value="e">
              <div className="pro-Card w-100 text-center">
                <div className="pro-Card-icon">
                  <Icon icon="fluent:building-shop-16-filled" />
                </div>
                <div className="pro-Card-Name py-1">Shops</div>
              </div>
            </Radio.Button>
          </div>
          <div className="mt-3 mt-3 col-md-6 col-lg-3">
            <Radio.Button value="f">
              <div className="pro-Card w-100 text-center">
                <div className="pro-Card-icon">
                  <Icon icon="ic:round-workspace-premium" />
                </div>
                <div className="pro-Card-Name py-1">Commercial Space</div>
              </div>
            </Radio.Button>
          </div>
        </div>
        <div className="mt-5 row">
          <div className="text-end col-12">
            <Button
              className="pro-add-btn"
              onClick={() => props.setActiveStep(1)}
            >
              Proceed Next
            </Button>
          </div>
        </div>
      </Radio.Group>
    </>
  );
};
export default Step1;
