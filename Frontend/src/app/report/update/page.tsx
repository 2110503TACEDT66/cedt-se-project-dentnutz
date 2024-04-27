"use client"
"useContext"
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import updateReport from "@/libs/updateReport";
import getReport from "@/libs/getReport";
import { useSearchParams } from "next/navigation";
import Input from "@mui/material";
import { sweetAlert } from "@/components/alert";

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
        if (!treatment) {
          sweetAlert("Incomplete", "Please enter treatment", "warning");
          return
        }
        if (!medication) {
          sweetAlert("Incomplete", "Please enter medication", "warning");
          return
        }
        if (!recommendation) {
          sweetAlert("Incomplete", "Please enter recommendation", "warning");
          return
        }
        if (!reportID) {
          sweetAlert("Incomplete", "Please select report again", "error");
          return
        }
        const report = await updateReport(
            treatment,
            medication,
            recommendation,
            reportID,
            token
        );
        if (report) {
          sweetAlert("Successfully", "Update report successfully", "success");
        } else {
          sweetAlert("Failed", "Update report failed", "error");
        }
      };

  
  return (
    <main className="justify-center items-center p-5 flex flex-col">
        <h1 className="text-center font-semibold text-4xl mb-10 mt-8">Update Report</h1>
        <div className="border-gray-200 border-2 rounded-2xl w-4/5 flex flex-col justify-items-center content-center p-5 space-y-2"> 
            <div className="flex flex-row ">
                <div className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium">Treatment:</div>
                <TextField multiline className="basis-3/5" id="outlined-basic" label="Treatment" variant="outlined" 
                onChange={(e)=>{setTreatment(e.target.value)}}
                value={treatment}/>
            </div>
            <div className="flex flex-row ">
                <div className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium ">Medication:</div>
                <TextField multiline className="basis-3/5" id="outlined-basic" label="Medication" variant="outlined" 
                onChange={(e)=>{setMedication(e.target.value)}}
                value={medication}/>
            </div>
            <div className="flex flex-row">
                <div className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium">Recommmendation : </div>
                <TextField multiline className="basis-3/5 " id="outlined-basic" label="Recommmendation" variant="outlined" 
                onChange={(e)=>{setRecommendation(e.target.value)}}
                value={recommendation}/>
            </div>
            <button className="block bg-orange-400 rounded-full hover:bg-orange-300 text-white font-semibold px-5 py-3 shadow-xl text-white mx-auto text-2xl"onClick={editReport}>Confirm Details</button>

        </div>
</main>

  );
}