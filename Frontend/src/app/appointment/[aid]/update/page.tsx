"use client";
import getAppointment from "@/libs/getAppointment";
import deleteAppointment from "@/libs/deleteAppointment";
import { Select, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import getDentists from "@/libs/getDentists";
import updateAppointment from "@/libs/updateAppointment";
import DateReserve from "@/components/DateReserve";
import { LinearProgress } from "@mui/material";

export default function AppointmentDetailPage({
  params,
}: {
  params: { aid: string };
}) {
  const [appointmentDetail, setAppointmentDetail] = useState<any>(null);
  const [appointmentTime, setAppointmentTime] = useState<Dayjs | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
  const [dentist, setDentist] = useState<any>(null);

  const { data: session } = useSession();

  const token = session?.user.token;
  if (!token) return null;

  let appDate: string | null = null;

  if (appointmentDate && appointmentTime) {
    const timeString =
      appointmentDate && appointmentTime
        ? dayjs(
            `${appointmentDate.format("YYYY-MM-DD")}T${appointmentTime.format(
              "HH:mm"
            )}`
          )
        : null;
    appDate = dayjs(timeString).format("YYYY-MM-DD HH:mm:ss Z");
  }

  const morning: Dayjs = dayjs().hour(9).minute(0);
  const afternoon: Dayjs = dayjs().hour(13).minute(0);

  useEffect(() => {
    const fetchData = async () => {
      const appointment = await getAppointment(params.aid, token);
      setAppointmentDetail(appointment);
      setAppointmentDate(dayjs(appointment.data.appDate));
      setAppointmentTime(
        dayjs(appointment.data.appDate).get("hour") === 9
          ? morning
          : dayjs(appointment.data.appDate).get("hour") === 13
          ? afternoon
          : null
      );
      setDentist(appointment.data.dentist._id);
    };
    fetchData();
  }, []);

  const router = useRouter();

  const editAppointment = async () => {
    await updateAppointment(
      appointmentDetail.data._id,
      dentist,
      dayjs(appDate).format("YYYY-MM-DD HH:mm:ss Z"),
      token
    );
    router.push(`/appointment/${appointmentDetail.data._id}`);
  };

  if (!appointmentDetail)
    return (
      <div>
        <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">
          Loading...{" "}
        </p>
        <div className=" mb-20 ">
          <LinearProgress />
        </div>
      </div>
    );

  return (
    <main className="mt-10 mb-20 text-left">
      <div className="text-center font-semibold text-4xl mb-10 ">
        Edit Appointment
      </div>
      <div
        className="font-medium w-fit rounded-3xl mx-auto my-2 px-10 py-5 text-black space-y-8 justify-center items-center border-gray-300 border-2 text-center "
        key={appointmentDetail.data._id}
      >
        <div className="text-3xl mt-4">
          Patient : {appointmentDetail.data.userName}
        </div>
        <DateReserve
          onDateChange={(value: Dayjs) => {
            setAppointmentDate(value);
          }}
          currentDentist={dentist}
          currentDate={appointmentDate}
          onDentistChange={(value: string) => {
            setDentist(value);
          }}
          onTimeChange={(value: Dayjs) => {
            setAppointmentTime(value);
          }}
        />
        <button
          className="block bg-orange-400 rounded-full hover:bg-orange-300 text-white font-semibold px-5 py-3 shadow-xl text-white mx-auto text-2xl"
          name="Submit Changes"
          onClick={editAppointment}
        >
          Submit Changes
        </button>
      </div>
    </main>
  );
}
