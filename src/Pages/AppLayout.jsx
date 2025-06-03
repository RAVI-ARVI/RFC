import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const hasUserLoginCookie = !!Cookies.get("userlogin");

    if (!hasUserLoginCookie && location.pathname !== "/login") {
      navigate("/login");
    } else if (hasUserLoginCookie && location.pathname === "/login") {
      // If user is logged in and somehow on the login page, redirect to home
      navigate("/home");
    } else if (hasUserLoginCookie && location.pathname === "/") {
      // If user is logged in and at the root, redirect to home
      navigate("/home");
    }
    // If the user is logged in and on any other page (e.g., /home, /home/user/123),
    // no explicit navigation is needed here by AppLayout, as the Outlet will render the correct page.
    // The initial redirect from "/" or "/login" to "/home" for logged-in users is handled.
  }, [navigate, location.pathname]); // Add location.pathname to dependency array

  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;
