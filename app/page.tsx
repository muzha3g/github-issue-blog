import IssueCard from "./components/IssueCard";
import { Issue } from "@/type";
import LoadMore from "./components/Loadmore";
import { getAllIssues } from "./actions";

export default async function Home() {
  // 拿到第一頁 10 筆資料的 issues
  const issues: Issue[] = await getAllIssues(1);

  return (
    <>
      <main className="flex flex-col justify-center items-center py-5 mt-3 ">
        {issues?.map((issue) => (
          <IssueCard
            key={issue.id}
            number={issue.number}
            title={issue.title}
            body={issue.body}
            time={issue.created_at}
            comment={issue.comments}
          />
        ))}
        <LoadMore />
      </main>
    </>
  );
}
