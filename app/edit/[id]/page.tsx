import EditForm from "../../components/EditForm";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params: { id } }: Props) {
  // 保護 route，非作者想要修改文章會被導回首頁
  const session = await getServerSession(options);
  const email = process.env.AUTHOR_EMAIL;

  console.log(session, email);

  if (session?.user?.email !== email) {
    redirect("/");
  }
  return (
    <>
      <EditForm id={id} />
    </>
  );
}
