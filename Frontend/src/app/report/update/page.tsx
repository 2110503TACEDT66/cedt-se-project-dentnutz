"use client"
"useContext"
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import updateReport from "@/libs/updateReport";
import getReport from "@/libs/getReport";
import { useSearchParams } from "next/navigation";
import Input from "@mui/material";

export default function updateReportPage() {

    const { data: session } = useSession();
    const token = session?.user.token;
    if (!token) return null;

    const searchParams = useSearchParams();

    const [treatment, setTreatment] = useState<string>("");
    const [recommendation, setRecommendation] = useState<string>("");
    const [medication, setMedication] = useState<string>("");
    
    let reportID = searchParams.get('reportId');
    if (!reportID) return;

    useEffect(() => {
        const fetchData = async () => {
          if (!reportID) return;
          const report = await getReport(reportID, token);
          setTreatment(report.data.treatment);
          setRecommendation(report.data.recommendations);
          setMedication(report.data.prescribed_medication);
        }
        fetchData();
      },[]);

    const editReport = async () => {
        if (!treatment || !recommendation || !medication || !reportID) return alert("Please enter all fields");
        const report = await updateReport(
            treatment,
            medication,
            recommendation,
            reportID,
            token
        );
        if (report) {
          alert("Update Report successfully");
        } else {
          alert("Update Report failed");
        }
      };

  
  return (
<main className="flex justify-center items-center p-10 flex-col mb-10 ">
    <h1 className="mx-auto w-fit text-4xl mb-10 font-bold text-black mt-7 ">Update Report</h1>
    <div className="shadow-lg rounded-lg w-4/5 flex flex-col p-5 space-y-7 text-center  ">
        <div className="items-center ">
            <div className="w-1/4 text-black text-s ml-10  mb-1">Treatment</div>
            <input type="text" className="rounded-2xl text-black outline-2 border border-gray-300 hover:border-gray-500 focus:border-bule-500 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-opacity-70 w-3/4 p-3"
            onChange={(e) => {setTreatment(e.target.value)}}  value={treatment}/>
       
        </div>
        <div className=" items-center ">
            <div className="w-1/4 text-black text-s ml-10  mb-1">Medication</div>
            <input type="text" className="rounded-2xl text-black outline-2 border border-gray-300 hover:border-gray-500 focus:border-bule-500 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-opacity-70 w-3/4 p-3"
            onChange={(e) => {setMedication(e.target.value)}}  value={medication}/>
            
        </div>
        <div className=" items-center mb-5">
            <div className="w-1/4 text-black text-s ml-[70px] ">Recommendation:</div>
          
            <textarea className="rounded-xl text-black outline-2 border border-gray-300 hover:border-gray-500 focus:border-bule-500 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-opacity-70 w-3/4 p-2" rows={4}
            onChange={(e) => {setRecommendation(e.target.value)}}  value={recommendation}></textarea>
        </div>
        <button className="bg-orange-400 rounded-full hover:bg-orange-300 text-white font-semibold px-8 py-1 shadow-xl text-white mx-auto text-xl "onClick={editReport}>Submit
        </button>
    </div>
</main>

  );
}