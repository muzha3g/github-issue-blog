import Link from "next/link";

type Props = {
  title: string;
  body: string;
  time: string;
  comment: number;
  id: number;
};

export default function IssueDetail({ title, body, time, comment, id }: Props) {
  const timeSlice = time.slice(0, 10);
  return (
    <>
      <div className="card w-7/12 h-40 bg-base-100 shadow-xl m-2 ">
        <Link href={`issue/${id}`}>
          {" "}
          <div className="card-body">
            <h2 className="card-title h-6 overflow-clip">{title}</h2>
            <p className="h-12 overflow-clip ">{body}</p>
            <div className="flex justify-between items-center text-slate-600 text-xs mt-1 ">
              <p>
                <span>💬&nbsp;</span>
                {comment}
              </p>
              <p className="flex justify-end ">{timeSlice}</p>
            </div>
          </div>{" "}
        </Link>
      </div>
    </>
  );
}
