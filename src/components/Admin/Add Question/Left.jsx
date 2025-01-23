import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CreateUpdateQuestion } from "../../../features/Admin/NewQuestionList/CreateUpdateQuestion";

export default function QuizEntry({
  setQuestions,
  edit,
  setIsEdit,
  selectedQuestion,
  questions,
}) {
  const [correctedAnswer, setCorrectedAnswer] = useState(null);
  const quizSetId = useParams().quizSetId;

  const { createQuestion, updateQuestion, loading, error } =
    CreateUpdateQuestion(quizSetId);

  const location = useLocation();
  const { title, description } = location.state || {};

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      options: ["", "", "", ""],
      correct_answer: "",
    },
  });

  const resetForm = () => {
    reset({
      question: "",
      options: ["", "", "", ""],
      correct_answer: "",
    });
    setCorrectedAnswer(null);
  };

  useEffect(() => {
    if (edit && selectedQuestion) {
      const correctAnswerIndex = selectedQuestion.options.indexOf(
        selectedQuestion.correct_answer
      );
      reset({
        question: selectedQuestion.question,
        options: selectedQuestion.options,
        correct_answer: selectedQuestion.correct_answer,
      });
      setCorrectedAnswer(correctAnswerIndex);
    } else {
      resetForm();
    }
  }, [edit, selectedQuestion, reset]);

  const onSubmit = async (data) => {
    if (correctedAnswer === null) {
      setError("correct_answer", {
        type: "manual",
        message: "Select a correct answer",
      });
      return;
    }
    const entryData = {
      ...data,
      correct_answer: data.options[correctedAnswer],
    };
    if (edit && selectedQuestion?.id) {
      const updatedQuestion = await updateQuestion(
        selectedQuestion.id,
        entryData
      );
      if (updatedQuestion) {
        setQuestions((prev) =>
          prev.map((question) =>
            question.id === selectedQuestion.id ? updatedQuestion : question
          )
        );

        setIsEdit(false);
        resetForm();
        toast.success("Question updated successfully!");
      }
    } else {
      const newQuestion = await createQuestion(entryData);
      if (newQuestion) {
        setQuestions((prev) => [...prev, newQuestion]);
        resetForm();
        toast.success("Question created successfully!");
      }
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
        Total number of questions : {questions.length}
      </div>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* create quiz */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>
          {/* question */}

          <div>
            <label
              htmlFor="quizTitle"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Question Title
            </label>
            <input
              type="text"
              id="quizTitle"
              {...register("question", {
                required: "Question is required",
              })}
              className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
              placeholder="Enter quiz title"
            />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question.message}</p>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-4">Add Options</p>

          <div id="optionsContainer" className="space-y-2 mt-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
              >
                <input
                  type="checkbox"
                  id={`option${index}`}
                  name="correct_answer"
                  value={index}
                  checked={correctedAnswer === index}
                  onChange={(e) => {
                    setCorrectedAnswer(e.target.checked ? index : null); // Update state based on checkbox selection
                    clearErrors("correct_answer");
                  }}
                  className="text-primary focus:ring-0 w-4 h-4"
                />
                <label htmlFor={`option${index}`} className="sr-only">
                  Option {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`options.${index}`, {
                    required: `Option ${index + 1} is required`,
                  })}
                  id={`optionText${index}`}
                  className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                  placeholder={`Option ${index + 1}`}
                />
                {errors.options?.[index] && (
                  <p className="text-red-500 text-sm">
                    {errors.options[index].message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Validation Error for Correct Answer */}
          {errors.correct_answer && (
            <p className="text-red-500 text-sm">
              {errors.correct_answer.message}
            </p>
          )}
          <button className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                {edit ? "Updating..." : "Saving..."}
              </span>
            ) : (
              <>{edit ? "Update Question" : "Save Quiz"}</>
            )}
          </button>
        </div>
      </form>

      {/* dsfsad */}
    </div>
  );
}
