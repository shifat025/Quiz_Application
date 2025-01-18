import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import GetQuizAttemptsProvider from "../providers/GetAttemptsProvider";
import Cookies from 'js-cookie';

export default function PrivateRoutes({role}) {
  const { auth } = useAuth();
  const user = auth?.user;

  if (!auth.authToken) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if( user && user?.role !== role){
    // Remove cookies if user role doesn't match
    Cookies.remove('authToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');
    return <Navigate to="/login" />;
  }

  return (
    <>
      <GetQuizAttemptsProvider>
      <Outlet />
    </GetQuizAttemptsProvider>
    </>
  );
}
