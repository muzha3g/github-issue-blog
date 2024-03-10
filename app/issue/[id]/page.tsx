import IssueDetail from "@/app/components/IssusDetail";

type Props = {
  params: {
    id: number;
  };
};

export default function page({ params: { id } }: Props) {
  return <h1>issue {id}</h1>;
}
