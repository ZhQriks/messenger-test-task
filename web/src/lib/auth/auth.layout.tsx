import { useOutlet } from "react-router-dom";
import { AuthProvider } from "./auth.context";
import Layout from "@/layout/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AuthProvidingLayout = () => {
  const outlet = useOutlet();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>{outlet}</Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
};
