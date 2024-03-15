"use client";

import { createContext, ReactNode, FC } from "react";
import { Octokit } from "octokit";

type ContainerProps = {
  children: ReactNode;
};

type ContextType = {
  createAnIssue: (title: string, body: string) => Promise<void>;
  getAnIssue: (id: number) => Promise<any>;
  DeleteAnIssue: (id: number) => Promise<void>;
  getAllIssues: (page: number) => Promise<any>;
  EditAnIssue: (id: number, title: string, body: string) => Promise<void>;
  GetAllCommemts: (id: number) => Promise<any>;
};

const typeContextState = {
  createAnIssue: async (title: string, body: string) => {},
  getAnIssue: async (id: number) => {},
  DeleteAnIssue: async (id: number) => {},
  getAllIssues: async (page: number) => {},
  EditAnIssue: async (id: number, title: string, body: string) => {},
  GetAllCommemts: async (id: number) => {},
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

  // Create an Issue
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

  // Get an Issue
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

  // Delete an Issue，state 改成 close
  const DeleteAnIssue = async (id: number) => {
    await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
      owner,
      repo,
      issue_number: id,
      state: "closed",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  };

  // Get All Issue
  // 設定每次拿 10 筆 issues
  const getAllIssues = async (page: number) => {
    return await octokit
      .request("GET /repos/{owner}/{repo}/issues", {
        owner,
        repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        per_page: 10,
        page,
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));
  };

  // Edit an Issue
  const EditAnIssue = async (id: number, title: string, body: string) => {
    try {
      await octokit.request(
        "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
        {
          owner,
          repo,
          issue_number: id,
          title,
          body,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
    } catch (e) {
      console.log("EditAnIssue", e);
    }
  };

  // Get all commemts of an issue
  const GetAllCommemts = async (id: number) => {
    try {
      return await octokit.request(
        "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
        {
          owner,
          repo,
          issue_number: id,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
    } catch (e) {
      console.log("GetAllIssues", e);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        createAnIssue,
        getAnIssue,
        DeleteAnIssue,
        getAllIssues,
        EditAnIssue,
        GetAllCommemts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
