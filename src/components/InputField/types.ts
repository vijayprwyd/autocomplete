import { FunctionComponent, InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string | FunctionComponent;
  labelClassName?: string;
}
