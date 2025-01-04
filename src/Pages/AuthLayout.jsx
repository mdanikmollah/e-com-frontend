import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);
  return (
    <>
      <Outlet />
    </>
  );
};
export default AuthLayout;
