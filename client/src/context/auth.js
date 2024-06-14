import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios"; // Import axios using ES module syntax

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
     // console.log("in useeffect user is", parseData.userDetails);
     // console.log("in useeffect token is", parseData.token);

      // Update auth state using the setter function with the previous state
      setAuth({
        ...auth,
        user: parseData.userDetails,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    // Set default headers when auth.token changes
    axios.defaults.headers.common["Authorization"] = auth.token;
  }, [auth.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
export default useAuth;
