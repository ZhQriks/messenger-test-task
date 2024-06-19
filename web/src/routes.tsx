import { AuthProvidingLayout } from "./lib/auth/auth.layout";
import { useAuth } from "./lib/hooks/useAuth";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Chat from "./features/Chat/Chat";
import Auth from "./features/Auth/Auth";
import Home from "./features/Home/Home";
import AIChat from "./features/AIChat/AiChat";

const DefaultRoute = () => {
  const user = useAuth()?.user;

  if (user) {
    return <Navigate to="/roadmap" replace />;
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvidingLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/auth/:authType" element={<Auth />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:receiverId" element={<Chat />} />
      <Route path="/ai-chat" element={<AIChat />} />
    </Route>
  )
);

export default router;
