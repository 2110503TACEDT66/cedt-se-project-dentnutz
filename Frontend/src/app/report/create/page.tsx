"use client";
"useContext";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
<<<<<<< HEAD
import { useSearchParams } from "next/navigation";
import createReport from "@/libs/createReport";
=======
import { useSearchParams, useRouter } from "next/navigation";
import  createReport  from "@/libs/createReport";
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737
import getAppointment from "@/libs/getAppointment";
import { sweetAlert } from "@/components/alert";

export default function addReport() {
<<<<<<< HEAD
  const searchParams = useSearchParams();
=======
    const searchParams = useSearchParams();
    const router = useRouter();
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737

  const { data: session } = useSession();
  const token = session?.user.token;
  if (!token) return null;

  const [treatment, setTreatment] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const [medication, setMedication] = useState<string>("");
  const [dentist, setDentist] = useState<string | null>(
    searchParams.get("dentistId")
  );
  const [patient, setPatient] = useState<string | null>(
    searchParams.get("userId")
  );
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);

  let appt = searchParams.get("apptId");

<<<<<<< HEAD
  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appt) return;
      const appointment = await getAppointment(appt, token);
      setAppointmentDate(appointment.data.appDate);
    };
    fetchAppointment();
  }, []);

  const makingReport = async () => {
    if (
      !treatment ||
      !recommendation ||
      !medication ||
      !patient ||
      !dentist ||
      !appointmentDate
    )
      return alert("Please enter all fields");
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
=======
    const makingReport = async () => {
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
        if (!patient || !dentist || !appointmentDate || !appt) {
          sweetAlert("Incomplete", "Please select appointment again", "warning");
          router.push("/schedule");
          return
        }
        const report = await createReport(
            patient,
            dentist,
            appt,
            appointmentDate,
            treatment,
            medication,
            recommendation,
            token
        );
        if (report) {
          sweetAlert("Successfully", "Create report successfully", "success");
          router.push("/appointment");
        } else {
          sweetAlert("Failed", "Create report failed", "error");
        }
      };
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737

  return (
    <main className="justify-center items-center p-5 flex flex-col">
      <h1 className="text-center font-semibold text-4xl mb-10 mt-5">
        Create Report
      </h1>
      <div className="border-2 border-gray-300 rounded-2xl w-4/5 flex flex-col justify-items-center content-center p-5 space-y-2">
        <div className="flex flex-row  mt-15 mb-15">
          <div className="text-xl basis-1/4 text-black">Treatment :</div>
          <TextField
            multiline
            className="basis-3/4"
            id="outlined-basic"
            label="Treatment"
            variant="outlined"
            onChange={(e) => {
              setTreatment(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row ">
          <div className="text-xl basis-1/4 text-black">Medication :</div>
          <TextField
            multiline
            className="basis-3/4"
            id="outlined-basic"
            label="Medication"
            variant="outlined"
            onChange={(e) => {
              setMedication(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row ">
          <div className="text-xl basis-1/4 text-black">Recommmendation : </div>
          <TextField
            multiline
            className="basis-3/4 "
            id="outlined-basic"
            label="Recommmendation"
            variant="outlined"
            onChange={(e) => {
              setRecommendation(e.target.value);
            }}
          />
        </div>

        <button
          className="block bg-orange-400 rounded-full hover:bg-orange-300 text-white font-semibold px-5 py-3 shadow-xl text-white mx-auto text-2xl"
          onClick={makingReport}
        >
          Create Report
        </button>
      </div>
    </main>
  );
}
