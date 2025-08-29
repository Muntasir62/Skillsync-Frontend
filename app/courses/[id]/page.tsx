import { use } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Course({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div>
         <Image
                src="/courses.jpg"
                width={500}
                height={500}
                alt="List of courses"
              />
      <h1>Course {id} Details </h1>
      <p>ID: </p>
      <p>Title: </p>
      <p>Description: </p>
      <p>Status: </p>
      <p>Approved By: </p>
     
      <Link href="/courses">Back to Courses</Link>
    </div>
  );
}