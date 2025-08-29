import Image from "next/image";
import Link from "next/link";

export default function Wlcome() {
  return (
    <>
     <Image
            src="/skillsync.jpg"
            width={300}
            height={300}
            alt="List of courses"
          />
    <h1>Welcome To SkillSync</h1>
    
   <Link href = "login"> Login </Link>
   <br />
   <Link href= "signup"> Sign Up </Link>
    </>
  );
}
