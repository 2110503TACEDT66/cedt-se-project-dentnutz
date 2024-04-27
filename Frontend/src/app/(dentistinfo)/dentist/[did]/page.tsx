import Image from "next/image";
import getDentist from "@/libs/getDentist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function DentistDetailPage({
  params,
}: {
  params: { did: string };
}) {

  const dentistDetail = await getDentist(params.did);
  const session = await getServerSession(authOptions)

  return (
    <main className="text-center p-5">
      <Suspense fallback={<div>
          <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">Loading... </p>
          <div className="mb-20"><LinearProgress/></div>
        </div>}>
          <h1 className="text-lg font-medium"></h1>
          <div className="flex flex-row my-5">
            <Image
              src={dentistDetail.data.picture}
              alt="Hospital Image"
              width={0}
              height={0}
              sizes="100vm"
              className="rounded-lg w-[30%] mx-20 "
            />
            <div className="text-xl mx-5 text-gray-800 w-[50%]">
              {" "}
              <div className="text-5xl font-bold text-center">Doctor {dentistDetail.data.name}</div>
              <div className="h-[75%] rounded-2xl border-2 border-slate-200 mt-5 ">
              <table className=" border-separate border-spacing-6">
                <tbody className=" text-2xl mx-10">
                  <tr>
                    <td className="font-semibold font-medium pl-5 pr-20 text-left">Expertise : </td>
                    <td className="border-gray-200 border-2 rounded-full text-gray-800 font-medium text-center items-right px-5">General Dentistry</td>
                  </tr>
                  <tr >
                    <td className="font-semibold font-medium pl-5 pr-20 text-left" >Experiences :</td>
                    <td className="border-gray-200 border-2 rounded-full text-gray-800 font-medium text-center items-right px-5">{dentistDetail.data.yearsOfExperience}{" "} Years</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-medium pl-5 pr-20 text-left">Age : </td>
                    <td className="border-gray-200 border-2 rounded-full text-gray-800 font-medium text-center items-right px-5 ">32 Years</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-medium pl-5 pr-20 text-left">Gender : </td>
                    <td className="border-gray-200 border-2 rounded-full text-gray-800 font-medium text-center items-right px-5 ">Male</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-medium pl-5 pr-20 text-left">Education : </td>
                    <td className="border-gray-200 border-2 rounded-full text-gray-800 font-medium text-center items-right px-5 ">Factry Of Dentist CU</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-medium pl-5 pr-20 text-left">Dentist ID : </td>
                    <td className="border-gray-200 border-2 rounded-full text-gray-800 font-medium text-center items-right px-5 ">6619704566e9ff32122e4542</td>
                </tr>
                </tbody>
              </table>
                {/* <div className="mx-5">Year Of Experiences: {dentistDetail.data.yearsOfExperience}{" "}</div>
                <div className="mx-5 "> Area Of Expertise: {dentistDetail.data.areaOfExpertise}{" "}</div> */}
              </div>
              {
                session?.user.type==='patient' && session?.user.role !== 'admin' &&  <Link href={`/makeappointment?dentistid=${dentistDetail.data.id}&dentistname=$<div>{dentistDetail.data.name}</div>`}>
                <button className="bg-orange-400 rounded-full hover:bg-orange-300 text-white font-semibold px-7 py-2 shadow-lg text-white mx-auto text-2xl mt-4">Select</button>
                </Link>
              }
            </div>
          </div>
      </Suspense>
    </main>
  );
}
