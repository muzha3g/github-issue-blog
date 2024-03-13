"use client";

import { createContext } from "react";
import { Octokit } from "octokit";

type ContainerProps = {
  children: React.ReactNode;
};

type ContextType = {
  createAnIssue: (title: string, body: string) => void;
};

const typeContextState = {
  createAnIssue: (title: string, body: string) => {},
};

export const GlobalContext = createContext<ContextType>(typeContextState);

export const GlobalProvider = ({ children }: ContainerProps) => {
  const owner = process.env.NEXT_PUBLIC_OWNER as string;
  const repo = process.env.NEXT_PUBLIC_REPO as string;
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string;
  const octokit = new Octokit({
    auth: token,
  });

  const createAnIssue = async (title: string, body: string) => {
    try {
      await octokit.request("POST /repos/{owner}/{repo}/issues", {
        owner,
        repo,
        title,
        body,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
    } catch (e) {
      throw e;
    }
  };

  return (
    <GlobalContext.Provider value={{ createAnIssue }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
