import { type JSX } from "preact";
import { FormControl, FormGroup, Input, InputLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "preact/hooks";
import type { AdditionalInformation } from "../../interfaces";
import dayjs, { type Dayjs } from "dayjs";

interface Props {
  onDataChanged: (data: AdditionalInformation) => void;
}

const INITIAL_STATE: AdditionalInformation = {
  documentId: undefined,
  birthdate: undefined,
  phoneNumber: undefined,
  address: undefined,
};

export default function FormAdditionalInformation({ onDataChanged }: Props) {
  const [additionalInformation, setAdditionalInformation] =
    useState<AdditionalInformation>(INITIAL_STATE);

  const handleOnChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    if (!event.currentTarget) return;

    const targetName = event.currentTarget.name;
    const targetValue = event.currentTarget.value;

    setAdditionalInformation((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));

    onDataChanged(additionalInformation);
  };

  const handleBirthdateChange = (value: Dayjs | null) => {
    if (!value) return;
    setAdditionalInformation((prevState) => ({
      ...prevState,
      birthdate: value.toISOString(),
    }));

    onDataChanged(additionalInformation);
  };

  return (
    <form class="flex flex-col items-center justify-center p-12 gap-6">
      <FormGroup sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="documentId">Document ID</InputLabel>
          <Input
            id="documentId"
            name="documentId"
            aria-describedby="documentId"
            value={additionalInformation.documentId}
            onChange={handleOnChange}
            fullWidth
          />
        </FormControl>
      </FormGroup>
      <FormGroup sx={{ width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="birthdate"
            label="Birthdate"
            aria-describedby="birthdate"
            value={
              additionalInformation.birthdate
                ? dayjs(additionalInformation.birthdate)
                : null
            }
            onChange={handleBirthdateChange}
            views={["year", "month", "day"]}
            maxDate={dayjs().subtract(18, "year")}
            format="DD-MM-YYYY"
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
            value={additionalInformation.phoneNumber}
            onChange={handleOnChange}
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
            value={additionalInformation.address}
            onChange={handleOnChange}
            fullWidth
          />
        </FormControl>
      </FormGroup>
    </form>
  );
}
