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

function ProtectedRoute({ element }) {
  const { user } = useAuth();

  return user?.user ? element : <Navigate to="/auth/login" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvidingLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/auth/:authType" element={<Auth />} />

      <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
      <Route
        path="/chat/:receiverId"
        element={<ProtectedRoute element={<Chat />} />}
      />
      <Route
        path="/ai-chat"
        element={<ProtectedRoute element={<AIChat />} />}
      />
    </Route>
  )
);

export default router;
