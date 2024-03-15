import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import UserCard from "../components/UserCard";

export default async function page() {
  const session = await getServerSession(options);

  // 只有登入者可以進到 profile route，非登入者會被導到主頁
  if (!session) {
    redirect("/");
  }

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} />
    </section>
  );
}
