import { useOutlet } from "react-router-dom";
import { AuthProvider } from "./auth.context";
import Layout from "@/layout/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "../context/socket-context";

export const AuthProvidingLayout = () => {
  const outlet = useOutlet();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <Layout>{outlet}</Layout>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
