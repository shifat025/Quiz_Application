import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Admin/Dashboard/DashBoard";
import RightSide from "../components/Admin/Dashboard/RightSide";
import LeaderBoard from "../components/LeaderBoard/LeaderBoard";
import QuizPage from "../components/Quiz_page/Quiz_page";
import Result from "../components/Result/Result";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoutes from "./PrivateRoutes";
import QuestionEntry from "../components/Admin/Add Question/QuestionEntry";
import QuizSet from "../components/Admin/New Quiz/QuizSet";
import Draft from "../components/Admin/Dashboard/Draft";



export default function Routing() {
  return (
    <Routes>
      <Route element={<PrivateRoutes role='user' />}>
        <Route element={<QuizPage />} path="/quiz_page/:quizId" />
        <Route element={<Result />} path="/quiz_page/:quizId/result" />
        <Route
          element={<LeaderBoard />}
          path="/quiz_page/:quizId/leaderboard"
        />
      </Route>

      {/* Admin-specific private route */}
      <Route element={<PrivateRoutes role="admin" />}>
        <Route element={<Dashboard />} path="/dashboard">
          <Route index element={<RightSide />} />
          <Route path="quizset" element={<QuizSet />} />
          <Route path="draft" element={<Draft />} />
          <Route path="quizentry/:quizSetId" element={<QuestionEntry/>} />
        </Route>
      </Route>

      <Route element={<HomePage />} path="/" exact />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/sign_up" />
    </Routes>
  );
}
