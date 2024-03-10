import { Octokit } from "octokit";
import IssueCard from "./components/IssueCard";
import { Issue } from "@/type";

export default async function Home() {
  const owner = process.env.OWNER as string;
  const repo = process.env.REPO as string;
  const token = process.env.GITHUB_TOKEN as string;

  const octokit = new Octokit({
    auth: token,
  });

  const issues: Issue[] = await octokit
    .request("GET /repos/{owner}/{repo}/issues", {
      owner,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));

  console.log(issues);

  return (
    <>
      <main className="flex flex-col justify-center items-center mt-5">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            id={issue.id}
            title={issue.title}
            body={issue.body}
            time={issue.created_at}
            comment={issue.comments}
          />
        ))}
      </main>
    </>
  );
}
