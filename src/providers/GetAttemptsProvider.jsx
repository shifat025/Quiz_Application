import { useState } from "react";
import { GetQuizAttemptsContext } from "../context";

export default function GetQuizAttemptsProvider({ children }) {
  const [getAttempts, setGetAttempts] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  // console.log("this is attemp provider", getAttempts);
  return (
    <GetQuizAttemptsContext.Provider
      value={{
        getAttempts,
        setGetAttempts,
        totalQuestion,
        setTotalQuestion,
        correctAnswer,
        setCorrectAnswer,
      }}
    >
      {children}
    </GetQuizAttemptsContext.Provider>
  );
}
