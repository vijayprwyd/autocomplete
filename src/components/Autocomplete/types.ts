import { IInputProps } from "../InputField";
import { IAutocompleteOptions, OptionItem } from "../../hooks/useAutocomplete";

export interface IAutocompleteProps extends IAutocompleteOptions {
  /**
   * Optional function which determines if an option needs to be rendered after an input change,
   */
  filterOptions?: (option: OptionItem, value: string, index?: number) => boolean;

  /**
   * Function which returns option id for each option,defaults to option
   */
  getOptionId?: (item: OptionItem) => string;

  /**
   * Function which is invoked when input value changes
   */
  onInputValueChange?: (value: string) => void;

  /**
   * Component to be rendered for InputField,
   */
  InputFieldComponent?: React.FC<IInputProps>;

  /**
   * Component to be rendered for Menu
   */
  MenuComponent?: React.ForwardRefExoticComponent<React.RefAttributes<HTMLUListElement>>;

  /**
   * Component to be rendered for MenuItem,
   */
  MenuItemComponent?: React.FC;
}
