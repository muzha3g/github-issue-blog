"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { DeleteAnIssue } from "../actions";

export default function DeleteIssueBtn({ id }: { id: number }) {
  const router = useRouter();

  return (
    <input
      type="button"
      value="🗑️ Delete"
      className="btn mx-1 w-1/2"
      onClick={() => {
        DeleteAnIssue(id);
        Swal.fire("Delete！");
        router.push("/");
      }}
    />
  );
}
