import { useState } from "react";
import { useParams } from "react-router-dom";
import avater from "../../assets/avater.webp";
import { useFetchQuiz } from "../../features/quizQuestion/quizz";
import useAuth from "../../hooks/useAuth";
import Footer from "../common/Footer";
import Header from "../common/Header";
import QuizQuestions from "./Quiz_Questions";

export default function QuizPage() {
  const { quizId } = useParams(); // Get quizId from the URL
  const { quizData, loading, error } = useFetchQuiz(quizId);
  const [remainingQuestions, setRemainingQuestions] = useState();


  const user = useAuth();

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
                    Total number of questions : {quizData?.questions?.length}
                  </div>

                  <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                    Participation : {quizData?.total_attempts}
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
              onRemainingQuestions={(count) => setRemainingQuestions(count)}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
