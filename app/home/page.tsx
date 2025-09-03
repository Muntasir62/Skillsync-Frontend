import Link from "next/link";
import Image from "next/image";

export default function Home()
{
    return (
        <>
        <header>
             <h1>Welcome To SkillSync</h1>
         <Image
                src="/skillsync.jpg"
                width={300}
                height={300}
                alt="List of courses"
              />
        </header>
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
            <br />
             <Link href="login">
             <button type="submit">Logout</button>
            </Link>
        </nav>
        <footer>
            
        </footer>
        </>

    );
}