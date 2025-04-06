import { useState } from "preact/hooks";
import type { JSX } from "preact";
import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { ValidationData } from "../../interfaces";

interface Props {
  onDataChanged: (data: ValidationData) => void;
}

const INITIAL_STATE: ValidationData = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  gender: "",
};

export default function FormValidationData({ onDataChanged }: Props) {
  const [validationData, setValidationData] =
    useState<ValidationData>(INITIAL_STATE);

  const handleGenderChange = (event: SelectChangeEvent) => {
    if (!event.target) return;

    setValidationData((prevState) => ({
      ...prevState,
      gender: event.target?.value,
    }));

    onDataChanged(validationData);
  };

  const handleOnChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    if (!event.currentTarget) return;

    const targetName = event.currentTarget.name;
    const targetValue = event.currentTarget.value;

    setValidationData((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));

    onDataChanged(validationData);
  };

  return (
    <form class="flex flex-col items-center justify-center p-12 gap-8">
      <FormGroup
        sx={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "1fr 1fr",
          gap: 4,
        }}
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="firstName"
            name="firstName"
            aria-describedby="firstName"
            value={validationData.firstName}
            onChange={handleOnChange}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            id="lastName"
            name="lastName"
            aria-describedby="lastName"
            value={validationData.lastName}
            onChange={handleOnChange}
            fullWidth
          />
        </FormControl>
      </FormGroup>
      <FormGroup sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            aria-describedby="email"
            value={validationData.email}
            onChange={handleOnChange}
            fullWidth
          />
        </FormControl>
      </FormGroup>
      <FormGroup sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            label="Gender"
            name="gender"
            fullWidth
            value={validationData.gender}
            onChange={handleGenderChange}
          >
            <MenuItem value="1">Male</MenuItem>
            <MenuItem value="2">Female</MenuItem>
            <MenuItem value="0">Other</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </form>
  );
}
