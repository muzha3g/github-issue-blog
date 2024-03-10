import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Navbar() {
  const session = await getServerSession(options);
  //  email 改為自己的 gitgub 信箱
  const email = "apple2951@gmail.com";
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            Blog
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {session?.user?.email === email ? (
              <li>
                <Link href="/post">Post</Link>
              </li>
            ) : (
              <></>
            )}

            {session ? (
              <li>
                <Link href="/api/auth/signout">Sign Out</Link>
              </li>
            ) : (
              <li>
                <Link href="/api/auth/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </div>

        {session ? (
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Link href="/profile">
                <img alt="profile image" src={session?.user?.image as string} />
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
