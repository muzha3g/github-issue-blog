import Markdown from "react-markdown";

type Props = {
  title: string;
  body: string;
  time: string;
  comment: number;
  number: number;
};

export default function IssueDetail({
  title,
  body,
  time,
  comment,
  number,
}: Props) {
  const timeSlice = time.slice(0, 10);
  return (
    <>
      <div className="card w-1/2 h-auto bg-base-100 shadow-xl m-2 ">
        {" "}
        <div className="card-body">
          <h2 className="card-title h-auto overflow-clip">{title}</h2>
          <div className="h-auto overflow-clip ">
            {/* 這邊有噴 error，晚點處理 */}
            {/* 把 p tag 改成 div 就好了 :D */}
            <Markdown>{body}</Markdown>
          </div>
          <div className="flex justify-between items-center text-slate-600 text-xs mt-1 ">
            <p>
              <span>💬&nbsp;</span>
              {comment}
            </p>
            <p className="flex justify-end ">{timeSlice}</p>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
