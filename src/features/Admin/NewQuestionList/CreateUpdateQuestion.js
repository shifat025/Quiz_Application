import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
// import { useAxios } from "../../../hooks/useAxios";

export function CreateUpdateQuestion(quizSetId) {
  const { api } = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createQuestion = async (entryData) => {
    try {
      setLoading(true);
      setError(null); // Reset error before request
      const response = await api.post(
        `admin/quizzes/${quizSetId}/questions`,
        entryData
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

  const updateQuestion = async (questionId, entryData) => {
    try {
      setLoading(true);
      setError(null); // Reset error before request
      const response = await api.patch(
        `admin/questions/${questionId}`,
        entryData
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error("Failed to update question");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      setLoading(true);
      setError(null); // Reset error before request
      const response = await api.delete(`admin/questions/${questionId}`);
      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Failed to delete question");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };


  return { createQuestion, updateQuestion,deleteQuestion, loading, error };
}
