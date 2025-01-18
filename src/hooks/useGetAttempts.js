import { useContext } from "react";
import { GetQuizAttemptsContext } from "../context";

export default function useGetAttempts() {
  return useContext(GetQuizAttemptsContext);
}
