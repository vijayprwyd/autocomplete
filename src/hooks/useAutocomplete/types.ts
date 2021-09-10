export enum ActionType {
  ToggleMenu = "ToggleMenu",
  InputChange = "InputChange",
  HighlightIndexChange = "HighlightIndexChange",
}

export enum TriggerInput {
  Keyboard = "Keyboard",
  Mouse = "Mouse",
  Other = "Other",
}

interface IAction {
  type: ActionType;
}

export type ToggleMenuAction = IAction & {
  isOpen: boolean;
};

export type InputChangeAction = IAction & {
  value: string;
  isOpen?: boolean;
};

export type HighlightIndexChangeAction = IAction & {
  highlightIndex: number;
  triggerInput: TriggerInput;
};

export type AutocompleteAction = ToggleMenuAction | InputChangeAction | HighlightIndexChangeAction;

export interface IState {
  isOpen: boolean;
  inputValue: string;
  highlightIndex: number;
  triggerInput: TriggerInput;
}

export type OptionItem = Record<string, unknown> | string;

export interface IAutocompleteOptions {
  /**
   * Autocomplete id required for accessibility purposes,
   */
  id: string;
  /**
   * Options which are rendered
   */
  options: Array<OptionItem>;
  /**
   * Function which returns option label  for a given option
   */
  getOptionLabel?: (option: OptionItem) => string;
  /**
   * Callback function which is invoked each time the input value in autocomplete changes
   */
  onInputValueChange?: (value: string) => void;
  /**
   * Option item which is currently selected
   */
  selectedItem?: OptionItem;
  /**
   * Autocomplete input value
   */
  value?: string;
  /**
   * callback to be invoked when highlight index is changed
   */
  onHighlightIndexChange?: (highlightIndex: number) => void;
}
