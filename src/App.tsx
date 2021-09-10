import React from "react";
import AutocompleteAsync, { AutocompleteAsyncLoadOptions } from "./components/AutocompleteAsync";
import { OptionItem } from "./hooks/useAutocomplete";
import { countryLookupService } from "./services/lookupService";

type CountryOption = {
  id: number;
  name: string;
};

function fetchSearchQuery(payload: Record<string, string>) {
  return countryLookupService(payload);
}

async function loadSearchOptions(autocompleteAsyncLoadOptions: AutocompleteAsyncLoadOptions) {
  const { inputValue, currentPage } = autocompleteAsyncLoadOptions;
  const response = await fetchSearchQuery({
    q: inputValue,
    pageSize: "10",
    page: currentPage.toString(),
    latency: "2000",
    //monkey: "kh",
  });
  if (!response.data) return [];
  return response.data.map((country: CountryOption) => ({
    id: country.id,
    name: country.name,
  }));
}

function getOptionLabel(option: OptionItem) {
  return (option as CountryOption).name;
}

function App() {
  return (
    <div className="m-4">
      <h1>Contiamo tech challenge</h1>
      <div className="mt-1">
        <AutocompleteAsync
          id="search"
          options={[]}
          getOptionId={getOptionLabel}
          getOptionLabel={getOptionLabel}
          loadSearchOptions={loadSearchOptions}
          debounceDuration={200}
        />
      </div>
    </div>
  );
}

export default App;
