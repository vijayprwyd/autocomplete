import { useReducer, ChangeEvent, useRef, useEffect, useCallback } from "react";
import { autoCompleteReducer } from "./autocompleteReducer";
import { ActionType, IState, OptionItem, IAutocompleteOptions, TriggerInput } from "./types";
import { InputHTMLAttributes } from "react";
import { useClickTracker } from "../useClickTracker/useClickTracker";

const noop = () => {};

const fun = (x: OptionItem) => x as string;

export function useAutocomplete({
  id,
  options,
  onInputValueChange = noop,
  value,
  getOptionLabel = fun,
  onHighlightIndexChange,
}: IAutocompleteOptions) {
  const initialState: IState = {
    isOpen: false,
    inputValue: "",
    highlightIndex: -1,
    triggerInput: TriggerInput.Other,
  };

  const [{ isOpen, inputValue, highlightIndex, triggerInput }, dispatch] = useReducer(
    autoCompleteReducer,
    initialState
  );

  const comboBoxRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const clickedOutside = useClickTracker(comboBoxRef, isOpen);

  const toggleMenu = useCallback(
    toggleVal => {
      if (isOpen !== toggleVal) {
        dispatch({
          type: ActionType.ToggleMenu,
          isOpen: toggleVal,
        });
      }
    },
    [isOpen]
  );

  useEffect(() => {
    if (clickedOutside && isOpen) {
      toggleMenu(false);
    }
  }, [clickedOutside, isOpen, toggleMenu]);

  useEffect(() => {
    if (triggerInput === TriggerInput.Keyboard && highlightIndex >= 0) {
      const child = menuRef.current?.children.item(highlightIndex);
      child?.scrollIntoView(false);
    }
  }, [highlightIndex, triggerInput]);

  useEffect(() => {
    const inputEl = comboBoxRef?.current?.querySelector(`#${id}`);
    if (document.activeElement !== inputEl) {
      (inputEl as HTMLElement)?.focus();
    }
  }, [inputValue, id]);

  useEffect(() => {
    if (onHighlightIndexChange) onHighlightIndexChange(highlightIndex);
  }, [highlightIndex, onHighlightIndexChange]);

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>): void {
    dispatch({
      type: ActionType.InputChange,
      value: evt.target.value,
    });
  }

  function handleHighlightIndexChange(highlightIndex: number, changeTriggeredBy: TriggerInput) {
    dispatch({
      type: ActionType.HighlightIndexChange,
      isOpen: true,
      highlightIndex,
      triggerInput: changeTriggeredBy,
    });
  }

  function handleInputKeyDown(event: React.KeyboardEvent): void {
    switch (event.code) {
      case "ArrowDown":
        event.preventDefault();
        if (options.length) handleHighlightIndexChange((highlightIndex + 1) % options.length, TriggerInput.Keyboard);
        return;

      case "ArrowUp":
        event.preventDefault();
        if (options.length)
          handleHighlightIndexChange((highlightIndex - 1 + options.length) % options.length, TriggerInput.Keyboard);
        return;

      case "Enter":
        event.preventDefault();
        if (highlightIndex >= 0) {
          dispatch({
            type: ActionType.InputChange,
            value: getOptionLabel(options[highlightIndex]),
            isOpen: false,
          });
        }
      default:
        toggleMenu(true);
    }
  }

  return {
    isOpen,
    highlightIndex,
    getComboboxProps() {
      return {
        "aria-expanded": isOpen,
        "aria-owns": `${id}-menu`,
        role: "combobox",
        ref: comboBoxRef,
      };
    },

    getLabelProps() {
      return {
        htmlFor: id,
      };
    },

    getInputProps(inputProps: Record<string, unknown> = {}): InputHTMLAttributes<HTMLInputElement> {
      const { onChange, onKeydown } = inputProps;
      return {
        ...inputProps,
        autoComplete: "off",
        id,
        onChange(evt: ChangeEvent<HTMLInputElement>) {
          // Manage state only for uncontrolled components
          if (value == null) {
            toggleMenu(true);
            handleInputChange(evt);
            onInputValueChange(evt.target.value);
          }
          typeof onChange === "function" && onChange(evt);
        },
        onKeyDown(event: React.KeyboardEvent) {
          handleInputKeyDown(event);
          typeof onKeydown === "function" && onKeydown(event);
        },
        onMouseDown() {
          toggleMenu(true);
        },
        value: value || inputValue,
      };
    },

    getMenuProps() {
      return {
        "aria-labelledby": `${id}-label`,
        id: `${id}-menu`,
        role: "listbox",
        ref: menuRef,
      };
    },

    getMenuItemProps({ item, index }: { index: number; item: OptionItem }): React.LiHTMLAttributes<HTMLLIElement> {
      return {
        "aria-selected": index === highlightIndex,
        id: `${id}-item-${index}`,
        onClick() {
          dispatch({
            type: ActionType.InputChange,
            value: getOptionLabel(item),
          });
          toggleMenu(false);
        },
        onMouseMove() {
          if (highlightIndex !== index) {
            handleHighlightIndexChange(index, TriggerInput.Mouse);
          }
        },
        role: "option",
      };
    },
  };
}
