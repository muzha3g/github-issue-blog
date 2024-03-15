"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createAnIssue } from "../actions";

export default function page() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const router = useRouter();
  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      //  驗證 title & body 必填 +最低字數
      if (title === "" || title.trim() === "") {
        Swal.fire("Title is required.");
      } else if (body === "" || body.trim() === "") {
        Swal.fire("Description is required.");
      } else if (body.length < 30) {
        Swal.fire("Description should over 30 words.");
      } else {
        await createAnIssue(title, body);
        Swal.fire("Success✨"); //sweet alert，出現一個 modal alert 跟使用者說發文成功
        router.push("/"); // 使用 useRouter 進行頁面跳轉
      }
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  return (
    <main className="flex justify-center items-center flex-col flex-wrap my-5 text-3xl font-bold">
      <h1 className="font-mono ">Create</h1>
      <div className="mt-4 mb-2 w-3/5">
        {/* title */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Add a title</span>
          </div>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {/* body */}
        <label className="form-control my-3">
          <div className="label">
            <span className="label-text">Add a description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-40"
            placeholder="Add your description here..."
            minLength={30}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>

        {/* submit btn */}
      </div>
      <button
        className="btn"
        onClick={(e) => {
          submitHandler(e);
        }}
      >
        🚀 Submit new issue{" "}
      </button>
    </main>
  );
}
