"use client"
"useContext"
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import  createReport  from "@/libs/createReport";
import getAppointment from "@/libs/getAppointment";
import { sweetAlert } from "@/components/alert";


export default function addReport() {
    const searchParams = useSearchParams();
    const router = useRouter();

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
        if (!treatment) {
          sweetAlert("Incomplete", "Please enter treatment", "warning");
          return
        }
        if (!recommendation) {
          sweetAlert("Incomplete", "Please enter recommendation", "warning");
          return
        }
        if (!medication) {
          sweetAlert("Incomplete", "Please enter medication", "warning");
          return
        }
        if (!patient || !dentist || !appointmentDate) {
          sweetAlert("Incomplete", "Please select appointment again", "warning");
          router.push("/schedule");
          return
        }
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
          sweetAlert("Successfully", "Create report successfully", "success");
        } else {
          sweetAlert("Failed", "Create report failed", "error");
        }
      };

  
  return (
    <main className="flex justify-center items-center p-10 flex-col mb-10 ">
        <h1 className="mx-auto w-fit text-4xl mb-10 font-bold text-black mt-7 ">Create Report</h1>
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
          
            <textarea className="rounded-2xl text-black outline-2 border border-gray-300 hover:border-gray-500 focus:border-bule-500 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-opacity-70 w-3/4 p-2" rows={4}
            onChange={(e) => {setRecommendation(e.target.value)}}  value={recommendation}></textarea>
        </div>

            <button className="bg-orange-400 rounded-full hover:bg-orange-300 text-white font-semibold px-8 py-1 shadow-xl text-white mx-auto text-xl "
                onClick={makingReport}
            >Create Report</button>
        </div>
    </main>
  );
}