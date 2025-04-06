import type { JSX } from "preact";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "preact/hooks";
import type { TermsAndConditions } from "../../interfaces";

interface Props {
  onDataChanged: (data: TermsAndConditions) => void;
}

const INITIAL_STATE: TermsAndConditions = {
  acceptTerms: true,
  acceptCommunications: true,
};

export default function FormTermsAndConditions({ onDataChanged }: Props) {
  const [terms, setTerms] = useState<TermsAndConditions>(INITIAL_STATE);

  const handleOnChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    if (!event.currentTarget) return;

    const targetName = event.currentTarget.name;
    const targetValue = event.currentTarget.checked;

    setTerms((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));

    onDataChanged(terms);
  };

  return (
    <form class="flex flex-col items-center justify-center">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="acceptTerms"
              value={terms.acceptTerms}
              defaultChecked
              onChange={handleOnChange}
            />
          }
          label="I agree to the terms and conditions and the use of my data."
        />
        <FormControlLabel
          control={
            <Checkbox
              name="acceptCommunications"
              value={terms.acceptCommunications}
              defaultChecked
              onChange={handleOnChange}
            />
          }
          label="I agree to receive communications, promotions and advertising."
        />
      </FormGroup>
    </form>
  );
}
