import React, { useState } from "react";
import InputField from "../InputField";
import Menu from "../Menu/Menu";
import MenuItem from "../MenuItem/MenuItem";
import { OptionItem, useAutocomplete } from "../../hooks/useAutocomplete";
import { IAutocompleteProps } from "./types";
import classNames from "classnames";
import { string, elementType, array, func } from "prop-types";

function defaultHandleSearch(option: string, value: string) {
  return option.includes(value);
}

function Autocomplete(props: IAutocompleteProps) {
  const {
    id,
    filterOptions = defaultHandleSearch,
    getOptionLabel = (option: OptionItem) => option as string,
    getOptionId = (option: OptionItem, index: number) => index,
    options,
    onInputValueChange,
    InputFieldComponent = InputField,
    MenuComponent = Menu,
    MenuItemComponent = MenuItem,
    ...rest
  } = props;

  const [filteredOptions, setFilteredOptions] = useState(options);
  const menuOptions = onInputValueChange ? options : filteredOptions;

  const { getComboboxProps, getLabelProps, getInputProps, getMenuProps, getMenuItemProps, isOpen, highlightIndex } =
    useAutocomplete({
      options: menuOptions,
      id,
      getOptionLabel,
      onInputValueChange: onInputValueChange ?? handleInputValueChange,
      ...rest,
    });

  // For uncontrolled autocomplete
  function handleInputValueChange(inputValue: string) {
    if (!onInputValueChange) {
      setFilteredOptions(options.filter(option => filterOptions(option as string, inputValue)));
    }
  }

  return (
    <div className="relative w-max" {...getComboboxProps()}>
      <InputFieldComponent
        label="Search"
        name="search"
        className="mt-1 w-72"
        labelClassName="block"
        {...getLabelProps()}
        {...getInputProps()}
      />
      {isOpen && (
        <MenuComponent {...getMenuProps()}>
          {!!menuOptions.length &&
            menuOptions.map((item, index) => (
              <MenuItemComponent
                key={getOptionId(item, index)}
                className={classNames("w-60", {
                  "bg-gray-200": highlightIndex === index,
                })}
                {...getMenuItemProps({ item, index })}
              >
                {getOptionLabel(item)}
              </MenuItemComponent>
            ))}
        </MenuComponent>
      )}
    </div>
  );
}

Autocomplete.propTypes = {
  /**
   * autocomplete id required for accessibility
   */
  id: string.isRequired,
  /**
   * array of options to be rendered by autocomplete
   */
  options: array.isRequired,
  /**
   * Value to be rendered for controlled autocomplete
   */
  value: string,
  /**
   * Function which returns option id for each option,defaults to option
   */
  getOptionId: func,
  /**
   * Function which is invoked when input value changes
   */
  onInputValueChange: func,
  /**
   * Component to be rendered for InputField
   */
  InputFieldComponent: elementType,
  /**
   * Component to be rendered for Menu
   */
  MenuComponent: elementType,
  /**
   * Component to be rendered for MenuItem,
   */
  MenuItemComponent: elementType,
};

Autocomplete.defaultProps = {
  InputFieldComponent: InputField,
  MenuComponent: Menu,
  MenuItemComponent: MenuItem,
  value: null,
  onInputValueChange: null,
};

export default Autocomplete;
