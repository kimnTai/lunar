import { useState } from "react";

type ApiFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

export function useApi<T, Args extends any[]>(apiFunc: ApiFunction<T, Args>) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function callApi(...args: Args) {
    try {
      setLoading(true);
      const result = await apiFunc(...args);
      setResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return [result, loading, callApi] as const;
}
