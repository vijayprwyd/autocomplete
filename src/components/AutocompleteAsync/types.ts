import { OptionItem } from "../../hooks/useAutocomplete";
import { IAutocompleteProps } from "../Autocomplete";

export type AutocompleteAsyncLoadOptions = {
  inputValue: string;
  currentPage: number;
};

export interface IAutocompleteAsyncProps extends IAutocompleteProps {
  /**
   * Is this the principal call to action on the page?
   */
  id: string;
  /**
   * Function which is invoked to fetch searh options; must return a promise
   */
  loadSearchOptions: (args: AutocompleteAsyncLoadOptions) => Promise<Array<OptionItem>>;
  /**
   * Optional Function which determines if the option needs o be filtered based on current value
   */
  handleSearch?: (item: OptionItem, value: string, index?: number) => boolean;
  /**
   * Debounce duration for load search api call to be triggered
   */
  debounceDuration?: number;
  /**
   * Threshold between 0 and 1 which indicates when search query should be triggered for infinite scroll
   */
  fetchThreshold?: number;
}
