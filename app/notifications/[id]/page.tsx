import { use } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Notification({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div>
         <Image
                src="/notifications.jpg"
                width={500}
                height={500}
                alt="List of courses"
              />
      <h1>Notification {id} Details</h1>
      <p>ID: </p>
      <p>Title: </p>
      <p>Message: </p>
      <p>Recipient: </p>
      <p>Timestamp: </p>
      <Link href="/notifications">Back to Notifications</Link>
    </div>
  );
}