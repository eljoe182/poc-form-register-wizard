import { FormControl, FormGroup, Input, InputLabel } from "@mui/material";

export default function FormCodeConfirmation() {
  return (
    <form class="flex flex-col items-center justify-center p-12">
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="codeConfirmation">Code Confirmation</InputLabel>
          <Input
            id="codeConfirmation"
            name="codeConfirmation"
            aria-describedby="codeConfirmation"
            fullWidth
          />
        </FormControl>
      </FormGroup>
    </form>
  );
}
