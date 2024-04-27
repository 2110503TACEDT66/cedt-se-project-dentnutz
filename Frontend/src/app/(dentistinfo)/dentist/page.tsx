import DentistCatalog from "@/components/DentistCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getDentists from "@/libs/getDentists";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dentist() {

  const dentist = getDentists();

  return (
    <main className="text-center p-5 ">
        <h1 className="text-center font-semibold text-4xl mb-10 my-5">Our Dentists</h1>
        <Suspense fallback={<div>
          <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">Loading... </p>
          <div className=" mb-20 "><LinearProgress/></div>
        </div>}>
         
          <DentistCatalog dentistsJson={dentist}/>
          
        </Suspense>
    </main>
  );
}