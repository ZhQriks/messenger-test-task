import { MessageSquarePlus } from "lucide-react";

const ChatPlaceHolder = () => {
  return (
    <div className="border-b border-t border-gray-200 flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-4">
        <MessageSquarePlus className="w-16 h-16 text-muted-foreground" />
        <h3 className="text-xl font-semibold">No chat selected</h3>
        <p className="text-muted-foreground">
          Select a chat from the sidebar to start messaging.
        </p>
      </div>
    </div>
  );
};

export default ChatPlaceHolder;
