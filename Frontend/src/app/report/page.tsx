"use client"
import PersonalInformation from "@/components/PersonalInformation";
import getReport from "@/libs/getReport";
import getReports from "@/libs/getReports";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import getAppointment from "@/libs/getAppointment";
import HistoryBlock from "@/components/HistoryBlock";
import { getServerSession } from "next-auth";
import { ReportItem, ReportJson } from "../../../interface";


export default function SelectReport() {

  const [reports, setreports] = useState<ReportJson | null>(null);

  const { data: session } = useSession();

  if (!session) {
    return <div>loading...</div>;
  }
  const token = session.user.token;
  
  useEffect( ()=>{
    const fetchData = async ()=>{
      const data = await getReports(token); 
      setreports(data)
    }
    fetchData()
  },[])

  return (
    <main className="justify-center items-center p-5 flex flex-col">
        <h1 className="mx-auto w-fit text-2xl mb-10 font-semibold mt-5">Report</h1>

        <form action="/search" className="max-w-[480px] w-full px-4">
      <div className="relative">
        <input
          type="text"
          name="q"
          className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
          placeholder="search"
        />
        <button type="submit" className="absolute top-3.5 right-3">
          <svg
            className="text-teal-400 h-5 w-5 fill-current dark:text-teal-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56.966 56.966"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
        </button>
      </div>
    </form>
        
      

        <div className="shadow-lg rounded-lg relative justify-items-center w-4/5">
          
            
            <div className="flex flex-col p-5 space-y-2">
                {reports?.data.map( (reportItem : ReportItem) =>
                (<HistoryBlock UserType={session.user.type} oneT={reportItem.date} Doctor={reportItem.dentistId} Symptom={reportItem.prescribed_medication} Treatment={reportItem.treatment} Recommendation={reportItem.recommendations} Patient={reportItem.patientId}/>)
                )}
                
            </div>
        </div>
        
        
    </main>
  );
}
