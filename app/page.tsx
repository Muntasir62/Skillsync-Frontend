import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
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
    
    
    
   <Link href = "login"> Login </Link>
   <br />
   <Link href= "signup"> Sign Up </Link>
   <footer>
      
    </footer>
    
    </>
    
  );
}
