import Avatar from "@/components/avatar";
import { CardHeader } from "@/components/ui/card";

const ChatHeader = () => (
  <CardHeader className="flex flex-row items-center justify-between h-full">
    <div className="flex items-center space-x-4">
      <Avatar name="AI" />
      <div>
        <p className="text-sm font-medium leading-none">AI Assistant</p>
        <p className="text-sm text-muted-foreground">Always Online!</p>
      </div>
    </div>
  </CardHeader>
);

export default ChatHeader;
