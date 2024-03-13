import EditForm from "../../components/EditForm";

type Props = {
  params: {
    id: string;
  };
};

export default function page({ params: { id } }: Props) {
  return (
    <>
      <EditForm id={id} />
    </>
  );
}
