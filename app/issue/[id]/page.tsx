import IssueDetail from "@/app/components/IssueDetail";
import BackToHomeBtn from "@/app/components/BackToHomeBtn";
import DeleteIssueBtn from "@/app/components/DeleteIssueBtn";
import EditIssueBtn from "@/app/components/EditIssueBtn";
import { GetAllCommemts, getAnIssue } from "@/app/actions";
import { Metadata } from "next";
import { Issue } from "@/type";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";

type Props = {
  params: {
    id: number;
  };
};

// Dynamic Metadata
export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const userData: Promise<Issue | any> = getAnIssue(id);
  const user: Issue = await userData;

  return {
    title: user?.title,
    description: user?.body.slice(0, 100),
  };
}

// 呈現動應動態 route 的一個 issue
export default async function page({ params: { id } }: Props) {
  const issue = await getAnIssue(id);
  const comments = await GetAllCommemts(id);

  // 設定編輯跟刪除會顯示的情境，非作者看不到這兩個按鈕
  const session = await getServerSession(options);
  const email = process.env.AUTHOR_EMAIL;

  return (
    <main className="flex flex-col justify-center items-center mt-20  h-full mb-0 ">
      <IssueDetail
        key={issue?.id}
        title={issue?.title}
        body={issue?.body}
        time={issue?.created_at}
        comment={issue?.comments}
        comments={comments?.data}
      />
      <div className="flex justify-center items-center gap-3 w-full flex-col sm:flex-row sm:gap-5 sm:w-1/5 my-4 mb-8">
        {/* 只有作者能看到編輯 + 刪除按鈕 */}
        {session?.user?.email === email ? <EditIssueBtn id={id} /> : <></>}
        <BackToHomeBtn />
        {session?.user?.email === email ? <DeleteIssueBtn id={id} /> : <></>}
      </div>
    </main>
  );
}
