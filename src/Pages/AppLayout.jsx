import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("userlogin")) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;
