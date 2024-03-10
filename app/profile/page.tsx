import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import UserCard from "../components/UserCard";

export default async function page() {
  const session = await getServerSession(options);

  console.log(session);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} />
    </section>
  );
}
