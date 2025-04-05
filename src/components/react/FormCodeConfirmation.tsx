import type { JSX } from "preact";
import { useState } from "preact/hooks";
import { FormControl, FormGroup, Input, InputLabel } from "@mui/material";

interface Props {
  onChange: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
}

export default function FormCodeConfirmation({ onChange }: Props) {
  const [codeConfirmation, setCodeConfirmation] = useState("");

  const handleOnChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    if (!event.currentTarget) return;
    const targetValue = event.currentTarget.value;
    setCodeConfirmation(targetValue);
    onChange(event);
  };

  return (
    <form class="flex flex-col items-center justify-center p-12">
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="codeConfirmation">Code Confirmation</InputLabel>
          <Input
            id="codeConfirmation"
            name="codeConfirmation"
            aria-describedby="codeConfirmation"
            value={codeConfirmation}
            onChange={handleOnChange}
            fullWidth
          />
        </FormControl>
      </FormGroup>
    </form>
  );
}
