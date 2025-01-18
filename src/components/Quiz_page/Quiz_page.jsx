import { useState } from "react";
import { useParams } from "react-router-dom";
import avater from "../../assets/avater.webp";
import { useFetchQuiz } from "../../features/quizQuestion/quizz";
import useUser from "../../hooks/useUser";
import Footer from "../common/Footer";
import Header from "../common/Header";
import QuizQuestions from "./Quiz_Questions";

export default function QuizPage() {
  const { quizId } = useParams(); // Get quizId from the URL
  const { quizData, loading, error } = useFetchQuiz(quizId);
  const [remainingQuestions, setRemainingQuestions] = useState();

  const user = useUser();

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

  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Header />
        <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
            <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
              <div>
                <h2 className="text-4xl font-bold mb-4">{quizData?.title}</h2>
                <p className="text-gray-600 mb-4">{quizData?.description}</p>

                <div className="flex flex-col">
                  <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                    Total number of questions : {quizData?.stats?.total_marks}
                  </div>

                  <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                    Participation : 1
                  </div>

                  <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                    Remaining : {remainingQuestions}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center">
                <img
                  src={avater}
                  alt="Mr Hasan"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <span className="text-black font-semibold">
                  {user?.full_name}
                </span>
              </div>
            </div>

            <QuizQuestions
              quiz={quizData}
              onRemainingQuestions={setRemainingQuestions}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}