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
  const { getAnIssue, GetAllCommemts } = useContext(GlobalContext);

  const [issue, setIssue] = useState<null | Issue>(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getIssue = async (id: number) => {
      try {
        const res = await getAnIssue(id);
        setIssue(res);
      } catch (e) {
        throw e;
      }
    };

    const getComments = async (id: number) => {
      try {
        const res = await GetAllCommemts(id);
        setComments(res.data);
      } catch (e) {
        throw e;
      }
    };
    getIssue(id);
    getComments(id);
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
        comments={comments}
      />
      <div className="flex justify-center items-center gap-3 w-full flex-col sm:flex-row sm:gap-5 sm:w-1/5 my-4 mb-8">
        <EditIssueBtn id={id} />
        <BackToHomeBtn />
        <DeleteIssueBtn id={id} />
      </div>
    </main>
  );
}
