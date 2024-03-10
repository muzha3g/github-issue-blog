import Image from "next/image";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
};

export default function Card({ user }: Props) {
  //console.log(user)

  const greeting = user?.name ? (
    <div className="flex flex-col items-center p-6 rounded-lg font-bold text-5xl text-black mt-2">
      Hello {user?.name}! 👋
    </div>
  ) : null;

  const userImage = user?.image ? (
    <Image
      className="border-4 border-slate-200 drop-shadow-xl shadow-slate-100 rounded-full mx-auto mt-5"
      src={user?.image}
      width={200}
      height={200}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  return (
    <section className="flex flex-col gap-4">
      {greeting}
      {userImage}
    </section>
  );
}
