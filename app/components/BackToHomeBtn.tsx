"use client";

import { useRouter } from "next/navigation";

export default function BackToHomeBtn() {
  const router = useRouter();
  return (
    <input
      type="button"
      value="Back"
      className="btn my-4"
      onClick={() => {
        router.push("/");
      }}
    />
  );
}
