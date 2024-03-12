"use client";

import { createContext } from "react";
import { Octokit } from "octokit";

type ContainerProps = {
  children: React.ReactNode;
};

type ContextType = {
  a: string;
};

const typeContextState = {
  a: "",
};

export const GlobalContext = createContext<ContextType>(typeContextState);

export const GlobalProvider = ({ children }: ContainerProps) => {
  const a: string = "a";
  // 開始把重複的變數搞到這邊來
  const owner = process.env.OWNER as string;
  const repo = process.env.REPO as string;
  const token = process.env.GITHUB_TOKEN as string;

  const octokit = new Octokit({
    auth: token,
  });
  return (
    <GlobalContext.Provider value={{ a }}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
