import type { JSX } from "preact";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "preact/hooks";
import type { TermsAndConditions } from "../../interfaces";

interface Props {
  onChange: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
}

const INITIAL_STATE: TermsAndConditions = {
  acceptTerms: true,
  acceptCommunications: true,
};

export default function FormTermsAndConditions({ onChange }: Props) {
  const [terms, setTerms] = useState<TermsAndConditions>(INITIAL_STATE);

  const handleOnChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    if (!event.currentTarget) return;

    const targetName = event.currentTarget.name;
    const targetValue = event.currentTarget.checked;

    setTerms((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));

    onChange(event);
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
          label="Acepto los términos y condiciones y el uso de mis datos."
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
          label="Acepto recibir comunicaciones, promociones y publicidad."
        />
      </FormGroup>
    </form>
  );
}
