import AppointmentList from "@/components/AppointmentList";
import getAppointment from "@/libs/getAppointments";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function MyAppointment() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) return null;

  const appointment = getAppointment(session.user.token);

  return (
    <main className="justify-center items-center p-5">
      <h1 className="text-5xl font-medium w-fit  text-black bg rounded-lg m-3 py-6 px-10 mx-auto bg-bule-300" >Appointments</h1>
      <Suspense fallback={<div>
        <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">Loading... </p>
        <div className="mb-20"><LinearProgress/></div>
      </div>}>
        <AppointmentList appointmentJson={appointment} />
      </Suspense>
    </main>
  );
}
