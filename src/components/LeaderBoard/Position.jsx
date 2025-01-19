import avater from "../../assets/avater.webp";
import useAuth from "../../hooks/useAuth";

export default function Position({
  answersData,
  onUserPosition,
  getOrdinalSuffix,
}) {
  const user = useAuth();
  const userId = user?.id;

  if (!answersData || !answersData.attempts) {
    return <div>No data available</div>;
  }

  const userScores = answersData.attempts.map((attempt) => {
    // Find correct answers that match the user's submitted answers
    const correctAnswers = attempt.correct_answers.filter((correct) =>
      attempt.submitted_answers.some(
        (submitted) =>
          submitted.question_id === correct.question_id && // Match question IDs
          submitted.answer === correct.answer // Match answers
      )
    );
    const totalMarks = correctAnswers.length * 5;

    return {
      id: attempt.user.id,
      full_name: attempt.user.full_name,
      totalMarks: totalMarks,
      originalIndex: answersData.attempts.indexOf(attempt),
    };
  });

  // Create a sorted copy of 'userScores' by total marks in descending order
  const sortedScores = [...userScores].sort((a, b) => {
    if (b.totalMarks === a.totalMarks) {
      return b.originalIndex - a.originalIndex;
    }
    return b.totalMarks - a.totalMarks;
  });

  // Start the position counter at 1
  let position = 1;

  // Map through the sorted scores to assign positions to each user
  const userScoreWithPosition = sortedScores.map((user, index) => {
    // Check if the current user's marks are less than the previous user's marks
    if (index > 0 && user.totalMarks < sortedScores[index - 1].totalMarks) {
      // If true, update the position to the current index + 1
      position = index + 1;
    }
    return { ...user, position };
  });

  // Find the current user's position and call setUserPosition
  const currentUser = userScoreWithPosition.find((u) => u.id === userId);
  if (currentUser) {
    onUserPosition(currentUser.position); // Update the user's position
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="mb-6">{answersData.quiz.title}</p>
      <ul className="space-y-4">
        {userScoreWithPosition.map((user, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${
              user.id === userId ? "bg-blue-100 border " : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <img
                src={avater}
                alt={user.full_name}
                className="object-cover w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{user.full_name}</h3>
                <p className="text-sm text-gray-500">
                  {user.position}
                  {getOrdinalSuffix(user.position)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">{user.totalMarks}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
