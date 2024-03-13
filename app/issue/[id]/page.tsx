import IssueDetail from "@/app/components/IssueDetail";
import { Octokit } from "octokit";

type Props = {
  params: {
    id: number;
  };
};

export default async function page({ params: { id } }: Props) {
  const owner = process.env.NEXT_PUBLIC_OWNER as string;
  const repo = process.env.NEXT_PUBLIC_REPO as string;
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string;

  const octokit = new Octokit({
    auth: token,
  });

  // 晚點設定 type，剛剛把得到的物件丟給 convert 他一值說我有錯誤不給轉
  const issue = await octokit
    .request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
      owner,
      repo,
      issue_number: id,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));

  console.log(issue);
  return (
    <main className="flex flex-col justify-center items-center mt-20">
      <IssueDetail
        key={issue.id}
        number={issue.number}
        title={issue.title}
        body={issue.body}
        time={issue.created_at}
        comment={issue.comments}
      />
    </main>
  );
}
