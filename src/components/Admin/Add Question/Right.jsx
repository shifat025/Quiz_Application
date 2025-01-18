import { useParams } from "react-router-dom";
import { CreateUpdateQuestion } from "../../../features/Admin/NewQuestionList/CreateUpdateQuestion";

export default function QuestionList({
  questions,
  setQuestions,
  edit,
  setIsEdit,
  setSelectedQuestion,
  selectedQuestion,
}) {
  const quizSetId = useParams().quizSetId;
  const { deleteQuestion, loading, error } = CreateUpdateQuestion(quizSetId);

  const deleteQuestionHandler = async (questionId) => {
    const success = await deleteQuestion(questionId);
    if (success) {
      setQuestions((prev) =>
        prev.filter((question) => question.id !== questionId)
      );
    }
  };

  return (
    <div className="px-4">
      {/* <!-- Question One --> */}

      {questions.map((question, questionIndex) => (
        <div
          key={question.id}
          className="rounded-lg overflow-hidden shadow-sm mb-4"
        >
          <div className="bg-white p-6 !pb-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {questionIndex + 1}. {question.question}
              </h3>
            </div>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex items-center space-x-3"
                >
                  <input
                    type="radio"
                    name={`answer-${questionIndex}`}
                    className="form-radio text-buzzr-purple"
                    checked={question.correctAnswer === option}
                  />

                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 bg-primary/10 px-6 py-2">
            <button
              className="text-red-600 hover:text-red-800 font-medium"
              onClick={() => deleteQuestionHandler(question.id)}
            >
              Delete
            </button>
            <button
              className="text-primary hover:text-primary/80 font-medium"
              onClick={() => {
                if (selectedQuestion?.id === question?.id) {
                  setIsEdit(false);
                  setSelectedQuestion(null);
                } else {
                  setIsEdit(true);
                  setSelectedQuestion(question);
                }
              }}
            >
              {edit && selectedQuestion?.id === question?.id
                ? "Cancel Edit"
                : "Edit Question"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
