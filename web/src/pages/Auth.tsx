import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserLoginForm from "@/features/auth/user-login-form";
import UserRegistrationForm from "@/features/auth/user-registration-form";

const Auth = () => {
  const { authType } = useParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(authType === "login");

  useEffect(() => {
    setIsLogin(authType === "login");
  }, [authType]);

  const toggleForm = () => {
    const newAuthType = isLogin ? "register" : "login";
    navigate(`/auth/${newAuthType}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side with Image and Overlay Text */}
      <div className="relative w-full h-screen lg:w-1/2 hidden lg:block">
        <img
          src="https://i.imgur.com/0UBMg4J.png"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col p-10">
          <div className="flex items-center text-2xl font-bold space-x-2">
            <span className="flex justify-between text-white">Test Task</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center p-10">
        <div className="flex flex-col justify-center mx-auto w-full max-w-md">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 justify-self-center">
              {isLogin ? "Login" : "Registration"}
            </h1>
            <p className="mb-2 justify-self-center">
              {isLogin
                ? "Enter your data to login"
                : "Enter your data to registration"}
            </p>
          </div>
          {isLogin ? <UserLoginForm /> : <UserRegistrationForm />}
          <p className="mt-4 text-xs self-center">
            {isLogin ? (
              <span className="text-lg">
                Still without account?{" "}
                <a
                  href="#"
                  onClick={toggleForm}
                  className="underline cursor-pointer"
                >
                  Register!
                </a>
              </span>
            ) : (
              <span className="text-lg self-center">
                Already registered?{" "}
                <a
                  href="#"
                  onClick={toggleForm}
                  className="underline cursor-pointer"
                >
                  Login!
                </a>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
