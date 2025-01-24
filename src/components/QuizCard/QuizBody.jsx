import { useNavigate } from "react-router-dom";
import { useFetchQuizzes } from "../../features/homeQuiz/quizzes";
import useAuth from "../../hooks/useAuth";

export default function QuizBody() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { quizzes, loading, error } = useFetchQuizzes();


  const handleQuizClick = (quizId, isAttempted) => {
    if (auth?.authToken) {
      if (isAttempted) {
        navigate(`/quiz_page/${quizId}/result`); // Navigate to leaderboard if already attempted
      } else {
        navigate(`/quiz_page/${quizId}`); // Navigate to QuizPage if not attempted
      }

    } else {
      navigate("/login"); // Navigate to Login page if not logged in
    }
  };

  if (loading) return <div>Loading quizzes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {quizzes.map((quiz) => (
        <a
          className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
          key={quiz.id}
          onClick={() => handleQuizClick(quiz.id,quiz.is_attempted)}
        >
          <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
            <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
              {quiz.title}
            </h1>
            <p className="mt-2 text-lg">{quiz.description}</p>
          </div>
          {quiz?.is_attempted && (
            <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
              <div>
                <h1 className="text-3xl font-bold">Already Participated</h1>
                <p className="text-center">Click to view your leaderboard</p>
              </div>
            </div>
          )}
          <img
            src={`https://quiz-application-vzaz.onrender.com/${quiz.thumbnail}`}
            alt="JavaScript Hoisting"
            className="w-full h-full object-cover rounded mb-4 transition-all "
          />
        </a>
      ))}
    </>
  );
}
