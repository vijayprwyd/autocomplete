import classNames from "classnames";
import React from "react";

export default function MenuItem(props: JSX.IntrinsicAttributes & React.LiHTMLAttributes<HTMLLIElement>) {
  const { className, ...rest } = props;
  return <li className={classNames("px-4 py-1", className)} {...rest} />;
}
