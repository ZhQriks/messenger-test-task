import AIChatPlaceHolder from "@/components/ai-chat-placeholder";
import Message from "@/components/message";
import { CardContent } from "@/components/ui/card";
import { UseChatStreamChatMessage } from "@magicul/react-chat-stream";
import { useEffect } from "react";

const MessageList = ({
  messages,
}: {
  messages: UseChatStreamChatMessage[];
}) => {
  useEffect(() => {
    const lastMessage = document.querySelector("#message-list div:last-child");
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <div className="flex-1 overflow-auto p-2">
      <CardContent className="space-y-4 py-6 h-[500px]" id="message-list">
        {messages.length < 1 && <AIChatPlaceHolder />}
        {messages.map((msg, index) => (
          <Message
            key={index}
            message={msg.content}
            isSentByCurrentUser={msg.role === "user"}
          />
        ))}
      </CardContent>
    </div>
  );
};

export default MessageList;
