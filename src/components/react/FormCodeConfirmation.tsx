import type { JSX } from "preact";
import { useState } from "preact/hooks";
import { FormControl, FormGroup, Input, InputLabel } from "@mui/material";

interface Props {
  onDataChanged: (data: string) => void;
}

export default function FormCodeConfirmation({ onDataChanged }: Props) {
  const [codeConfirmation, setCodeConfirmation] = useState("");

  const handleOnChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    if (!event.currentTarget) return;
    const targetValue = event.currentTarget.value;
    setCodeConfirmation(targetValue);
    onDataChanged(codeConfirmation);
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
