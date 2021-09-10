import React, { useEffect } from "react";

type PromiseType = Promise<Record<string, unknown>>;

export function useFetch(promise: PromiseType) {
  const [response, setResponse] = React.useState({});
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await promise;
        setResponse(res);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [promise]);
  return { response, error, isLoading };
}
