import "./createNewAdd.scss";
import { useState } from 'react';
import Step1 from '../../components/CreateNewProperty/step_1';
import Step2 from '../../components/CreateNewProperty/step_2';
import Step3 from '../../components/CreateNewProperty/step_3';
import Step4 from '../../components/CreateNewProperty/step_4';
import Step5 from '../../components/CreateNewProperty/step_5';
import Layout from "../../layouts/dashboard/dashboard";

const CreateNewAdds = () => {
  const [activeStep, setActiveStep] = useState(0);
  switch (activeStep) {
    case 0:
      return (
        <Layout>
          <Step1 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Layout>
      );
    case 1:
      return (
        <Layout>
          <Step2 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Layout>
      );
    case 2:
      return (
        <Layout>
          <Step3 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Layout>
      );
    case 3:
      return (
        <Layout>
          <Step4 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Layout>
      );
    case 4:
      return (
        <Layout>
          <Step5 activeStep={activeStep} setActiveStep={setActiveStep} />
        </Layout>
      );
  }
  return <>Add new</>;
};
export default CreateNewAdds;
