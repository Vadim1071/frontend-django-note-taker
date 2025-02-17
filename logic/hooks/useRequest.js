import { useState, useEffect } from "react";

/**
 * Custom hook to perform an asynchronous request.
 * 
 * @template T
 * @param {() => Promise<T>} fetchFunction - The function that returns a promise to execute the request, need to memoize.
 * @returns {{ data: T | null, error: string | null, loading: boolean }} - Object containing the request data, error, and loading state.
 */
const useRequest = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFunction();
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally { 
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFunction]);

  return { data, error, loading };
};


export default useRequest;
