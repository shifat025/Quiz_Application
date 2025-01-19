import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import whiteLogo from "../../assets/logo-white.svg";
import FetchQuizResult from "../../features/Result/result";
import useGetAttempts from "../../hooks/useGetAttempts";
import QuizAnswer from "./QuizAnswer";

export default function Result() {
  const { totalQuestion, correctAnswer } = useGetAttempts();
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quizData, loading, error } = FetchQuizResult(quizId);


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
        <p>Error: {error}</p>
      </div>
    );
  }

  const percentage = Math.round((correctAnswer / totalQuestion) * 100);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <img src={whiteLogo} className="max-h-11 fixed left-6 top-6 z-50" />
        {/* <!-- Left side --> */}
        <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
          <div>
            <div className="text-white">
              <div>
                <h2 className="text-4xl font-bold mb-2">{quizData?.title}</h2>
                <p>{quizData?.description}</p>
              </div>

              <div className="my-6 flex items-center  ">
                <div className="w-1/2">
                  <div className="flex gap-6 my-6">
                    <div>
                      <p className="font-semibold text-2xl my-0">
                        {totalQuestion}
                      </p>
                      <p className="text-gray-300">Questions</p>
                    </div>

                    <div>
                      <p className="font-semibold text-2xl my-0">
                        {correctAnswer}
                      </p>
                      <p className="text-gray-300">Correct</p>
                    </div>

                    <div>
                      <p className="font-semibold text-2xl my-0">
                        {totalQuestion - correctAnswer}{" "}
                      </p>
                      <p className="text-gray-300">Wrong</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/quiz_page/${quizId}/leaderboard`)}
                    className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                  >
                    View Leaderboard
                  </button>
                </div>

                <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                  <div className="flex-1">
                    <p className="text-2xl font-bold">
                      {correctAnswer * 5}/{totalQuestion * 5}
                    </p>
                    <p>Your Mark</p>
                  </div>
                  <div className="w-24 h-24">
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        strokeLinecap: "round",
                        textSize: "22px",
                        textColor: "#fff",
                        pathColor: `rgb(79,170,192)`,
                        trailColor: "#ddd",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Right side --> */}
        <QuizAnswer quizData={quizData} />
      </div>
    </div>
  );
}
