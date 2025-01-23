import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchQuizList from "../../../features/Admin/QuizList/QuizList";
import QuizEntry from "./Left";
import QuestionList from "./Right";

export default function QuestionEntry() {
  const { quizListData, loading, error } = FetchQuizList();
  const [questions, setQuestions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const quizSetId = useParams().quizSetId;


  useEffect(() => {
    if (quizListData) {
      const matchedQuizset = quizListData?.find(
        (quizset) => quizset?.id === quizSetId
      );
      const questions = matchedQuizset?.Questions || [];
      setQuestions(questions);
    }
  }, [quizListData, quizSetId]);


  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-gray-600 hover:text-buzzr-purple">
                Home
              </a>
              <svg
                className="fill-current w-3 h-3 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-buzzr-purple"
                aria-current="page"
              >
                Quizzes
              </a>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
          {/* <!-- Left Column --> */}
          <QuizEntry
            setQuestions={setQuestions}
            setIsEdit={setIsEdit}
            edit={isEdit}
            selectedQuestion={selectedQuestion}
            questions={questions}
          />

          {/* <!-- Right Column --> */}
          <QuestionList
            questions={questions}
            setQuestions={setQuestions}
            setIsEdit={setIsEdit}
            edit={isEdit}
            setSelectedQuestion={setSelectedQuestion}
            selectedQuestion={selectedQuestion}
            loading={loading}
          />
        </div>
      </div>
    </main>
  );
}
