import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
// import { useAxios } from "../../../hooks/useAxios";

export function QuizSetApi() {
  const { api } = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createQuizSet = async (data) => {
    try {
      setLoading(true);
      setError(null); // Reset error before request
      const response = await api.post(
        `admin/quizzes/`,
        data
      );
      if (response.status === 201) {
        return response.data.data;
      } else {
        throw new Error("Failed to create question");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateQuizSet = async (quizSetId, data) => {
    try {
      setLoading(true);
      setError(null); // Reset error before request
      const response = await api.patch(
        `admin/quizzes/${quizSetId}`,
        data
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error("Failed to update question set");
      }
    } catch (err) {
        console.log("this is error",err.response.data.message);
      setError(err.response.data.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestionSet = async (quizSetId) => {
    try {
      setLoading(true);
      setError(null); // Reset error before request
      const response = await api.delete(`admin/quizzes/${quizSetId}`);
      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Failed to delete question set");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };



  return { createQuizSet, updateQuizSet,deleteQuestionSet, loading, error };
}
