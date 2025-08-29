import Link from "next/link";
import Image from "next/image";

export default function Home()
{
    return (
        <>
         <Image
                src="/skillsync.jpg"
                width={300}
                height={300}
                alt="List of courses"
              />
        <h1>Home Page</h1>
        <nav>
            <Link href="users"> Manage Users </Link>
            <br />
            <Link href="courses"> Manage Courses </Link>
            <br />
            <Link href="reviews"> Watch Reviews</Link>
            <br />
            <Link href="reports"> Manage Reports</Link>
            <br />
            <Link href="notifications"> Manage Notifications</Link>
        </nav>
        </>

    );
}