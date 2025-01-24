import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import QuizCards from "../components/QuizCard/QuizCards";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a toast message in the state
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);

      // Clear the state after showing the toast to prevent multiple triggers
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);


  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto py-3">
        <Header />
        <QuizCards />
        <Footer />
      </div>
    </div>
  );
}
