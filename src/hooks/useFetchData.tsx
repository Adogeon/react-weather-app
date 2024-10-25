import { useState, useCallback } from "react";

export interface FetchRequestResult<
  TSuccess extends object,
  TError extends object
> {
  status: number;
  data: TSuccess | TError;
}

export interface Cache<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
}

type FetchState<TSuccess, TError> =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "success"; data: TSuccess; error: null }
  | { status: "error"; data: null; error: TError };

const useFetchData = <TSuccess extends object, TError extends object>(
  cache?: Cache<TSuccess | TError>
) => {
  const [state, setState] = useState<FetchState<TSuccess, TError>>({
    status: "idle",
    data: null,
    error: null,
  });

  const fetchData = useCallback(
    async (endpoint: string) => {
      setState({ status: "loading", data: null, error: null });

      const cachedData = cache?.get(endpoint) as TSuccess;
      if (cachedData) {
        setState({ status: "success", data: cachedData, error: null });
        return;
      }

      try {
        const response = await fetch(endpoint);
        const result: FetchRequestResult<TSuccess, TError> =
          await response.json();

        if ("error" in result.data) {
          throw result.data as TError;
        } else {
          setState({
            status: "success",
            data: result.data as TSuccess,
            error: null,
          });
          cache?.set(endpoint, result.data);
        }
      } catch (err) {
        setState({
          status: "error",
          data: null,
          error:
            err instanceof Error
              ? ({ code: "500", message: err.message } as TError)
              : (err as TError),
        });
      }
    },
    [cache]
  );

  return {
    ...state,
    fetchData,
  };
};

export default useFetchData;
