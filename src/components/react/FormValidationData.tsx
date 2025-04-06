import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { type ValidationDataFromType } from "../../validations";

interface Props {
  props: ValidationDataFromType;
}

export default function FormValidationData({ props }: Props) {
  return (
    <form
      class="flex flex-col items-center justify-center p-12 gap-8"
      onSubmit={props.handleSubmit}
    >
      <div class="grid grid-cols-2 gap-4 w-full">
        <TextField
          fullWidth
          label="First Name"
          id="firstName"
          name="firstName"
          variant="standard"
          aria-describedby="firstName"
          value={props.values.firstName}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          error={Boolean(props.errors.firstName)}
          helperText={props.errors.firstName}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          id="lastName"
          name="lastName"
          variant="standard"
          aria-describedby="lastName"
          value={props.values.lastName}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          error={Boolean(props.errors.lastName)}
          helperText={props.errors.lastName}
          required
        />
      </div>
      <TextField
        fullWidth
        label="Email"
        id="email"
        name="email"
        variant="standard"
        aria-describedby="email"
        value={props.values.email}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        error={Boolean(props.errors.email)}
        helperText={props.errors.email}
        required
      />
      <FormControl fullWidth error={Boolean(props.errors.gender)} required>
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          labelId="gender"
          label="Gender *"
          name="gender"
          fullWidth
          value={props.values.gender}
          onChange={props.handleChange}
        >
          <MenuItem value="1">Male</MenuItem>
          <MenuItem value="2">Female</MenuItem>
          <MenuItem value="0">Other</MenuItem>
        </Select>
        {Boolean(props.errors.gender) && (
          <FormHelperText>Gender is required</FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
