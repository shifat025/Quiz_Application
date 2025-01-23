import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftSide from "./LeftSide";

export default function Dashboard() {
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
