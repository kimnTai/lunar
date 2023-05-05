import { useState } from "react";

type UseApiReturnType = [{ status: string; result: any } | null, boolean, (data: any) => Promise<void>];

export function useApi<T>(
  apiFunc: (data: any) => Promise<T>
): UseApiReturnType {
  const [result, setResult] = useState<{ status: string; result: any } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  async function callApi(data: any): Promise<void> {
    try {
      setLoading(true);
      const result = (await apiFunc(data)) as { status: string; result: any };
      setResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return [result, loading, callApi];
}
