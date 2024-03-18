import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  title: string;
  body: string;
  time: string;
  comment: number;
  number: number;
};

export default function IssueCard({
  title,
  body,
  time,
  comment,
  number,
}: Props) {
  // 把時間修改成只有年月日
  const timeSlice = time.slice(0, 10);

  return (
    <>
      <div className="card w-1/2 h-45 bg-base-100 shadow-xl m-2">
        <Link href={`issue/${number}`}>
          {" "}
          <div className="card-body pb-8 ">
            <h2 className="card-title h-6 truncate line-clamp-1 text-wrap">
              {title}
            </h2>
            <div className="h-12 mt-2 text-wrap truncate line-clamp-2 mb-2">
              <Markdown remarkPlugins={[remarkGfm]} className="prose">
                {body}
              </Markdown>
            </div>
            <div className="flex justify-between items-center text-slate-600 text-xs ">
              <p>
                <span>💬&nbsp;</span>
                {comment}
              </p>
              <p className="flex justify-end overflow-hidden ">{timeSlice}</p>
            </div>
          </div>{" "}
        </Link>
      </div>
    </>
  );
}
