import Link from "next/link";
import Image from "next/image";

export default function Reviews() {
  return (
    <>
     <header>
      <h1>Welcome To SkillSync</h1>
     <Image
            src="/reviews.jpg"
            width={500}
            height={500}
            alt="List of courses"
          />
     </header>
      <h1>Reviews</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course ID</th>
            <th>User ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Created At</th>
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