import { useEffect, useState } from "react";

interface UseFetchProps<T> {
  fetchFn: () => Promise<T>; 
  initialValue: T; 
  reCall: []
}

export function useFetch<T>({ fetchFn, initialValue , reCall }: UseFetchProps<T>) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [data, setData] = useState<T>(initialValue); // Použití initialValue správně

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      setError(null);

      try {
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError({ message: (err as Error).message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

      fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...reCall]);

  return {
    isFetching,
    data,
    error,
    setData,
    setIsFetching
  };
}