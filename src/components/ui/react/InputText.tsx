import { TextField } from "@mui/material";

interface Props {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  name: string;
  label?: string;
  id?: string;
  fullWidth?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

export default function InputText(props: Props) {
  return (
    <TextField
      fullWidth={props.fullWidth}
      id={props.id}
      name={props.name}
      label={props.label}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      onBlur={props.onBlur}
      error={props.error}
      helperText={props.helperText}
    />
  );
}
