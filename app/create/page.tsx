import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Form from "../components/CreateForm";

export default async function page() {
  // 保護這個 route，非作者想從連結直接進來就會被擋
  const session = await getServerSession(options);
  const email = process.env.AUTHOR_EMAIL;
  if (session?.user?.email !== email) {
    return (
      <h1 className="flex justify-center items-center flex-col flex-wrap my-10 text-3xl font-bold">
        要是這個網頁的作者才能發文ㄛ @_@
      </h1>
    );
  }

  return <Form />;
}
