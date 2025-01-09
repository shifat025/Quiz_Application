import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg"

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-12">
      <img src={Logo} className="h-7" />
      <div>
        <Link
          className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          style={{ fontFamily: "Jaro" }}
          to="/login"
        >
          Login
        </Link>

        <button
          className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          style={{ fontFamily: "Jaro" }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
