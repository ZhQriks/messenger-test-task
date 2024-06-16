import { useOutlet } from "react-router-dom";
import { AuthProvider } from "./auth.context";
import Layout from "@/layout/layout";

export const AuthProvidingLayout = () => {
  const outlet = useOutlet();

  return (
    <AuthProvider>
      <Layout>{outlet}</Layout>
    </AuthProvider>
  );
};
