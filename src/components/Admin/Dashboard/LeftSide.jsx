import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import whiteLogo from "../../../assets/logo-white.svg";
import useAuth from "../../../hooks/useAuth";
import avater from "../../../assets/avater.webp"

export default function LeftSide() {
  const [activeLink, setActiveLink] = useState(1);
  const navigate = useNavigate();
  const {auth} = useAuth()

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
  };

  return (
    <aside className="w-64 bg-primary p-6 flex flex-col">
      <div className="mb-10">
        <img src={whiteLogo} className="h-7" alt="Logo" />
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              onClick={() => handleLinkClick(1)}
              className={`block py-2 px-4 rounded-lg ${
                activeLink === 1
                  ? "bg-buzzr-purple bg-white text-primary"
                  : "text-gray-100 hover:bg-gray-100 hover:text-primary transition duration-300"
              }`}
            >
              Quizzes
            </Link>
          </li>
          <li>
            <Link
              to="draft"
              onClick={() => handleLinkClick(2)}
              className={`block py-2 px-4 rounded-lg ${
                activeLink === 2
                  ? "bg-buzzr-purple bg-white text-primary"
                  : "text-gray-100 hover:bg-gray-100 hover:text-primary transition duration-300"
              }`}
            >
              Draft Quizset
            </Link>
          </li>
          {/* <li>
            <Link
              onClick={() => handleLinkClick(3)}
              className={`block py-2 px-4 rounded-lg ${
                activeLink === 3
                  ? "bg-buzzr-purple bg-white text-primary"
                  : "text-gray-100 hover:bg-gray-100 hover:text-primary transition duration-300"
              }`}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleLinkClick(4)}
              className={`block py-2 px-4 rounded-lg ${
                activeLink === 4
                  ? "bg-buzzr-purple bg-white text-primary"
                  : "text-gray-100 hover:bg-gray-100 hover:text-primary transition duration-300"
              }`}
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              onClick={() => handleLinkClick(5)}
              className={`block py-2 px-4 rounded-lg ${
                activeLink === 5
                  ? "bg-buzzr-purple bg-white text-primary"
                  : "text-gray-100 hover:bg-gray-100 hover:text-primary transition duration-300"
              }`}
            >
              Manage Roles
            </Link>
          </li> */}
          <li>
            <Link
              onClick={handleLogout}
              to="/login"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto flex items-center">
        <img
          src={avater}
          alt="Mr Hasan"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <span className="text-white font-semibold">{auth?.user?.full_name}</span>
      </div>
    </aside>
  );
}
