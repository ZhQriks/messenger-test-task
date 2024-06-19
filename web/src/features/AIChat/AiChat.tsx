import Avatar from "@/components/avatar";
import useChatStream from "@magicul/react-chat-stream";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import MessageList from "./components/message-list";
import useAIChat from "@/lib/hooks/ai-chat/useAiChat";
import ChatFooter from "./components/chat-footer";
import ChatHeader from "./components/chat-header";

const AIChat = () => {
  const { messages, input, handleInputChange, handleSubmit, isStreaming } =
    useAIChat();

  return (
    <div className="md:p-5 lg:p-10">
      <Card className="w-full mx-auto">
        <ChatHeader />
        <MessageList messages={messages} />
        <ChatFooter
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isStreaming={isStreaming}
        />
      </Card>
    </div>
  );
};

export default AIChat;
