import Link from "next/link";
import { use } from "react";
import Image from "next/image";
export default function User({
    params,

}: {
    params : Promise <{id : string}>;
}) {
    const {id} = use(params);
    return (
        <div>
             <Image
                    src="/users.png"
                    width={500}
                    height={500}
                    alt="List of users"
                  />
            <h1>Useer {id} Details </h1>
            <p>ID : </p>
            <p>ID: </p>
            <p>Name: </p>
            <p>Email: </p>
            <p>Role: </p>
            <p> Active Status :</p>
            <p> Verified Status : </p>
            <Link href ="/users"> Back To Users </Link>
        </div>
    
    );
}
