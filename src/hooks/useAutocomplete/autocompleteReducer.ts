import {
  ActionType,
  IState,
  AutocompleteAction,
  ToggleMenuAction,
  InputChangeAction,
  HighlightIndexChangeAction,
} from "./types";

export function autoCompleteReducer(state: IState, action: AutocompleteAction): IState {
  const { type } = action;

  switch (type) {
    case ActionType.ToggleMenu:
      return {
        ...state,
        isOpen: (action as ToggleMenuAction).isOpen,
      };

    case ActionType.InputChange:
      return {
        ...state,
        inputValue: (action as InputChangeAction).value,
        isOpen: (action as InputChangeAction).isOpen ?? state.isOpen,
        highlightIndex: 0,
      };

    case ActionType.HighlightIndexChange:
      return {
        ...state,
        isOpen: true,
        highlightIndex: (action as HighlightIndexChangeAction).highlightIndex,
        triggerInput: (action as HighlightIndexChangeAction).triggerInput,
      };

    default:
      return state;
  }
}
