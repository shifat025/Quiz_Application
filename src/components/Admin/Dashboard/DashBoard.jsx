import { Outlet } from "react-router-dom";
import LeftSide from "./LeftSide";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Left side */}
      <LeftSide />

      {/* Right Side */}
      <main className="flex-grow p-10">
        <Outlet />
      </main>
    </div>
  );
}
