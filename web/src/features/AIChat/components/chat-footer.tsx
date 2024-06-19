import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatFooterProps {
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isStreaming: boolean;
}

const ChatFooter = ({
  input,
  handleInputChange,
  handleSubmit,
  isStreaming,
}: ChatFooterProps) => (
  <CardFooter>
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full space-x-2"
    >
      <Input
        id="message"
        placeholder="Type your message..."
        className="flex-1"
        onChange={handleInputChange}
        value={input}
        autoComplete="off"
      />
      <Button type="submit" size="icon" disabled={isStreaming}>
        <Send className="w-4 h-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  </CardFooter>
);

export default ChatFooter;
