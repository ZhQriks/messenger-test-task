import clsx from "clsx";
import Avatar from "./avatar";

const UserPill = ({
  id,
  name,
  lastMessage,
  time,
  isOnline,
}: {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
}) => {
  return (
    <a
      href={`/chat/${id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50  transition-colors"
    >
      <Avatar src="/placeholder-user.jpg" fallback="JD" />
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{lastMessage}</div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-xs text-gray-500">{time}</div>
        <div
          className={clsx(
            "w-2 h-2  rounded-full mt-1",
            isOnline ? "bg-green-500" : "bg-gray-500"
          )}
        />
      </div>
    </a>
  );
};

export default UserPill;
