import { useParams } from "react-router-dom";
import clsx from "clsx";

import MessengerBody from "./components/messenger-body";
import UsersSidebar from "./components/users-sidebar";

const Chat = () => {
  const { receiverId } = useParams();

  return (
    <div className="flex h-[90vh] w-full">
      <UsersSidebar
        className={receiverId ? "hidden md:block" : "w-max md:block"}
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
