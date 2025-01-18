import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";

const FetchQuizResult = (quizId) => {
  const [quizData, setQuizData] = useState();
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
        } else {
          throw new Error("Failed to fetch quiz data");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  return { quizData, loading, error };
};

export default FetchQuizResult;
