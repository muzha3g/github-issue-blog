// 打 api 相關的 function 都放這邊

import { Octokit } from "octokit";
import { unstable_noStore as noStore } from "next/cache";

// 打 github api 的共用資訊
const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER as string;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPO as string;
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string;

// 使用 github document 的方式打 api，token 要自己去 developer setting generate 一個
const octokit = new Octokit({
  auth: token,
});

// get all issues
export async function getAllIssues(page: number): Promise<any> {
  noStore(); // 不要存進快取，避免發文後跳轉回首頁，還要手動重整網頁才看的到新 issue
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
}

// get an issue
export async function getAnIssue(id: number) {
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
}

// create an issue
export async function createAnIssue(title: string, body: string) {
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
    console.log("createAnIssue", e);
    throw e;
  }
}

// update an issue
export async function EditAnIssue(id: number, title: string, body: string) {
  try {
    await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
      owner,
      repo,
      issue_number: id,
      title,
      body,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (e) {
    console.log("EditAnIssue", e);
    throw e;
  }
}
// delete an issue
export async function DeleteAnIssue(id: number) {
  try {
    await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
      owner,
      repo,
      issue_number: id,
      state: "closed",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (e) {
    console.log("DeleteAnIssue", e);
    throw e;
  }
}

// get all commemts
export async function GetAllCommemts(id: number) {
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
    throw e;
  }
}
