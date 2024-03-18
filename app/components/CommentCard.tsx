import Image from "next/image";

type Props = {
  name: string;
  image: string;
  body: string;
};

export default function CommentCard({ name, image, body }: Props) {
  return (
    <>
      <div className="chat chat-start my-2 mt-1 px-4">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Image alt={name} src={image} width={70} height={70} />
          </div>
        </div>
        <div className="chat-header text-xs px-2">{name}</div>
        <div className="chat-bubble text-sm bg-gray-200 text-black py-3">
          {body}
        </div>
      </div>
    </>
  );
}
