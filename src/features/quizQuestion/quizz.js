import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
// import { useAxios } from "../useAxios";

export const useFetchQuiz = (quizId) => {
  const [quizData, setQuizData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { api } = useAxios();

  useEffect(() => {
    const fetchQuiz = async () => {
        try {
          setLoading(true);
          setError(null); // Reset error before new request
          const response = await api.get(`/quizzes/${quizId}`);
          if (response.status === 200) {
            setQuizData(response.data.data);
          } 
        } catch (err) {
          // Handle network or other errors
          const message = err.response
            ? err.response.data.message || "Failed to fetch quiz data."
            : err.message || "An unexpected error occurred.";
          setError(message);
        } finally {
          setLoading(false);
        }
      };
  
      if (quizId) {
        fetchQuiz();
      }
  }, []);

  return { quizData, loading, error };
};
