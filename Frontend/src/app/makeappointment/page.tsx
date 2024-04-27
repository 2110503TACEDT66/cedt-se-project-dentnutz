"use client";
import DateReserve from "@/components/DateReserve";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import addAppointment from "@/libs/addAppointment";
import { LinearProgress } from "@mui/material";
import { sweetAlert } from "@/components/alert";

export default function AppointmentMaking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const token = session?.user.token;
  if (!token) return null;

<<<<<<< HEAD
  if (
    session.user.type === "dentist" ||
    (session.user.type !== "dentist" && session.user.type !== "patient")
  ) {
    router.push("/");
=======
  if ((session.user.type === 'dentist') || (session.user.role==="admin")){
    router.push('/');
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737
  }
  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
  const [appointmentTime, setAppointmentTime] = useState<Dayjs | null>(null);
  const [dentistID, setDentistID] = useState<string | null>(
    searchParams.get("dentistid")
  );

  let appDate: string | null = null;

  if (appointmentDate && appointmentTime) {
    const timeString =
<<<<<<< HEAD
      appointmentDate && appointmentTime
        ? dayjs(
            `${appointmentDate.format("YYYY-MM-DD")}T${appointmentTime.format(
              "HH:mm"
            )}`
          )
        : null;
    appDate = dayjs(timeString).format("YYYY-MM-DD HH:mm:ss Z");
=======
    appointmentDate && appointmentTime
            ? dayjs(
                    `${appointmentDate.format(
                        "YYYY-MM-DD"
                    )}T${appointmentTime.format("HH:mm")}`
                )
            : null;
    appDate = dayjs(timeString).format('YYYY-MM-DD HH:mm:ss Z');
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737
  }

  //   function onTimeChange(value: number | null) {
  //     let selectedTime: dayjs.Dayjs | null = null;
  //     if (value === 1) {
  //         selectedTime = morning;
  //     } else if (value === 2) {
  //         selectedTime = afternoon;
  //     }

  //     const timeString =
  //         reserveDate && selectedTime
  //             ? dayjs(
  //                     `${reserveDate.format(
  //                         "YYYY-MM-DD"
  //                     )}T${selectedTime.format("HH:mm")}`
  //                 )
  //             : null;

  //     setReserveDate(dayjs(timeString));
  // }

  const makingAppointment = async () => {
<<<<<<< HEAD
    if (!appDate && !dentistID) {
      sweetAlert(
        "Incomplete",
        "Please select dentist and date/time for appointment",
        "warning"
=======
    if (!dentistID) {
      sweetAlert("Incomplete", "Please select dentist", "warning");
      return
    }
    if (!appDate) {
      sweetAlert("Incomplete", "Please select date for appointment", "warning");
      return
    }
    try {
      const appointment = await addAppointment(
        dentistID,
        appDate,
        token
        
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737
      );
      return;
    }
    if (!dentistID) {
      sweetAlert("Incomplete", "Please select dentist", "warning");
      return;
    }
    if (!appDate) {
      sweetAlert(
        "Incomplete",
        "Please select date/time for appointment",
        "warning"
      );
      return;
    }
    try {
      const appointment = await addAppointment(dentistID, appDate, token);

      if (appointment) {
<<<<<<< HEAD
        sweetAlert(
          "Successfully",
          "Appointment booked successfully",
          "success"
        );
=======
        sweetAlert("Successfully", "Appointment booked successfully", "success");
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737
        router.push("/appointment");
      } else {
        sweetAlert("Failed", "Appointment booking failed", "error");
      }
    } catch (error) {
<<<<<<< HEAD
      sweetAlert("Failed", "Cannot book more than 1 appointment", "error");
      router.push("/appointment");
=======
      const err =  error as Error;
      if(err.message === "Appointment date and dentist already exists") {
        sweetAlert("Failed", "Appointment date and dentist already exists", "error");
      } else if(err.message === "Cannot book more than 1 appointment") {
        sweetAlert("Failed", "Cannot book more than 1 appointment", "error");
      }
      else{
        //console.log(appointmentDate, appointmentTime, dentistID, appDate )
        sweetAlert("Failed", "Failed to add appointment", "error");
      }
      //console.log(error)
>>>>>>> edb10ad6e652166c9333d2be7d3a9b421ad1f737
    }
  };

  return (
    <main className="w-[100%] text-center items-center space-y-5 mt-20 mb-20">
      <div className="font-semibold w-fit rounded-3xl mx-auto my-2 px-14 py-5 text-black space-y-14 justify-center items-center border-2 border-gray-400">
        <div className="text-5xl mt-4">Create Appointment</div>

        <DateReserve
          onDateChange={(value: Dayjs) => {
            setAppointmentDate(value);
          }}
          currentDentist={dentistID}
          currentDate={appointmentDate}
          onDentistChange={(value: string) => {
            setDentistID(value);
          }}
          onTimeChange={(value: Dayjs) => {
            setAppointmentTime(value);
          }}
        />

        <button
          className="block bg-orange-400 rounded-full hover:bg-orange-300 text-white font-semibold px-5 py-3 shadow-xl text-white mx-auto text-2xl"
          name="Make Appointment"
          onClick={makingAppointment}
        >
          Create Appointment
        </button>
      </div>
    </main>
  );
}
