import "./createNewService.scss";
import { useState } from "react";
import Adminlayout from "../../layouts/dashboard/dashboard";
import Step1 from "../../components/CreateNewSerive/step_1";
import Step2 from "../../components/CreateNewSerive/step_2";
import Step3 from "../../components/CreateNewSerive/step_3";
import Step4 from "../../components/CreateNewSerive/step_4";
const CreateService = () => {
  const [activeStep, setActiveStep] = useState(0);

  switch (activeStep) {
    case 0:
      return (
        <Adminlayout>
          <Step1 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Adminlayout>
      );
    case 1:
      return (
        <Adminlayout>
          <Step2 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Adminlayout>
      );
    case 2:
      return (
        <Adminlayout>
          <Step3 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Adminlayout>
      );
    case 3:
      return (
        <Adminlayout>
          <Step4 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Adminlayout>
      );
  }
};
export default CreateService;
