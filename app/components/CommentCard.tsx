type Props = {
  name: string;
  image: string;
  body: string;
};

export default function CommentCard({ name, image, body }: Props) {
  return (
    <>
      <div className="chat chat-start my-2 px-4">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt={name} src={image} />
          </div>
        </div>
        <div className="chat-header text-xs px-2">{name}</div>
        <div className="chat-bubble text-sm bg-gray-200 text-black mt-1">
          {body}
        </div>
      </div>
    </>
  );
}
