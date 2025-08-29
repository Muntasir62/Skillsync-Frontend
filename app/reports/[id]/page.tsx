import { use } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Report({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div>
         <Image
                src="/reports.png"
                width={500}
                height={500}
                alt="List of courses"
              />
      <h1>Report {id} Details </h1>
      <p>ID: </p>
      <p>Reported User ID: </p>
      <p>Reported Course ID: </p>
      <p>Description: </p>
      <p>Status: </p>
      <Link href="/reports">Back to Reports</Link>
    </div>
  );
}