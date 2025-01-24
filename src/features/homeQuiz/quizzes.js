import { useEffect, useState } from "react";
import { api as baseurl } from "../../api";
import useAuth from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
// import { useAxios } from "../../hooks/useAxios";

export const useFetchQuizzes = () => {
  const { auth } = useAuth();
  const { api } = useAxios();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before a new request
        const response = auth?.authToken
          ? await api.get("/user_set/")
          : await baseurl.get("/user_set/");
        if (response.status === 200) {
          setQuizzes(response.data);
        } else {
          throw new Error(`Error: Received status code ${response.status}`);
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return { quizzes, loading, error };
};
