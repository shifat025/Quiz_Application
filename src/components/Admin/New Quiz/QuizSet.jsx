import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizSetApi } from "../../../features/Admin/Quizset/Quizset";
import { useAxios } from "../../../hooks/useAxios";

export default function QuizSet() {
  const location = useLocation();
  const quiz = location.state?.quiz;
  const navigate = useNavigate();
  const { api } = useAxios();
  const { createQuizSet, updateQuizSet,deleteQuestionSet, error, loading } = QuizSetApi();
  const [quizSetData, setQuizSetData] = useState({
    status: "",
    title: "",
    description: "",
  });
  // console.log("this is form api and component", error);

  useEffect(() => {
    if (quiz) {
      setQuizSetData({
        title: quiz.title,
        description: quiz.description,
        status: quiz.status,
      });
    }
  }, [quiz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizSetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (quiz) {
        // Update existing quiz
        const updatedQuiz = await updateQuizSet(quiz.id, quizSetData);
        if (updatedQuiz) {
          navigate(-1); // Navigate back after successful update
        } else {
          // throw new Error("Failed to update the quizset");
          console.log("this is adfasdf", error);
        }
      } else {
        // Create new quiz
        const { title, description } = quizSetData; // Exclude 'status'
        const createdQuiz = await createQuizSet({
          title,
          description,
        });
        if (createdQuiz) {
          navigate(`/dashboard/quizentry/${createdQuiz.id}`); // Navigate to new quiz entry page
        } else {
          throw new Error("Failed to create the quizset");
        }
      }
    } catch (err) {
      console.log("this is component error", err);
      // console.log("This is update error", err.response.data.message);
 
    }
  };

  

  return (
    <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to home
          </button>

          <h2 className="text-3xl font-bold mb-6">
            Give your quiz title and description
          </h2>

          <form onSubmit={handleSubmit} disabled={loading}>
            {quiz && (
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quiz Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={quizSetData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quiz title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={quizSetData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                placeholder="Quiz"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={quizSetData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                placeholder="Description"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {quiz ? "Update" : "Next"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
