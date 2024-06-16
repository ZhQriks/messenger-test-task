import { AuthProvidingLayout } from "./lib/auth/auth.layout";
import { useAuth } from "./lib/hooks/useAuth";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

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
      <Route path="/chat/:chatId" element={<Chat />} />
    </Route>
  )
);

export default router;
