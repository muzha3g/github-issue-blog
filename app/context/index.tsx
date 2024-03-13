"use client";

import { createContext, ReactNode, FC } from "react";
import { Octokit } from "octokit";
import { Issue } from "@/type";

type ContainerProps = {
  children: ReactNode;
};

type ContextType = {
  createAnIssue: (title: string, body: string) => Promise<void>;
  getAnIssue: (id: number) => Promise<any>;
};

const typeContextState = {
  createAnIssue: async (title: string, body: string) => {},
  getAnIssue: async (id: number) => {},
};

export const GlobalContext = createContext<ContextType>(typeContextState);

export const GlobalProvider: FC<ContainerProps> = ({ children }) => {
  const owner = process.env.NEXT_PUBLIC_OWNER as string;
  const repo = process.env.NEXT_PUBLIC_REPO as string;
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string;
  // 使用 github document 的方式打 api
  // token 要自己去 developer setting generate 一個
  const octokit = new Octokit({
    auth: token,
  });

  // 創造 issue 的 Fn
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

  // 拿到單一個 issue 的 Fn
  const getAnIssue = async (id: number) => {
    try {
      const res = await octokit.request(
        "GET /repos/{owner}/{repo}/issues/{issue_number}",
        {
          owner,
          repo,
          issue_number: id,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      return res.data;
    } catch (e) {
      console.log("getAnIssue", e);
      throw e;
    }
  };

  return (
    <GlobalContext.Provider value={{ createAnIssue, getAnIssue }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
