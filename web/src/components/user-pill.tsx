import clsx from "clsx";
import Avatar from "./avatar";
import { useNavigate } from "react-router-dom";

const UserPill = ({
  id,
  name,
  lastMessage,
  time,
}: {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
}) => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => navigate(`/chat/${id}`)}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50  transition-colors cursor-pointer"
    >
      <Avatar
        name={name.slice(0, 2).toUpperCase()}
      />
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{lastMessage}</div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-xs text-gray-500">{time}</div>
      </div>
    </a>
  );
};

export default UserPill;
