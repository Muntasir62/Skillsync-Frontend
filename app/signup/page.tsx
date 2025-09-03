import Link from "next/link";
import Image from "next/image";

export default function Signup()
{
    return (
        <>
         <header>
          <h1>Welcome To SkillSync</h1>
        <Image
        src="/register.jpg"
        width={500}
        height={500}
        alt="List of notifications"
      />
         </header>
        <h1>Registration Form </h1>
        <br />
        <form action="">

          Name :   <input type="text" placeholder="Name" />
            <br />
         Email : <input type="email" placeholder="Email" />
        <br />
        Password : <input type="password" placeholder="Password" />
        <br />
        Select Role : <select name="" id="">
            <option value="super_admin"> Super Admin</option>
            <option value="moderator">Moderator</option>
            <option value="analyst">Analyst</option>
        </select>
        <br />
        <Link href="login">
          <button type="submit">Sign Up</button>
        </Link>
        </form>
        <br />
         <Link href="login">Already have an account? Login</Link>
         <footer>
          
         </footer>
        </>
    );
}