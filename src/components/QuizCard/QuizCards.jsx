import { useFetchQuizzes } from "../../features/homeQuiz/quizzes";
import useAuth from "../../hooks/useAuth";
import "../../styles/output.css";
import QuizBody from "./QuizBody";
import Welcome from "./Welcome";

export default function QuizCards() {
  const { auth } = useAuth();
  const { quizzes, loading, error } = useFetchQuizzes();
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

  return (
    <>
      {auth?.authToken && <Welcome />}

      <main className="bg-white p-6 rounded-md h-full">
        <section>
          <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuizBody quizzes={quizzes} error={error} />
          </div>
        </section>
      </main>
    </>
  );
}
