import { useParams } from "react-router-dom";
import FetchGetAttempts from "../../features/attempts/getAttempt";

import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useGetAttempts from "../../hooks/useGetAttempts";

export default function QuizAnswer({ quizData }) {
  const {
    getAttempts: answersData,
    setTotalQuestion,
    setCorrectAnswer,
  } = useGetAttempts();
  const { quizId } = useParams();
  const { loading, error } = FetchGetAttempts(quizId);
  const { auth } = useAuth();
  const user = auth?.user;

  // Finding the user's attempt from the fetched data
  const userAttemt = answersData?.attempts?.find(
    (attempt) => attempt.user.id === user?.id
  );

  // Extracting submitted and correct answers from the user's attempt
  const submittedData = userAttemt?.submitted_answers || [];
  const correctAnswers = userAttemt?.correct_answers || [];

  // Filtering correct answers from the submitted answers
  const correctAnswer = submittedData.filter((answer) =>
    correctAnswers.some(
      (correct) =>
        correct.question_id === answer.question_id &&
        correct.answer === answer.answer
    )
  );

  // Setting total questions and correct answers count using state setters
  useEffect(() => {
    setCorrectAnswer(correctAnswer.length);
    setTotalQuestion(answersData?.quiz?.total_questions);
  }, [correctAnswer.length, answersData?.quiz?.total_questions]);

  // Mapping through quiz questions to display each question and options
  const questionElements = quizData?.questions?.map((question, index) => {
    const submittedAnswer = submittedData.find(
      (answer) => answer.question_id === question.id
    );
    const correctAnswer = correctAnswers.find(
      (answer) => answer.question_id === question.id
    );
    return (
      <div
        key={question.id}
        className="rounded-lg overflow-hidden shadow-sm mb-4"
      >
        <div className="bg-white p-6 !pb-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {index + 1}. {question.question}
            </h3>
          </div>
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isCorrect = correctAnswer?.answer === option;
              const isSelected = submittedAnswer?.answer === option;

              const optionClass = isCorrect
                ? "bg-green-100 text-green-600"
                : isSelected && !isCorrect
                ? "bg-red-100 text-red-600"
                : "bg-white text-gray-800";

              let message = "";
              if (isCorrect && isSelected) {
                message = "This is the correct answer that you selected.";
              } else if (isCorrect && !isSelected) {
                message = "This is the correct answer that you did not select.";
              } else if (isSelected && !isCorrect) {
                message = "This is the wrong answer that you selected.";
              }

              return (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-2 rounded ${optionClass}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    className="form-radio  text-buzzr-purple"
                    checked={isSelected}
                    readOnly
                  />
                  <span>{option}</span>
                  {/* {message && <small className=" text-sm text-gray-500">{message}</small>} */}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
        <div className="px-4">{questionElements}</div>
      </div>
    </div>
  );
}
