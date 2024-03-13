"use client";

import IssueDetail from "@/app/components/IssueDetail";
import BackToHomeBtn from "@/app/components/BackToHomeBtn";
import { useContext } from "react";
import GlobalContext from "@/app/context";

type Props = {
  params: {
    id: number;
  };
};

export default async function page({ params: { id } }: Props) {
  const { getAnIssue } = useContext(GlobalContext);
  const issue = await getAnIssue(id);

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
      <BackToHomeBtn />
    </main>
  );
}
