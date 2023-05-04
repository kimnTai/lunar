import { useState } from "react";

type UseApiReturnType<T> = [T | null, boolean, (data: any) => Promise<void>];

export function useApi<T>(
  apiFunc: (data: any) => Promise<T>
): UseApiReturnType<T> {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function callApi(data: any): Promise<void> {
    try {
      setLoading(true);
      const result = await apiFunc(data);
      setResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return [result, loading, callApi];
}
