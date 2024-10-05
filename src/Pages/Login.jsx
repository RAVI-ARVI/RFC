import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { api, setAuthToken } from "@/utils/axios";
import { LoaderIcon } from "lucide-react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigateTo = useNavigate();

  const [password, setPassword] = useState("");
  const { mutate, isLoading } = useMutation(
    () => {
      return api
        .post("/users/login", {
          email,
          password,
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        setAuthToken(res.accessToken);
        Cookies.set("userlogin", res.accessToken);
        Cookies.set("userName", res.user.username);

        Cookies.set("accessToken", res.accessToken);
        Cookies.set("refreshToken", res.refreshToken);
        navigateTo("/home");
      },
    }
  );

  const loading = false;

  const handleLogin = (email, password) => {
    console.log(email, password);
    mutate();
  };

  const isAuthenticated = false;

  useEffect(() => {
    // if (error) {
    //   toast.error(error);
    // }
    // if (Cookies.get("userlogin")) {
    //   navigateTo("/");
    // }
  }, []);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Password</Label>
                {/* <Link
                  to="/password/forgot"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Loggin In"} />
            ) : (
              <>
                {isLoading ? (
                  <Button className="w-full cursor-not-allowed opacity-50 ">
                    Loading... <LoaderIcon />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleLogin(email, password)}
                    className="w-full "
                  >
                    Login
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src="/login.png" alt="login" />
      </div>
    </div>
  );
};

export default Login;
