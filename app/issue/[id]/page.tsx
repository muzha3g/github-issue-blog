import IssueDetail from "@/app/components/IssueDetail";
import BackToHomeBtn from "@/app/components/BackToHomeBtn";
import DeleteIssueBtn from "@/app/components/DeleteIssueBtn";
import EditIssueBtn from "@/app/components/EditIssueBtn";
import { GetAllCommemts, getAnIssue } from "@/app/actions";

type Props = {
  params: {
    id: number;
  };
};

export default async function page({ params: { id } }: Props) {
  const issue = await getAnIssue(id);
  const comments = await GetAllCommemts(id);

  return (
    <main className="flex flex-col justify-center items-center mt-20 mb-5">
      <IssueDetail
        key={issue?.id}
        title={issue?.title}
        body={issue?.body}
        time={issue?.created_at}
        comment={issue?.comments}
        comments={comments?.data}
      />
      <div className="flex justify-center items-center gap-3 w-full flex-col sm:flex-row sm:gap-5 sm:w-1/5 my-4 mb-8">
        <EditIssueBtn id={id} />
        <BackToHomeBtn />
        <DeleteIssueBtn id={id} />
      </div>
    </main>
  );
}
