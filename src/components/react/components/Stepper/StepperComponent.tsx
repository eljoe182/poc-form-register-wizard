import StepComponent from "./components/Step";
import type { StepProps } from "./components/Step";

interface StepperProps {
  steps: Pick<StepProps, "title" | "description">[];
  activeStep: number;
}

export default function StepperComponent({ steps, activeStep }: StepperProps) {
  return (
    <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
      {steps.map((step, index) => (
        <StepComponent
          title={step.title}
          description={step.description}
          number={index + 1}
          active={activeStep === index}
          completed={activeStep < index || activeStep === steps.length - 1}
        />
      ))}
    </ol>
  );
}
