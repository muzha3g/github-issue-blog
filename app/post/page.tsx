import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

// 第一     種保護 route 的方式，若沒登入想用有登入的功能，就會導向登入頁面，登入後會再跳轉回這個功能頁面
// 第二種是三元判斷式
export default async function page() {
  const session = await getServerSession(options);
  const email = "apple2951@gmail.com";

  console.log(session);

  if (session?.user?.email !== email) {
    return <h1>這個網頁的作者才能發文 @_@</h1>;
  }

  return <h1>Post page</h1>;
}
