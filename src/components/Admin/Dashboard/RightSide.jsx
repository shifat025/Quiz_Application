import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThreeDot from "../../../assets/icons/3dots.svg";
import DeleteIcon from "../../../assets/icons/delete.png";
import EditIcon from "../../../assets/icons/icons8-edit-128.png";
import FetchQuizList from "../../../features/Admin/QuizList/QuizList";
import { QuizSetApi } from "../../../features/Admin/Quizset/Quizset";

export default function RightSide({ statusFilter }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [quizSet, setQuizset] = useState();
  const { quizListData, loading, error } = FetchQuizList();
  const { deleteQuestionSet } = QuizSetApi();

  useEffect(() => {
    if (quizListData) {
      setQuizset(quizListData);
    }
  }, [quizListData]);

  const deleteQuestionSetHandler = async (questionSetId) => {
    try {
      const success = await deleteQuestionSet(questionSetId);
      if (success) {
        setQuizset((prev) =>
          prev.filter((questionSet) => questionSet.id !== questionSetId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Filter quizSet based on statusFilter prop
  const filteredQuizzes =
    quizSet?.filter((quiz) => quiz.status === statusFilter)?.length > 0
      ? quizSet.filter((quiz) => quiz.status === statusFilter)
      : quizSet?.filter((quiz) => quiz.status === "published");
  return (
    <>
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
        <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusFilter !== "draft" && (
          <Link to="quizset" className="group">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
              <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                Create a new quiz
              </h3>
              <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                Build from the ground up
              </p>
            </div>
          </Link>
        )}

        {filteredQuizzes?.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer w-96 max-w-full relative"
            onClick={() => navigate(`/dashboard/quizentry/${quiz.id}`,{ state: { title: quiz.title, description: quiz.description } })}
          >
            <div
              className="absolute top-2 right-2 "
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setShow(show === quiz.id ? null : quiz.id)}
              >
                <img
                  src={ThreeDot}
                  alt="3 dots of Action"
                  className="h-6 w-6"
                />
              </button>
              {show === quiz.id && (
                <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg z-10">
                  <button
                    className="action-menu-item hover:text-lwsGreen flex items-center space-x-2 px-4 py-2"
                    onClick={() =>
                      navigate(`/dashboard/quizset`, { state: { quiz } })
                    }
                  >
                    <img src={EditIcon} alt="Edit" className="h-4 w-4 " />
                    <span>Edit</span>
                  </button>
                  <button
                    className="action-menu-item hover:text-red-500 flex items-center space-x-2 px-4 py-2"
                    onClick={() => deleteQuestionSetHandler(quiz.id)}
                  >
                    <img src={DeleteIcon} alt="Delete" className="h-4 w-4 " />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
            <div className=" flex gap-3 text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                <path d="M12 12l4 -2.25l4 -2.25" />
                <path d="M12 12l0 9" />
                <path d="M12 12l-4 -2.25l-4 -2.25" />
                <path d="M20 12l-4 2v4.75" />
                <path d="M4 12l4 2l0 4.75" />
                <path d="M8 5.25l4 2.25l4 -2.25" />
              </svg>

              {quiz.status === "published" ? (
                <div className="bg-green-600 text-white text-sm font-semibold px-2.5 py-1 rounded-full inline-block mb-4 shadow-md">
                  Published
                </div>
              ) : (
                <div className="bg-gray-600 text-white text-sm font-semibold px-2.5 py-1 rounded-full inline-block mb-4 shadow-md">
                  Draft
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              {quiz.title}
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              {quiz.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
