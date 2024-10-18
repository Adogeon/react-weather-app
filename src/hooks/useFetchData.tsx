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

const useFetchData = <TSuccess extends object, TError extends object>(
  endpoint: string,
  cache?: Cache<TSuccess | TError>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [data, setData] = useState<TSuccess | null>(null);
  const [error, setError] = useState<TError | null>(null);

  const fetchData = useCallback(async () => {
    setIsFinished(false);
    setIsLoading(true);

    if (cache && cache.get(endpoint)) {
      const cachedData = cache.get(endpoint);
      setData(cachedData as TSuccess);
      setIsLoading(false);
      setIsFinished(true);
      return;
    }
    try {
      const response = await fetch(endpoint);
      const result: FetchRequestResult<TSuccess, TError> =
        await response.json();

      if ("error" in result.data) {
        setError(result.data as TError);
        setData(null);
      } else {
        setData(result.data as TSuccess);
        setError(null);

        if (cache) {
          cache.set(endpoint, result.data);
        }
      }
    } catch (err) {
      setError({
        error: {
          code: "500",
          message: err instanceof Error ? err.message : "Unknown error",
        },
      } as TError);
    } finally {
      setIsLoading(false);
      setIsFinished(true);
    }
  }, [endpoint, cache]);

  return { isLoading, isFinished, data, error, fetchData };
};

export default useFetchData;
