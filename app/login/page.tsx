import Link from "next/link";
import Image from "next/image";
export default function Login()
{
    return (
        <>
       <header>
          <h1>Welcome To SkillSync</h1>
       <Image
        src="/login.png"
        width={400}
        height={400}
        alt="List of notifications"
      />
       </header>
        
        <h1>Login page</h1>
        <form action="">
            Email : <input type="email" placeholder="Email" />
            <br />
            Password : <input type="password" placeholder="Password" />
            <br />
             <Link href="home">
             <button type="submit">Login</button>
            </Link>
            <br />

        </form>
        <Link href="signup">Don't have an account? Sign Up</Link>
        <footer>
          
        </footer>
        </>
    );
}