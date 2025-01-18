import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserFromCookies = () => {
      const userCookie = Cookies.get("user");
      return userCookie ? JSON.parse(userCookie) : null;
    };

    setUser(getUserFromCookies());
  }, []);

  return user;
};

export default useUser;
