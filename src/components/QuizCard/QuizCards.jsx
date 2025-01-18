import useAuth from "../../hooks/useAuth";
import "../../styles/output.css";
import QuizBody from "./QuizBody";
import Welcome from "./Welcome";

export default function QuizCards() {
  const { auth } = useAuth();

  return (
    <>
      {auth?.authToken && <Welcome />}

      <main className="bg-white p-6 rounded-md h-full">
        <section>
          <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuizBody />
          </div>
        </section>
      </main>
    </>
  );
}
