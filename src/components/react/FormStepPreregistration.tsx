import { Fragment, type JSX } from "preact";
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
import type { SelectChangeEvent } from "@mui/material";

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

  const jsxValue = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    return {
      targetName: event.currentTarget?.name,
      targetValue:
        event.currentTarget.type === "checkbox"
          ? event.currentTarget.checked
          : event.currentTarget.value,
    };
  };

  const muiValue = (event: SelectChangeEvent) => {
    const target = event.target as HTMLInputElement;
    return {
      targetName: target.name,
      targetValue: target.value,
    };
  };

  const handleOnChange = (
    event: JSX.TargetedEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    let targetName: string;
    let targetValue: string | boolean;

    if (event instanceof PointerEvent) {
      const values = muiValue(event as SelectChangeEvent);
      targetName = values.targetName;
      targetValue = values.targetValue;
    } else {
      const values = jsxValue(event as JSX.TargetedEvent<HTMLInputElement>);
      targetName = values.targetName;
      targetValue = values.targetValue;
    }

    if (activeStep === 0) {
      setRegisterWizardData((prevState) => ({
        ...prevState,
        terms: {
          ...prevState?.terms,
          [targetName]: targetValue,
        },
      }));
    } else if (activeStep === 1) {
      setRegisterWizardData((prevState) => ({
        ...prevState,
        validationData: {
          ...prevState?.validationData,
          [targetName]: targetValue,
        },
      }));
    } else if (activeStep === 2) {
      setRegisterWizardData((prevState) => ({
        ...prevState,
        codeConfirmation: targetValue as string,
      }));
    } else if (activeStep === 3) {
      setRegisterWizardData((prevState) => ({
        ...prevState,
        additionalInformation: {
          ...prevState?.additionalInformation,
          [targetName]: targetValue,
        },
      }));
    }
  };

  useEffect(() => {
    console.log({ registerWizardData });
  }, [registerWizardData]);

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
        {activeStep === 0 && (
          <FormTermsAndConditions onChange={handleOnChange} />
        )}
        {activeStep === 1 && <FormValidationData onChange={handleOnChange} />}
        {activeStep === 2 && <FormCodeConfirmation onChange={handleOnChange} />}
        {activeStep === 3 && (
          <FormAdditionalInformation onChange={handleOnChange} />
        )}
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
