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
      const response = await api.post(`/admins/quizsets/create/`, data);
      if (response.status === 201) {
        return response.data;
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
        `/admins/quizsets/${quizSetId}/update/`,
        data
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to update question set");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.[0] || "Something went wrong";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestionSet = async (quizSetId) => {
    try {
      setLoading(true);
      setError(null); // Reset error before request
      const response = await api.delete(
        `/admins/quizsets/${quizSetId}/delete/`
      );
      if (response.status === 204) {
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

  return { createQuizSet, updateQuizSet, deleteQuestionSet, loading, error };
}
