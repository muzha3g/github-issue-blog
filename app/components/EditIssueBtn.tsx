"use client";

import { useRouter } from "next/navigation";

export default function EditIssueBtn({ id }: { id: number }) {
  const router = useRouter();
  return (
    <input
      type="button"
      value="✏️ Edit"
      className="btn mx-1 w-1/2"
      onClick={() => {
        router.push(`/edit/${id}`);
      }}
    />
  );
}
