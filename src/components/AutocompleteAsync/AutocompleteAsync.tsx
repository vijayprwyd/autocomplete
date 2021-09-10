import React, { useCallback, useRef, useState } from "react";
import { func, number, string } from "prop-types";
import Autocomplete from "../Autocomplete";
import { debounce } from "../../utils/debounce";
import MenuWithLoader from "./MenuWithLoader";
import { IAutocompleteAsyncProps } from "./types";
import { OptionItem } from "../../hooks/useAutocomplete";

type AutocompleteAsyncState = {
  isLoading: boolean;
  error: Record<string, unknown> | null;
  filteredOptions: OptionItem[];
  isFetchingNext: boolean;
  hasMore: boolean;
};

const initialState: AutocompleteAsyncState = {
  isLoading: false,
  error: null,
  filteredOptions: [],
  isFetchingNext: false,
  hasMore: false,
};

function AutocompleteAsync(props: IAutocompleteAsyncProps) {
  const { loadSearchOptions, debounceDuration, fetchThreshold, ...rest } = props;

  const [loadStatus, setLoadStatus] = useState(initialState);
  const latestRequestTimestamp = useRef(0);
  const apiInfo = useRef({
    currentPage: 1,
    inputValue: "",
  });

  const handleLoad = useCallback(
    async (inputValue: string, shouldFetchNext: boolean) => {
      apiInfo.current.inputValue = inputValue;
      if (shouldFetchNext) apiInfo.current.currentPage++;
      else apiInfo.current.currentPage = 1;
      const requestTimestamp = Date.now();
      latestRequestTimestamp.current = requestTimestamp;
      setLoadStatus(prevState => ({
        ...prevState,
        filteredOptions: shouldFetchNext ? [...prevState.filteredOptions] : [],
        error: null,
        isLoading: !shouldFetchNext,
        isFetchingNext: shouldFetchNext,
        currentPage: shouldFetchNext ? apiInfo.current.currentPage + 1 : apiInfo.current.currentPage,
      }));

      try {
        const response = await loadSearchOptions({
          ...apiInfo.current,
        });

        if (latestRequestTimestamp.current !== requestTimestamp) return;

        setLoadStatus(prevState => ({
          isLoading: false,
          error: null,
          filteredOptions: shouldFetchNext
            ? ([...prevState.filteredOptions, ...response] as OptionItem[])
            : (response as OptionItem[]),
          isFetchingNext: false,
          hasMore: response.length !== 0,
        }));
      } catch (error) {
        if (latestRequestTimestamp.current !== requestTimestamp) return;
        setLoadStatus({
          isLoading: false,
          error,
          filteredOptions: [],
          isFetchingNext: false,
          hasMore: true,
        });
      }
    },
    [loadSearchOptions]
  );

  const handleHighlightIndexChange = useCallback(
    (index: number) => {
      if (
        loadStatus.filteredOptions.length > 0 &&
        index > loadStatus.filteredOptions.length * fetchThreshold &&
        loadStatus.hasMore &&
        !loadStatus.isFetchingNext
      )
        handleLoad(apiInfo.current.inputValue, true);
    },
    [handleLoad, loadStatus.filteredOptions.length, loadStatus.hasMore, loadStatus.isFetchingNext, fetchThreshold]
  );

  return (
    <Autocomplete
      {...rest}
      options={loadStatus.filteredOptions}
      onInputValueChange={debounce(handleLoad as any, debounceDuration)}
      onHighlightIndexChange={handleHighlightIndexChange}
      // eslint-disable-next-line react/display-name
      MenuComponent={React.forwardRef((props, ref) => (
        <MenuWithLoader
          ref={ref}
          {...props}
          isLoading={loadStatus.isLoading}
          isFetchingNext={loadStatus.isFetchingNext}
          error={loadStatus.error}
          isOpen={
            loadStatus.isLoading ||
            !!loadStatus.error ||
            loadStatus.isFetchingNext ||
            loadStatus.filteredOptions.length > 0
          }
        />
      ))}
    />
  );
}

AutocompleteAsync.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  id: string.isRequired,
  /**
   * Function which is invoked to fetch searh options; must return a promise
   */
  loadSearchOptions: func.isRequired,
  /**
   * Debounce duration for load search api call to be triggered
   */
  debounceDuration: number,
};

AutocompleteAsync.defaultProps = {
  debounceDuration: 200,
  fetchThreshold: 0.7,
  options: [],
};

export default AutocompleteAsync;
