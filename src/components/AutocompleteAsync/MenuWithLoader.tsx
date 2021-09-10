/* eslint-disable react/prop-types */
import React from "react";
import Menu from "../Menu/Menu";
import MenuItem from "../MenuItem/MenuItem";

type MenuWithLoaderProps = {
  isLoading: boolean;
  error: Record<string, unknown> | null;
  isFetchingNext: boolean;
  isOpen: boolean;
};

export default React.forwardRef<HTMLUListElement, MenuWithLoaderProps>(function MenuWithLoader(props, ref) {
  const { isLoading, isFetchingNext, error, children, isOpen, ...rest } = props;

  if (!isOpen) return null;
  if (isLoading || error) {
    return (
      <Menu>
        <MenuItem className="text-gray-400"> {isLoading ? "Loading ..." : "Failed to fetch"} </MenuItem>
      </Menu>
    );
  }
  return (
    <Menu {...rest} ref={ref}>
      {children}
      {isFetchingNext ? <MenuItem className="text-gray-400"> {"Fetching more options ..."} </MenuItem> : null}
    </Menu>
  );
});
