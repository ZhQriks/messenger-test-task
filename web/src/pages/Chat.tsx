import { Button } from "@/components/ui/button";
import HeaderLanding from "@/layout/navbar";
import { useAuth } from "@/lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  return (
    <>
      <div className="min-h-screen lg:px-16">
        <div className="cover bg-opacity-5 bg-cover bg-no-repeat object-cover pb-8 pt-20 md:pb-[100px] lg:pb-[160px]">
          <div className=" bg-clip-text text-center text-6xl font-bold max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            <div>YO THATS A CHAT APP</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
