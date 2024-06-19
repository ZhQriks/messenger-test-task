import { BACKEND_URL } from "@/shared";
import useChatStream from "@magicul/react-chat-stream";

const useAIChat = () => {
    const { messages, input, handleInputChange, handleSubmit, isStreaming } =
      useChatStream({
        handlers: {
          onMessageAdded: () => {},
        },
        options: {
          url: `${BACKEND_URL}/streamChatCompletion`,
          method: "GET",
        },
        method: {
          type: "query",
          key: "input",
        },
      });
  
    return { messages, input, handleInputChange, handleSubmit, isStreaming };
  };

export default useAIChat;
  