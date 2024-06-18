import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import Avatar from "@/components/avatar";
import UserPill from "@/components/user-pill";
import Message from "@/components/message";
import useUsers from "@/lib/hooks/users/useUsers";
import { Spinner } from "@/components/ui/spinner";
import MessengerBody from "./messenger-body";

const MessengerLayout = () => {
  const { data } = useUsers();

  return (
    <div className="flex h-[90vh] w-full">
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <div className="relative">
            <Input placeholder="Search contacts..." />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-200 ">
            {!data?.data && <Spinner className="mt-10" size="large" />}
            {data?.data &&
              data.data.map((user) => (
                <UserPill
                  key={user._id}
                  id={user._id}
                  name={user.email}
                  lastMessage="Hey, how's it going?"
                  time="2h ago"
                  isOnline={true}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white overflow-hidden flex flex-col">
        <MessengerBody />
      </div>
    </div>
  );
};

export default MessengerLayout;
