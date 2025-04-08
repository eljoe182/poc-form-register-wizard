import { Button, TextField, Typography } from "@mui/material";
import type { CodeConfirmationFromType } from "../../validations";
import { useEffect, useState } from "preact/hooks";
import { actions } from "astro:actions";

interface Props {
  props: CodeConfirmationFromType;
}

export default function FormCodeConfirmation({ props }: Props) {
  const [leftTime, setLeftTime] = useState(59);

  const handleClick = async () => {
    setLeftTime(59);
    await actions.SMTPAction.sendCodeConfirmation();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftTime((prevLeftTime) => prevLeftTime - 1);
      if (leftTime === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [leftTime]);

  return (
    <form
      class="flex flex-col items-center justify-center p-12 gap-10"
      onSubmit={props.handleSubmit}
    >
      <TextField
        label="Code Confirmation"
        id="codeConfirmation"
        name="codeConfirmation"
        variant="standard"
        aria-describedby="codeConfirmation"
        value={props.values.codeConfirmation}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        error={Boolean(props.errors.codeConfirmation)}
        helperText={props.errors.codeConfirmation}
        required
      />
      {leftTime <= 0 ? (
        <Button color="primary" onClick={handleClick} variant="contained">
          Resend Code
        </Button>
      ) : (
        <>
          <Typography variant="body2" component="p" color="textDisabled">
            {`Retry in ${leftTime} seconds`}
          </Typography>
        </>
      )}
    </form>
  );
}
