import { Fragment } from "preact";
import { useState } from "preact/hooks";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import FormTermsAndConditions from "./FormTermsAndConditions";
import FormValidationData from "./FormValidationData";
import FormCodeConfirmation from "./FormCodeConfirmation";
import FormAdditionalInformation from "./FormAdditionalInformation";
import FormQRPreInscription from "./FormQRPreInscription";

const steps = [
  "Terms and Conditions",
  "Validation",
  "Code Confirmation",
  "Additional Information",
  "QR Pre-inscription",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Fragment>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div class="p-2">
        {activeStep === 0 && <FormTermsAndConditions />}
        {activeStep === 1 && <FormValidationData />}
        {activeStep === 2 && <FormCodeConfirmation />}
        {activeStep === 3 && <FormAdditionalInformation />}
        {activeStep === 4 && <FormQRPreInscription />}
      </div>
      <div class="flex justify-between mt-4">
        <Button
          onClick={handleBack}
          disabled={activeStep === 0 || activeStep === steps.length - 1}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          color="inherit"
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
}
