import { useState } from "react";
import { useParams } from "react-router-dom";
import avater from "../../assets/avater.webp";
import FetchGetAttempts from "../../features/attempts/getAttempt";
import { useAxios } from "../../hooks/useAxios";
import useGetAttempts from "../../hooks/useGetAttempts";
import useUser from "../../hooks/useUser";
import Header from "../common/Header";
import Position from "./Position";

export default function LeaderBoard() {
  const { getAttempts: answersData } = useGetAttempts();

  const [userPosition, setUserPosition] = useState(0);
  const { quizId } = useParams();
  const { loading, error } = FetchGetAttempts(quizId);
  const user = useUser();

  const userAttemt = answersData?.attempts?.find(
    (attempt) => attempt.user.id === user?.id
  );

  const submittedData = userAttemt?.submitted_answers || [];
  const correctAnswers = userAttemt?.correct_answers || [];

  const correctAnswer = submittedData.filter((answer) =>
    correctAnswers.some(
      (correct) =>
        correct.question_id === answer.question_id &&
        correct.answer === answer.answer
    )
  );

  // Function to get the correct ordinal suffix (e.g., "st", "nd", "rd", "th") for a number
  const getOrdinalSuffix = (position) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = position % 100; // Get the last two digits
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]; // Return the right suffix
  };

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
    <div className="bg-[#F5F3FF]  p-4">
      <div className="container mx-auto py-3">
        <Header />
      </div>

      <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <!-- Left Column --> */}
            <div className="bg-primary rounded-lg p-6 text-white">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={avater}
                  alt="Profile Pic"
                  className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold">Saad Hasan</h2>
                <p className="text-xl">
                  {userPosition}
                  {getOrdinalSuffix(userPosition)} Position
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm opacity-75">Mark</p>
                  <p className="text-2xl font-bold">
                    {answersData?.quiz?.total_questions * 5}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Correct</p>
                  <p className="text-2xl font-bold">{correctAnswer.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Wrong</p>
                  <p className="text-2xl font-bold">
                    {answersData?.quiz?.total_questions - correctAnswer.length}
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Right Column --> */}
            <Position
              answersData={answersData}
              onUserPosition={setUserPosition}
              getOrdinalSuffix={getOrdinalSuffix}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
