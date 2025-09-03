import Link from "next/link";
import Image from "next/image";

export default function Notifications() {
  return (
    <>
    <header>
      <h1>Welcome To SkillSync</h1>
     <Image
            src="/notifications.jpg"
            width={500}
            height={500}
            alt="List of courses"
          />
    </header>
      <h1>Notifications</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Message</th>
            <th>Recipient</th>
            <th>Timestamp</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
        
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            
          </tr>
        </tbody>
      </table>
       <Link href="home">
             <button type="submit">Back To Homepage</button>
            </Link>
            <footer>
              
            </footer>
    </>
  );
}