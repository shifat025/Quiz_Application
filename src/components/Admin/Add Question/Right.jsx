import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUpdateQuestion } from "../../../features/Admin/NewQuestionList/CreateUpdateQuestion";

export default function QuestionList({
  questions,
  setQuestions,
  edit,
  setIsEdit,
  setSelectedQuestion,
  selectedQuestion,
  loading,
}) {
  const quizSetId = useParams().quizSetId;
  const { deleteQuestion, error } = CreateUpdateQuestion(quizSetId);

  const deleteQuestionHandler = async (questionId) => {
    const success = await deleteQuestion(questionId);
    if (success) {
      setQuestions((prev) =>
        prev.filter((question) => question.id !== questionId)
      );
      toast.success("Question deleted successfully!");
    } else {
      toast.error("Failed to delete the question.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center  bg-background text-foreground">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

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
                    checked={question.correct_answer === option}
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
