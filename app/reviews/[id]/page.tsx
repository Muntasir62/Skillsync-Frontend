import { use } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Review({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div>
         <Image
                src="/reviews.jpg"
                width={500}
                height={500}
                alt="List of courses"
              />
      <h1>Review {id} Details</h1>
      <p>ID: </p>
      <p>Course ID: </p>
      <p>User ID: </p>
      <p>Rating: </p>
      <p>Comment: </p>
      
      <Link href="/reviews">Back to Reviews</Link>
    </div>
  );
}