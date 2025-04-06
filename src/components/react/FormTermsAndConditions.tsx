import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { type TermsAndConditionsFromType } from "../../validations";

interface Props {
  props: TermsAndConditionsFromType;
}

export default function FormTermsAndConditions({ props }: Props) {
  return (
    <form
      class="flex flex-col items-center justify-center"
      onSubmit={props.handleSubmit}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="acceptTerms"
              value={props.values.acceptTerms}
              onChange={props.handleChange}
              defaultChecked
            />
          }
          label="I agree to the terms and conditions and the use of my data."
        />
        <FormControlLabel
          control={
            <Checkbox
              name="acceptCommunications"
              value={props.values.acceptCommunications}
              onChange={props.handleChange}
              defaultChecked
            />
          }
          label="I agree to receive communications, promotions and advertising."
        />
      </FormGroup>
    </form>
  );
}
