import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import QuizCard from "../components/QuizCard/QuizCard";

export default function HomePage() {
  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Header />
        <QuizCard />
        <Footer />
      </div>
    </div>
  );
}
