import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizQuestions({ quiz, onRemainingQuestions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { quizId } = useParams();
  const {api} = useAxios()
  const navigate = useNavigate()
  

  if (!quiz || !quiz.questions) {
    return <div>No quiz data available</div>;
  }

  // Total question lenth and track how many quiz i checked
  const totalQuestions = quiz?.questions?.length;
  useEffect(() => {
    if (onRemainingQuestions) {
      onRemainingQuestions(totalQuestions - currentQuestionIndex);
    }
  }, [currentQuestionIndex]);

  
  // For rotate quiz option
  const currentQuestion = quiz?.questions[currentQuestionIndex] || null;
  const shuffleOptions = () => {
    setShuffledOptions(
      [...currentQuestion.options].sort(() => Math.random() - 0.5)
    );
  };

  useEffect(() => {
    // Automatic rotate quiz options
    shuffleOptions();

    // Automatic rotate quiz options after 10 sec
    const interval = setInterval(() => {
      shuffleOptions();
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, [currentQuestionIndex]);

  //  Save the quiz answer in the state
  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Go to Next quiz qustion
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      // onRemainingQuestions(totalRemaining);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("You have reached the end of the quiz");
    }
  };

  // Go to previous quiz question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.post(`submit-quiz/${quizId}/`, {answers:selectedAnswers });
      console.log(response.status);
      if (response.status === 200) {
        navigate(`/quiz_page/${quizId}/result`);
      }
    } catch (error) {
      console.error("This is attempt error", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="lg:col-span-2 bg-white">
      <div className="bg-white p-6 !pb-2 rounded-md">
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {shuffledOptions.map((answer, index) => (
              <label
                key={`${currentQuestion.id}-answer-${index}`}
                className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
              >
                <input
                  type="checkbox"
                  name={`question-${currentQuestionIndex}-answer`}
                  value={answer}
                  checked={selectedAnswers[currentQuestion.id] === answer}
                  onChange={() =>
                    handleAnswerChange(currentQuestion.id, answer)
                  }
                  className="form-radio text-buzzr-purple"
                />
                <span>{answer}</span>
              </label>
            ))}
          </div>
        </>

        <div className="flex justify-between mt-6 gap-4">
          {currentQuestionIndex > 0 && (
            <button
              onClick={handlePreviousQuestion}
              className="w-1/2 text-center bg-primary text-white py-2 px-4  rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold"
            >
              Previous
            </button>
          )}
          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-800"
              } w-1/2 text-center ml-auto block text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 mb-6 font-semibold`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
