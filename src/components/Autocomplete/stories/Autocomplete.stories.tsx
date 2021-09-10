import React, { ComponentProps } from "react";
import { Story } from "@storybook/react";
import "../../../main.css";

import Autocomplete, { IAutocompleteProps } from "../index";
import { top100Films } from "./mockData";

export default {
  title: "Autocomplete",
  component: Autocomplete,
  id: "autocomplete",
};

const Template: Story<ComponentProps<typeof Autocomplete>> = (props: IAutocompleteProps) => <Autocomplete {...props} />;

export const AutocompleteBasic = Template.bind({});
AutocompleteBasic.args = {
  id: "autocompleteBasic",
  options: ["Apple", "Orange", "Mango", "Grapes", "Apricot"],
};

export const AutocompleteControlled = Template.bind({});
AutocompleteControlled.args = {
  id: "autocompleteControlled",
  options: ["Apple", "Orange", "Mango", "Grapes", "Apricot"],
  value: "I won't change",
};

export const AutocompleteCustomInput = Template.bind({});
AutocompleteCustomInput.args = {
  id: "autocompleteCustomInput",
  options: ["Apple", "Orange", "Mango", "Grapes", "Apricot"],
  // eslint-disable-next-line react/prop-types
  InputFieldComponent: function MyCustomInput({ value, onChange }) {
    return <input style={{ border: "1px solid green" }} value={value} onChange={onChange} />;
  },
};

export const AutocompleteCustomOptionFilter = Template.bind({});
AutocompleteCustomOptionFilter.args = {
  id: "autocompleteCustomOptionFilter",
  options: top100Films,
  filterOptions: (option: any, inputValue) => option.title.startsWith(inputValue),
  getOptionLabel(option: any) {
    return option.title;
  },
  getOptionId(option: any) {
    return option.title;
  },
};
