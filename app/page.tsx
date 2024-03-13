"use client";

import IssueCard from "./components/IssueCard";
import { Issue } from "@/type";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "./context";

export default function Home() {
  const { getAllIssues } = useContext(GlobalContext);
  const [issues, setIssuse] = useState<null | Issue>(null);

  useEffect(() => {
    const get = async () => {
      const res = await getAllIssues();
      setIssuse(res);
    };
    get();
  }, []);

  return (
    <>
      <main className="flex flex-col justify-center items-center py-5">
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
      </main>
    </>
  );
}
