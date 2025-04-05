import { FormControl, FormGroup, Input, InputLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function FormAdditionalInformation() {
  return (
    <form class="flex flex-col items-center justify-center p-12 gap-6">
      <FormGroup sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="documentId">Document ID</InputLabel>
          <Input
            id="documentId"
            name="documentId"
            aria-describedby="documentId"
            fullWidth
          />
        </FormControl>
      </FormGroup>
      <FormGroup sx={{ width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="birthDate"
            label="Birth Date"
            aria-describedby="birthDate"
            disableFuture
          />
        </LocalizationProvider>
      </FormGroup>
      <FormGroup sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            aria-describedby="phoneNumber"
            fullWidth
          />
        </FormControl>
      </FormGroup>
      <FormGroup sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="address">Address</InputLabel>
          <Input
            id="address"
            name="address"
            type="address"
            aria-describedby="address"
            fullWidth
          />
        </FormControl>
      </FormGroup>
    </form>
  );
}
