import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleLogout = () => {
    Cookies.remove("authToken", { secure: true, sameSite: "Strict" });
    Cookies.remove("refreshToken", { secure: true, sameSite: "Strict" });
    Cookies.remove("user", { secure: true, sameSite: "Strict" });

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center mb-12">
      <img src={Logo} className="h-7" />
      <div>
        {!auth.authToken ? (
          <Link
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={{ fontFamily: "Jaro" }}
            to="/login"
          >
            Login
          </Link>
        ) : (
          <button
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={{ fontFamily: "Jaro" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
