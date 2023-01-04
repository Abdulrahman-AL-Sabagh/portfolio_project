import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { useState } from "react";
import { User } from "../types/user";
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <AuthProvider value={[user, setUser]}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
