import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth"; 
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
     // console.log("authcheck is running")
      const res = await axios.get("/user/userauth");
    // const res = await axios.get("/user/protectroute");

     // console.log("got a response",res)
      if (res.status === 200) {
        setOk(true);
         // Save the token in localStorage
         localStorage.setItem("token", auth.token);
       
      } else {
        setOk(false);
      }
    };
   
    if (auth?.token) authCheck();
  }, [auth?.token]);
//console.log("value of token from private route is ",auth.token)
  return ok ? <Outlet /> : <Spinner />;
}
