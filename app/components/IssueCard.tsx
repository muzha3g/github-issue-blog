import Link from "next/link";

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
  const timeSlice = time.slice(0, 10);
  return (
    <>
      <div className="card w-1/2 h-40 bg-base-100 shadow-xl m-2 ">
        <Link href={`issue/${number}`}>
          {" "}
          <div className="card-body  ">
            <h2 className="card-title h-6 overflow-hidden text-ellipsis whitespace-nowrap ">
              {title}
            </h2>
            <p className="h-10 overflow-hidden text-ellipsis whitespace-nowrap mt-2  ">
              {body}
            </p>
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
