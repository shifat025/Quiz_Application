import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftSide from "./LeftSide";

export default function Dashboard() {
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
    <div className="bg-gray-100 min-h-screen flex">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Left side */}
      <LeftSide />

      {/* Right Side */}
      <main className="flex-grow p-10">
        <Outlet />
      </main>
    </div>
  );
}
