import Link from "next/link";
import Image from "next/image";
export default function Login()
{
    return (
        <>
       <Image
        src="/login.png"
        width={400}
        height={400}
        alt="List of notifications"
      />
        
        <h1>Login page</h1>
        <form action="">
            <input type="email" placeholder="Email" />
            <br />
            <input type="password" placeholder="Password" />
            <br />
             <Link href="home">
             <button type="submit">Login</button>
            </Link>
            <br />

        </form>
        <Link href="signup">Don't have an account? Sign Up</Link>
        </>
    );
}