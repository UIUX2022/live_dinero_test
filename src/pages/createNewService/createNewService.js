import "./createNewService.scss";
import { useState } from "react";
import Adminlayout from "../../layouts/dashboard/dashboard";
import Step1 from "../../components/CreateNewSerive/step_1";

const CreateService = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [adInfo, setAdInfo] = useState({});

  return (
    <Adminlayout>
      <Step1
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setAdInfo={setAdInfo}
      />
    </Adminlayout>
  );
};
export default CreateService;
