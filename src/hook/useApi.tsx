import { useState, useEffect } from "react";

type ApiFn<T> = (params?: any) => Promise<any>;

interface UseApiResult {
  data: any | null;
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

function useApi<T>(apiFn: ApiFn<T>): UseApiResult {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [reloadIndex, setReloadIndex] = useState(0);

  const reload = () => setReloadIndex((index) => index + 1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    apiFn()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiFn, reloadIndex]);

  return {
    data,
    loading,
    error,
    reload,
  };
}

export default useApi;
