import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import type { AdditionalInformationFromType } from "../../validations";
import { useState } from "preact/hooks";

interface Props {
  props: AdditionalInformationFromType;
}

export default function FormAdditionalInformation({ props }: Props) {
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null);

  const handleOnChangeBirthdate = (date: Dayjs | null) => {
    if (date) {
      props.setFieldValue("birthdate", dayjs(date).format("DD-MM-YYYY"));
      setBirthdate(date);
    }
  };

  return (
    <form
      class="flex flex-col items-center justify-center p-12 gap-6"
      onSubmit={props.handleSubmit}
    >
      <TextField
        fullWidth
        label="Document ID"
        id="documentId"
        name="documentId"
        variant="standard"
        aria-describedby="documentId"
        value={props.values.documentId}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        error={Boolean(props.errors.documentId)}
        helperText={props.errors.documentId}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="birthdate"
          label="Birthdate"
          aria-describedby="birthdate"
          value={birthdate}
          onChange={handleOnChangeBirthdate}
          views={["year", "month", "day"]}
          maxDate={dayjs().subtract(18, "year")}
          format="DD-MM-YYYY"
          disableFuture
          sx={{ width: "100%" }}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        label="Phone Number"
        id="phoneNumber"
        name="phoneNumber"
        variant="standard"
        aria-describedby="phoneNumber"
        value={props.values.phoneNumber}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        error={Boolean(props.errors.phoneNumber)}
        helperText={props.errors.phoneNumber}
        required
      />
      <TextField
        fullWidth
        label="Address"
        id="address"
        name="address"
        variant="standard"
        aria-describedby="address"
        value={props.values.address}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        error={Boolean(props.errors.address)}
        helperText={props.errors.address}
        required
      />
    </form>
  );
}
