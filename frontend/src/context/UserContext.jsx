import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContex";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/user/getcurrentuser",
        {},
        { withCredentials: true }
      );
      setUserData(result.data);
      console.log(result.data);
    } catch (e) {
      setUserData(null);
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = { userData, setUserData, getCurrentUser };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
