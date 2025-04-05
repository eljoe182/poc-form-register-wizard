import { Button } from "@mui/material";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?:
  | "primary"
  | "inherit"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
  variant?: "text" | "outlined" | "contained";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export default function ButtonComponent(props: Props) {
  return <Button
    color={props.color}
    variant={props.variant}
    fullWidth={props.fullWidth}
    type={props.type}
    onClick={props.onClick}
  >
    {props.children}
  </Button>;
}