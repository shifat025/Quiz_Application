import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import QuizCard from "../components/QuizCard";

export default function HomePage() {
  return (
    <body className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Header />
        <QuizCard />
        <Footer />
      </div>
    </body>
  );
}
