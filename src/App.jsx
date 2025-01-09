import { Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import "./styles/output.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
    <Routes>
      <Route element={<HomePage/>} path="/" exact />
      <Route element={<LoginPage/>} path="/login" />
      <Route element={<RegisterPage/>} path="/sign_up" />
    </Routes>
    </>
  );
}

export default App;
