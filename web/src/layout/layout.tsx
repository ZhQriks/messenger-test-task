import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      {children}
    </>
  );
}
