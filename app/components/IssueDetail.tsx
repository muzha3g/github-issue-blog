import Markdown from "react-markdown";
import CommentCard from "./CommentCard";
import { Comment } from "@/type";
import remarkGfm from "remark-gfm";

type Props = {
  title: string;
  body: string;
  time: string;
  comment: number;
  comments?: Comment[] | undefined | null | any[];
};

export default function IssueDetail({
  title,
  body,
  time,
  comment,
  comments,
}: Props) {
  const timeSlice = time?.slice(0, 10);
  return (
    <>
      <div className="card w-1/2 h-auto bg-base-100 shadow-xl m-4 pb-6 ">
        <div className="card-body pb-2">
          <h2 className="card-title h-auto overflow-clip text-2xl font-bold ">
            {title}
          </h2>
          <div className="h-auto overflow-clip ">
            {/* 加上 remarkPlugins={[remarkGfm]} 讓 strikethrough, tables, tasklists and URLs 可以顯示出來 */}
            {/* className 加上 prose 是為了能正確顯示出大小標 */}
            <Markdown remarkPlugins={[remarkGfm]} className="prose">
              {body}
            </Markdown>
          </div>
          <div className="flex justify-between items-center text-slate-600 mt-1 flex-col sm:flex-row">
            <p className="text-sm">
              <span>💬&nbsp;</span>
              {comment}
            </p>
            <p className="flex justify-end text-sm ">{timeSlice}</p>
          </div>
        </div>
        {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            image={comment?.user.avatar_url}
            name={comment.user.login}
            body={comment.body}
          />
        ))}
      </div>
    </>
  );
}
