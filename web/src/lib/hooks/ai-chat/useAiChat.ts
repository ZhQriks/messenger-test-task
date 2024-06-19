import { BACKEND_URL } from "@/services/axios";
import useChatStream from "@magicul/react-chat-stream";

const useAIChat = () => {
    const { messages, input, handleInputChange, handleSubmit, isStreaming } =
      useChatStream({
        handlers: {
          onMessageAdded: (wtf) => {
            console.log("wtf", wtf);
          },
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
  