// import { useState, useEffect } from "react";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import useGetAttempts from "../../hooks/useGetAttempts";


const FetchGetAttempts = (quizId) => {
  const {setGetAttempts} = useGetAttempts()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { api } = useAxios();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before new request
        const response = await api.get(`/attempts/quiz-data/${quizId}/`);
        if (response.status === 200) {
            setGetAttempts(response.data);
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

  return {  loading, error };
};

export default FetchGetAttempts;
