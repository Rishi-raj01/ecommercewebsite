import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
       // console.log("admin route is working ")
        const res = await axios.get("/user/adminauth"); //try user/adminauth
        console.log(res.status); // Log the status for debugging
        if (res.status === 200) { // Check if the status is 200 (OK)
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setOk(false); // Set ok to false if there's an error
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}