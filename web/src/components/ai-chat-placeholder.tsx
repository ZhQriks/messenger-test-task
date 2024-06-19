import { MessageCircle, MessageSquarePlus } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const AIChatPlaceHolder = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <MessageCircle className="h-8 w-8" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Chat with me!</h2>
          <p className="text-muted-foreground">
            Don't have any friends to talk to? No problem! I'm always here to lend an ear and chat about anything on
            your mind.
          </p>
        </div>
      </CardContent>
    </Card>
  )
};

export default AIChatPlaceHolder;
