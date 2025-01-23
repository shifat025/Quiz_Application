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
      console.log(entryData);
      const response = await api.post(
        `admins/quizsets/${quizSetId}/questions/`,
        entryData
      );
      if (response.status === 201) {
        console.log(response.data);
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

  const updateQuestion = async (questionId, entryData) => {
    try {
      setLoading(true);
      setError(null); // Reset error before request
      const response = await api.patch(
        `admins/questions/${questionId}/update/`,
        entryData
      );
      if (response.status === 200) {
        return response.data;
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
      const response = await api.delete(`/admins/questions/${questionId}/delete/`);
      if (response.status === 204) {
        return true;
      } else {
        throw new Error("Failed to delete question");
      }
    } catch (err) {
      console.log("delete error",err);
      setError(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };


  return { createQuestion, updateQuestion,deleteQuestion, loading, error };
}
