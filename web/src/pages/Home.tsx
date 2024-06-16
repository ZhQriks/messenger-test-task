import { Button } from "@/components/ui/button";
import HeaderLanding from "@/layout/navbar";
import { useAuth } from "@/lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth()?.user;

  const handleNavigate = () => {
    if (user) {
      return navigate("/chat");
    }
    return navigate("/auth/login");
  };

  return (
    <>
      <div className="min-h-screen lg:px-16">
        <div className="cover bg-opacity-5 bg-cover bg-no-repeat object-cover pb-8 pt-20 md:pb-[100px] lg:pb-[160px]">
          <div className=" bg-clip-text text-center text-6xl font-bold max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            <span>CHAT WITH</span> <br />
            <span className="bg-gradient-to-b from-blue-300 to-purple-700  bg-clip-text font-extrabold text-transparent">
              AI and Friends
            </span>
          </div>
          <div className="mt-6 px-2 text-center text-2xl   max-md:max-w-full">
            Bro, if you have friends you can chat with them on our site, and if{" "}
            <br />
            you don't you can chat with our cool AI chat.
          </div>
          <div className="mt-5 flex justify-center space-x-2 px-2">
            <Button onClick={handleNavigate}>Login</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;