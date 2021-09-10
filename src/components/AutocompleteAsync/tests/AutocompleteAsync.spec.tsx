import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AutocompleteAsync from "../AutocompleteAsync";
import { OptionItem } from "../../../hooks/useAutocomplete";

describe("AutocompleteAsync component testing", () => {
  test("fetched data should be rendered as options", async () => {
    const loadSearchOptions: () => Promise<Array<OptionItem>> = () =>
      new Promise(resolve => {
        return resolve(["Apple", "Orange", "Mango"]);
      });

    const { container } = render(
      <AutocompleteAsync id="autocomplete" loadSearchOptions={loadSearchOptions} debounceDuration={0} />
    );
    const input = container.querySelector("input");
    expect(input?.value).toBe("");
    fireEvent.change(input as Element, { target: { value: "abc" } });
    await screen.findByText("Apple");
  });

  test("error message should be displayed when fetch query fails", async () => {
    const loadSearchOptions: () => Promise<Array<OptionItem>> = () =>
      new Promise((resolve, reject) => {
        return reject({
          error: "error",
        });
      });

    const { container } = render(
      <AutocompleteAsync id="autocomplete" loadSearchOptions={loadSearchOptions} debounceDuration={0} />
    );
    const input = container.querySelector("input");
    expect(input?.value).toBe("");
    fireEvent.change(input as Element, { target: { value: "abc" } });
    await screen.findByText("Failed to fetch");
  });

  test("loading indicator shoule be shown when loading data", async () => {
    const loadSearchOptions: () => Promise<Array<OptionItem>> = () =>
      new Promise((resolve, reject) => {
        return reject({
          error: "error",
        });
      });

    const { container } = render(
      <AutocompleteAsync id="autocomplete" loadSearchOptions={loadSearchOptions} debounceDuration={0} />
    );
    const input = container.querySelector("input");
    fireEvent.change(input as Element, { target: { value: "abc" } });
    await screen.findByText("Loading ...");
  });
});
