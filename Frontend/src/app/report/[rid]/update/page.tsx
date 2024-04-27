"use client"
"useContext"
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import updateReport from "@/libs/updateReport";
import getReport from "@/libs/getReport";
import { useSearchParams } from "next/navigation";
import { sweetAlert } from "@/components/alert";
import router from "next/router";

export default function updateReportPage({
  params,
}: {
  params: { rid: string };
}) {

  const { data: session } = useSession();
  const token = session?.user.token;
  if (!token) return null;

  const searchParams = useSearchParams();

  const [treatment, setTreatment] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const [medication, setMedication] = useState<string>("");
  
  let reportID = params.rid;
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
        router.push("/report");
      } else {
        sweetAlert("Failed", "Update report failed", "error");
      }
    };


return (
  <main className="justify-center items-center p-5 flex flex-col">
      <h1 className="mx-auto w-fit text-2xl mb-10 bold text-black">Update Report</h1>
      <div className="shadow-lg rounded-lg w-4/5 flex flex-col justify-items-center content-center p-5 space-y-2">
          
          
          <div className="flex flex-row ">
              <div className="text-xl basis-1/4 text-black">Treatment:</div>
              <TextField multiline className="basis-3/4" id="outlined-basic" label="Treatment" variant="outlined" 
              onChange={(e)=>{setTreatment(e.target.value)}}
              value={treatment}/>
          </div>
          <div className="flex flex-row ">
              <div className="text-xl basis-1/4 text-black">Medication:</div>
              <TextField multiline className="basis-3/4" id="outlined-basic" label="Medication" variant="outlined" 
              onChange={(e)=>{setMedication(e.target.value)}}
              value={medication}/>
          </div>
          <div className="flex flex-row ">
              <div className="text-xl basis-1/4 text-black">Recommmendation:</div>
              <TextField multiline className="basis-3/4" id="outlined-basic" label="Recommmendation" variant="outlined" 
              onChange={(e)=>{setRecommendation(e.target.value)}}
              value={recommendation}/>
          </div>

          <button className="relative border-2 border-gray-800 bg-transparent py-2.5 px-5 font-medium uppercase text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gray-800 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
              onClick={editReport}
          >Submit</button>
      </div>
  </main>
  );
}