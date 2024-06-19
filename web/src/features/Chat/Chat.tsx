import { useParams } from "react-router-dom";
import clsx from "clsx";

import MessengerBody from "./components/messenger-body";
import UsersSidebar from "./components/users-sidebar";

const Chat = () => {
  const { receiverId } = useParams();

  return (
    <div className="flex h-[80vh] w-full">
      <UsersSidebar
        className={
          receiverId ? "hidden md:block md:w-[450px]" : "w-full lg:w-[450px]"
        }
      />
      <div
        className={clsx(
          "flex-1 bg-white overflow-hidden flex flex-col",
          !receiverId ? "hidden md:block" : ""
        )}
      >
        <MessengerBody />
      </div>
    </div>
  );
};

export default Chat;
