"use client"
"useContext"
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import  createReport  from "@/libs/createReport";
import getAppointment from "@/libs/getAppointment";


export default function addReport() {
    const searchParams = useSearchParams();

    const { data: session } = useSession();
    const token = session?.user.token;
    if (!token) return null;

    const [treatment, setTreatment] = useState<string>("");
    const [recommendation, setRecommendation] = useState<string>("");
    const [medication, setMedication] = useState<string>("");
    const [dentist, setDentist] = useState<string|null>(searchParams.get("dentistId"));
    const [patient, setPatient] = useState<string|null>(searchParams.get("userId"));
    const [appointmentDate, setAppointmentDate] = useState<Date|null>(null);
    
    let appt = searchParams.get("apptId");

    useEffect(() => {
        const fetchAppointment = async () => {
          if (!appt) return;
          const appointment = await getAppointment(appt, token);
          setAppointmentDate(appointment.data.appDate);
        };
        fetchAppointment();
      }, []);

    const makingReport = async () => {
        if (!treatment || !recommendation || !medication || !patient || !dentist || !appointmentDate) return alert("Please enter all fields");
        const report = await createReport(
            patient,
            dentist,
            appointmentDate,
            treatment,
            medication,
            recommendation,
            token
        );
        if (report) {
          alert("Create Report successfully");
        } else {
          alert("Create Report failed");
        }
      };

  
  return (
    <main className="justify-center items-center p-5 flex flex-col">
        <h1 className="mx-auto w-fit text-2xl mb-10 bold">Create Report</h1>
        <div className="shadow-lg rounded-lg w-4/5 flex flex-col justify-items-center content-center p-5 space-y-2">
            
            
        
            <div className="flex flex-row ">
                <div className="text-xl basis-1/4">Medication:</div>
                <TextField multiline className="basis-3/4" id="outlined-basic" label="Symptom" variant="outlined" 
                onChange={(e)=>{setMedication(e.target.value)}}/>
            </div>
            <div className="flex flex-row ">
                <div className="text-xl basis-1/4">Treatment:</div>
                <TextField multiline className="basis-3/4" id="outlined-basic" label="Treatment" variant="outlined" 
                onChange={(e)=>{setTreatment(e.target.value)}}/>
            </div>
            <div className="flex flex-row ">
                <div className="text-xl basis-1/4">Recommmendation:</div>
                <TextField multiline className="basis-3/4" id="outlined-basic" label="Recommmendation" variant="outlined" 
                onChange={(e)=>{setRecommendation(e.target.value)}}/>
            </div>

            <button className="relative border-2 border-gray-800 bg-transparent py-2.5 px-5 font-medium uppercase text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gray-800 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
                onClick={makingReport}
            >Create Report</button>
        </div>
    </main>
  );
}