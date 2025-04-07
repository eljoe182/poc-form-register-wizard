import { Fragment } from "preact";
import { useState } from "preact/hooks";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
  FormTermsAndConditions,
  FormGeneralInformationData,
  FormCodeConfirmation,
  FormAdditionalInformation,
  FormQRPreInscription,
} from "./";
import {
  TermsAndConditionsFrom,
  GeneralInformationFrom,
  CodeConfirmationFrom,
  AdditionalInformationFrom,
  GeneralInformationSubmittedFrom,
  TermsAndConditionsSubmittedFrom,
  CodeConfirmationSubmittedFrom,
  AdditionalInformationSubmittedFrom,
} from "../../validations";

const steps = [
  "Terms and Conditions",
  "General Information",
  "Code Confirmation",
  "Additional Information",
  "QR Pre-inscription",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [qrCode, setQrCode] = useState<string>("");

  const formTermsAndConditions = TermsAndConditionsFrom();
  const formGeneralInformationData = GeneralInformationFrom();
  const formCodeConfirmation = CodeConfirmationFrom();
  const formAdditionalInformation = AdditionalInformationFrom();

  const handleNext = async () => {
    if (activeStep === 0) {
      const result = await TermsAndConditionsSubmittedFrom(
        formTermsAndConditions
      );
      if (!result) return;
      nextStep();
    } else if (activeStep === 1) {
      const result = await GeneralInformationSubmittedFrom(
        formGeneralInformationData
      );
      if (!result) return;
      nextStep();
    } else if (activeStep === 2) {
      const result = await CodeConfirmationSubmittedFrom(formCodeConfirmation);
      if (!result) return;
      nextStep();
    } else if (activeStep === 3) {
      const result = await AdditionalInformationSubmittedFrom(
        formAdditionalInformation
      );
      if (!result) return;
      setQrCode(result);
      nextStep();
    }
  };

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Fragment>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step
              key={label}
              completed={activeStep > index || activeStep === steps.length - 1}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div class="p-2">
        {activeStep === 0 && (
          <FormTermsAndConditions props={formTermsAndConditions} />
        )}
        {activeStep === 1 && (
          <FormGeneralInformationData props={formGeneralInformationData} />
        )}
        {activeStep === 2 && (
          <FormCodeConfirmation props={formCodeConfirmation} />
        )}
        {activeStep === 3 && (
          <FormAdditionalInformation props={formAdditionalInformation} />
        )}
        {activeStep === 4 && <FormQRPreInscription qrCodeValue={qrCode} />}
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
          {activeStep === 3 ? "Finish" : "Next"}
        </Button>
      </div>
    </Fragment>
  );
}
