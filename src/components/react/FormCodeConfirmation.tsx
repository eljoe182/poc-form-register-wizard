import { TextField } from "@mui/material";
import type { CodeConfirmationFromType } from "../../validations";

interface Props {
  props: CodeConfirmationFromType;
}

export default function FormCodeConfirmation({ props }: Props) {
  return (
    <form
      class="flex flex-col items-center justify-center p-12"
      onSubmit={props.handleSubmit}
    >
      <TextField
        label="Code Confirmation"
        id="codeConfirmation"
        name="codeConfirmation"
        variant="standard"
        aria-describedby="codeConfirmation"
        value={props.values.codeConfirmation}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        error={Boolean(props.errors.codeConfirmation)}
        helperText={props.errors.codeConfirmation}
        required
      />
    </form>
  );
}
