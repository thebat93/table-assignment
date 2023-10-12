import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const isValidKey = <K extends string>(key: string, keys: K[]): key is K =>
  keys.includes(key as K);

const useQueryParams = <K extends string>(
  keys: K[],
  initialParams?: Record<string, string>
) => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(initialParams)
  );

  const params = {} as Record<K, string>;

  for (const [key, value] of searchParams.entries()) {
    if (isValidKey(key, keys)) {
      params[key] = value;
    }
  }

  const setParams = useCallback(
    (newParams: Partial<Record<K, string>>) => {
      setSearchParams((oldParams) => {
        const params = new URLSearchParams(oldParams);

        for (const [key, value] of Object.entries(newParams)) {
          params.set(key, String(value));
        }

        return params;
      });
    },
    [setSearchParams]
  );

  return {
    params,
    searchParams,
    setParams,
  };
};

export { useQueryParams, isValidKey };
