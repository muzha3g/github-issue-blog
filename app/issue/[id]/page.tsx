"use client";

import IssueDetail from "@/app/components/IssueDetail";
import BackToHomeBtn from "@/app/components/BackToHomeBtn";
import DeleteIssueBtn from "@/app/components/DeleteIssueBtn";
import EditIssueBtn from "@/app/components/EditIssueBtn";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "@/app/context";
import { Issue } from "@/type";

type Props = {
  params: {
    id: number;
  };
};

export default function page({ params: { id } }: Props) {
  const { getAnIssue } = useContext(GlobalContext);
  // const issue = await getAnIssue(id);
  const [issue, setIssue] = useState<null | Issue>(null);
  useEffect(() => {
    const get = async (id: number) => {
      try {
        const res = await getAnIssue(id);
        setIssue(res);
      } catch (e) {
        throw e;
      }
    };
    get(id);
  }, [id]);

  return (
    <main className="flex flex-col justify-center items-center mt-20 mb-5">
      <IssueDetail
        key={issue?.id}
        number={issue?.number}
        title={issue?.title}
        body={issue?.body}
        time={issue?.created_at}
        comment={issue?.comments}
      />
      <div className="flex justify-center items-center gap-3 w-full flex-col sm:flex-row sm:gap-5 sm:w-1/5 my-4 mb-8">
        <EditIssueBtn id={id} />
        <BackToHomeBtn />
        <DeleteIssueBtn id={id} />
      </div>
    </main>
  );
}
