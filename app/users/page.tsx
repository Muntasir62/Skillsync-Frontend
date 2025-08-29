import Link from "next/link";
import Image from "next/image";

export default function Users()
{
    return (
        <>
         <Image
        src="/users.png"
        width={500}
        height={500}
        alt="List of users"
      />
        <h1>User Details</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Is Active</th>
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