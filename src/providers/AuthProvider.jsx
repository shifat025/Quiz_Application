import { useState } from "react";
import { AuthContext } from "../context";
import Cookies from 'js-cookie';

const  getUserFromCookies = () => {
  // Retrieve and parse the user data from cookies
  const userCookie = Cookies.get("user");
  
  if (userCookie) {
    return JSON.parse(userCookie);
  }
  
  return null; // Return null if no user data is found
};


const AuthProvider = ({ children }) => {
  
  const [auth, setAuth] = useState(Cookies.get('authToken'));
  console.log("this is", auth);
  // Usage example
  const user = getUserFromCookies();
  console.log(user);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export {getUserFromCookies}
