import { useEffect, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";

const FetchQuizList = () => {
  const [quizListData, setQuizListData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { api } = useAxios();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before new request
        const response = await api.get("/admin/quizzes");
        if (response.status === 200) {
          setQuizListData(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  return { quizListData, loading, error };
};

export default FetchQuizList;
