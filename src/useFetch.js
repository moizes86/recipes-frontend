import { useState, useCallback } from "react";
import Spinner from "./components/Spinner";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (cb, ...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cb(...params);
      setData(result.data.payload);
      setMessage(result.data.message);
    } catch (e) {
      setError(e.response.data.message || "Something went wrong");
    }
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
    message,
    Spinner,
    sendRequest,
    setMessage
  };
};

export default useFetch;
