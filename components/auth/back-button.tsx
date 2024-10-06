import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: Props) => {
  return (
    <Button variant={"link"} size={"sm"} className="w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
