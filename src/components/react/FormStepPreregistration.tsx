import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import FormTermsAndConditions from "./FormTermsAndConditions";
import FormValidationData from "./FormValidationData";
import FormCodeConfirmation from "./FormCodeConfirmation";
import FormAdditionalInformation from "./FormAdditionalInformation";
import FormQRPreInscription from "./FormQRPreInscription";
import type { FormRegisterWizardData } from "../../interfaces";

const steps = [
  "Terms and Conditions",
  "Validation",
  "Code Confirmation",
  "Additional Information",
  "QR Pre-inscription",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [registerWizardData, setRegisterWizardData] =
    useState<FormRegisterWizardData>();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const dataToSave = (data: FormRegisterWizardData) => {
    if (activeStep === 0) {
      setRegisterWizardData((prevState) => ({
        ...prevState,
        terms: data.terms,
      }));
    } else if (activeStep === 1) {
      setRegisterWizardData((prevState) => ({
        ...prevState,
        validationData: data.validationData,
      }));
    } else if (activeStep === 2) {
      setRegisterWizardData((prevState) => ({
        ...prevState,
        codeConfirmation: data.codeConfirmation,
      }));
    } else if (activeStep === 3) {
      setRegisterWizardData((prevState) => ({
        ...prevState,
        additionalInformation: data.additionalInformation,
      }));
    }
  };

  useEffect(() => {
    if (activeStep === 4) {
      // get QR code
      setRegisterWizardData((prevState) => ({
        ...prevState,
        qrCode: "00000000",
      }));
    }
  }, [activeStep]);

  useEffect(() => {
    console.log({ registerWizardData });
  }, [registerWizardData]);

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
          <FormTermsAndConditions
            onDataChanged={(data) => dataToSave({ terms: data })}
          />
        )}
        {activeStep === 1 && (
          <FormValidationData
            onDataChanged={(data) => dataToSave({ validationData: data })}
          />
        )}
        {activeStep === 2 && (
          <FormCodeConfirmation
            onDataChanged={(data) => dataToSave({ codeConfirmation: data })}
          />
        )}
        {activeStep === 3 && (
          <FormAdditionalInformation
            onDataChanged={(data) =>
              dataToSave({ additionalInformation: data })
            }
          />
        )}
        {activeStep === 4 && (
          <FormQRPreInscription qrCodeValue={registerWizardData?.qrCode} />
        )}
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
