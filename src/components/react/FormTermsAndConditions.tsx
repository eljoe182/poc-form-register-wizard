import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function FormTermsAndConditions() {
  return (
    <form class="flex flex-col items-center justify-center">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox name="acceptTerms" defaultChecked />}
          label="Acepto los términos y condiciones y el uso de mis datos."
        />
        <FormControlLabel
          control={<Checkbox name="acceptCommunications" defaultChecked />}
          label="Acepto recibir comunicaciones, promociones y publicidad."
        />
      </FormGroup>
    </form>
  );
}
