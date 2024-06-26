"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer"; //這東西會自動判斷什麼時候使用者滑到底部了，然後做出相對應的行動。
import { Issue } from "@/type";
import IssueCard from "./IssueCard";
import { getAllIssues } from "../actions";

// 設定 2，代表從第二頁開開始抓資料
// 第一頁由主 page 負責渲染
let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // 設定若資料抓完後，就不要繼續呈現 Loading element 了
  const [totalIssues, setTotalIssues] = useState<number>(1);

  // 滑到底部時，inView 為 true，就回執行 callbackFn，重新抓資料並渲染
  useEffect(() => {
    // 如果上一次除新渲染時，已經沒有資料了，滑到底後就不要再執行以下 uesEffect
    if (inView && totalIssues) {
      try {
        getAllIssues(page).then((res) => {
          setLoading(true);
          setData([...data, ...res]);
          setLoading(false);
          setTotalIssues(res.length);
          page++;
        });
      } catch (e) {
        setTotalIssues(0);
      }
    }
  }, [inView]);

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full h-full">
        {data?.map((issue) => (
          <IssueCard
            key={issue.id}
            number={issue.number}
            title={issue.title}
            body={issue.body}
            time={issue.created_at}
            comment={issue.comments}
          />
        ))}

        {/* 把 ref 設定在 loading element，當視窗滑到這個 elememt 時，inView 就會為 true */}
        <div ref={ref}>
          {/* 還能抓到資料就顯示 loading，沒資料了就顯示空白 */}
          {totalIssues > 0 && loading ? (
            <>
              <span className="loading loading-spinner loading-md"></span>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
