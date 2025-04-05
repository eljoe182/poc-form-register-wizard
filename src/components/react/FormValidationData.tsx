import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "preact/hooks";

export default function FormValidationData() {
  const [gender, setGender] = useState("");

  const handleGenderChange = (event: SelectChangeEvent) => {
    if (!event.target) return;
    setGender(event.target.value);
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
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            id="lastName"
            name="lastName"
            aria-describedby="lastName"
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
            fullWidth
            value={gender}
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
