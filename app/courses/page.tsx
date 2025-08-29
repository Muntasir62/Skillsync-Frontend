import Link from "next/link";
import Image from "next/image";

export default function Courses()
{
    return (
        <>
          <Image
        src="/courses.jpg"
        width={500}
        height={500}
        alt="List of courses"
      />
         
        <h1>Courses</h1>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th >Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Approved By</th>
            <th>Details</th>
          </tr>
        </thead>
         <tbody>
                <tr>
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
        
</>
    );
}