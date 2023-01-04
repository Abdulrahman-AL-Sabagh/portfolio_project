import { createContext, Dispatch, SetStateAction, useState } from "react";
import { User } from "../types/user";
const AuthContext = createContext<
  [User | undefined, Dispatch<SetStateAction<User | undefined>>]
>([undefined, () => {}]);
export const AuthProvider = AuthContext.Provider;

export default AuthContext;
