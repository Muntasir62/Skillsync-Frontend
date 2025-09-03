import Link from "next/link";
import Image from "next/image";

export default function Reports() {
  return (
    <>
  <header>
       <h1>Welcome To SkillSync</h1>
     <Image
            src="/reports.png"
            width={500}
            height={500}
            alt="List of courses"
          />
  </header>
      <h1>Reports</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reported User ID</th>
            <th>Reported Course ID</th>
            <th>Description</th>
            <th>Status</th>
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