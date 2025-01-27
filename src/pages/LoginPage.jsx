import { Link, useLocation, useNavigate } from "react-router-dom";
import SalyOne from "../assets/Saly-1.png"
import Logo from "../assets/logo.svg"
import LoginForm from "../components/auth/LoginForm";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

export default function LoginPage() {
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
    <div className="bg-white text-gray-800 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex min-h-screen">
        {/* Left side  */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
          <div className="text-white">
            <img
              src={SalyOne}
              alt="Illustration"
              className="mx-auto"
            />

            <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
            <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
            <p className="mb-8">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you're preparing for exams, improving your knowledge, or
              simply having fun, there's no better way to sharpen your mind.
            </p>
          </div>
        </div>

        {/* Right side  */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={Logo} className="h-7" />
            </h2>
            <h1 className="text-5xl font-bold mb-8">Sign in</h1>

            <LoginForm/>

            <div className="text-center">
              <a href="#" className="text-primary">
                Forgot Password
              </a>
            </div>

            <div className="mt-8">
              <p className="text-center">
                No Account ?{" "}
                <Link to="/sign_up" className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
