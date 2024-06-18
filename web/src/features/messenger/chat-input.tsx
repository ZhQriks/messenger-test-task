import React, {
  useState,
  useContext,
  FormEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { SocketContext } from "@/lib/context/socket-context";
import { Socket } from "socket.io-client";
import { useAuth } from "@/lib/hooks/useAuth";
import useChatSubscription from "@/lib/hooks/chat/useChatSubscription";

interface ChatInputProps {
  receiverId: string;
  typingStatus?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ receiverId }) => {
  const { user } = useAuth();
  const { _id: userId, email } = user;
  const socket = useContext(SocketContext) as Socket;

  const { handleTyping, sendMessage } = useChatSubscription(user, socket);

  const [message, setMessage] = useState<string>("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    handleTyping({ receiverId, userId: userId.toString() });
  };

  const submitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && user.email) {
      sendMessage({ email, message, receiverId, senderId: userId.toString() });
      setMessage("");
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <form className="relative" onSubmit={submitMessage}>
        <Input
          type="text"
          placeholder="Type your message..."
          className="bg-gray-50 border-gray-200 rounded-lg px-4 py-2 text-sm w-full resize-none"
          value={message}
          onChange={onInputChange}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
