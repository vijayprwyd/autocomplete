import React, { ComponentProps } from "react";
import { Story } from "@storybook/react";
import "../../../main.css";
import { OptionItem } from "../../../hooks/useAutocomplete";
import AutocompleteAsync, { IAutocompleteAsyncProps } from "../index";

type Option = Record<string, string>;

export default {
  title: "AutocompleteAsync",
  component: AutocompleteAsync,
  id: "autocompleteAsync",
  parameters: {
    /* docs: {
      page: AutocompleteAsyncDocumentation,
    },*/
    argTypes: {
      id: { storyDescription: "color" },
    },
  },
};

const Template: Story<ComponentProps<typeof AutocompleteAsync>> = (args: IAutocompleteAsyncProps) => (
  <AutocompleteAsync {...args} />
);

export const SuccessResponse = Template.bind({});
SuccessResponse.args = {
  id: "autocompleteSuccess",
  loadSearchOptions() {
    return new Promise(resolve => setTimeout(() => resolve(["Title1", "Title2"]), 1000));
  },
};

export const ErrorResponse = Template.bind({});
ErrorResponse.args = {
  id: "autocompleteError",
  loadSearchOptions() {
    return new Promise((resolve, reject) => setTimeout(() => reject(["Title1", "Title2"]), 1000));
  },
};

export const CustomDebounce = Template.bind({});
CustomDebounce.args = {
  id: "customDebounce",
  debounceDuration: 300,
  loadSearchOptions() {
    return new Promise(resolve => setTimeout(() => resolve(["Title1", "Title2"]), 1000));
  },
};

export const CustomSearchFunction = Template.bind({});

CustomSearchFunction.args = {
  id: "customSearch",
  debounceDuration: 300,
  loadSearchOptions() {
    return new Promise(resolve =>
      setTimeout(
        () =>
          resolve([
            {
              title: "Option1",
              value: "Option1",
            },
            {
              title: "Option2",
              value: "Option2",
            },
          ]),
        1000
      )
    );
  },
  handleSearch(option: OptionItem, value) {
    return (option as Option).title.includes(value);
  },
  getOptionLabel(option) {
    return (option as Option).title;
  },
  getOptionId(option) {
    return (option as Option).title;
  },
};
