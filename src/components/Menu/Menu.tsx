import React from "react";
import classNames from "classnames";
import styles from "./menu.module.css";

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
}

const Menu = React.forwardRef<HTMLUListElement, MenuProps>(function MenuComponent(props, ref) {
  // eslint-disable-next-line react/prop-types
  const { className, children } = props;
  if (!children) return null;
  //TODO: Add support for virtualization
  return (
    <ul
      ref={ref}
      {...props}
      className={classNames("absolute w-full  p-2 max-h-72	 overflow-y-auto	", styles.menu, className)}
    />
  );
});

export default Menu;
