import { string } from "prop-types";
import React, { FC } from "react";
import classnames from "classnames";
import { IInputProps } from "./types";

const Input: FC<IInputProps> = ({ name, label, className, labelClassName, ...rest }) => {
  return (
    <div className="relative">
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
      <input
        className={classnames(
          "border rounded border-gray-300 p-2 focus:ring-2 focus:ring-blue-600 outline-none",
          className
        )}
        id={name}
        {...rest}
      />
    </div>
  );
};

Input.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  className: string,
  labelClassName: string,
};

Input.defaultProps = {
  className: "",
  labelClassName: "",
};

export default Input;
