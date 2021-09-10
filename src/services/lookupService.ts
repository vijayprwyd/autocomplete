import axios, { CancelTokenSource } from "axios";
import { API_PATHS } from "./constants";

export function cancelRequestOnReEntry(url: string) {
  let source: CancelTokenSource;

  return function (queryparamObj: Record<string, string>) {
    if (source) {
      source.cancel();
    }
    const queryparamString = new URLSearchParams(queryparamObj).toString();
    source = axios.CancelToken.source();
    return axios
      .get(`${url}?${queryparamString}`, { cancelToken: source.token })
      .then(res => res.data)
      .catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          return {
            isCanceled: true,
          };
        } else {
          throw thrown;
        }
      });
  };
}
export const countryLookupService = cancelRequestOnReEntry(API_PATHS.BASE_URL);
