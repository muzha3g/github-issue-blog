"use client";

import { useRouter } from "next/navigation";

export default function BackToHomeBtn() {
  const router = useRouter();
  return (
    <input
      type="button"
      value="🏠 Back"
      className="btn mx-1 w-1/2"
      onClick={() => {
        router.push("/");
      }}
    />
  );
}
