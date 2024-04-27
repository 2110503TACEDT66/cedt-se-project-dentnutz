"use client";
import getAppointment from "@/libs/getAppointment";
import deleteAppointment from "@/libs/deleteAppointment";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import dayjs from "dayjs";
import { confirmAlert } from "@/components/alert";

export default function AppointmentDetailPage({
  params,
}: {
  params: { aid: string };
}) {
  const [appointmentDetail, setAppointmentDetail] = useState<any>(null);

  const { data: session } = useSession();

  const token = session?.user.token;
  if (!token) return null;

  useEffect(() => {
    const fetchAppointment = async () => {
      const appointment = await getAppointment(params.aid, token);
      setAppointmentDetail(appointment);
    };
    fetchAppointment();
  }, []);

  const router = useRouter();

  const cancelAppointment = async () => {
    confirmAlert("Are you sure?", "Cancel this appointment", "warning", "Appointment cancelled", async () => {
      await deleteAppointment(appointmentDetail.data._id, token);
      router.push("/")
    })
  }
  

  const handleClickCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await cancelAppointment();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has  been deleted.",
          icon: "success",
        });
      }
    });
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
    <main className=" mt-5 mb-20">
      <h1 className="text-center font-semibold text-4xl mb-10 "> Patient Appointments</h1>
        <div className=" font-medium w-fit rounded-3xl mx-auto my-2 px-10 py-5 text-black space-y-8 justify-center  border-gray-300 border-2 text-center "
          key={appointmentDetail.data._id}>
          <div className="text-2xl font-medium mt-3 ml-5 text-left">Patient : {appointmentDetail.data.userName}</div>
          <div className="text-2xl font-medium mt-3 ml-5 text-left">Dentist : Doctor {appointmentDetail.data.dentist?.name}</div>
          <div className="text-2xl font-medium mt-3 ml-5 text-left">Appointment Date : {dayjs(appointmentDetail.data.appDate).format('DD / MM / YYYY - HH:mm')}</div>
          <div className="text-right">
          {
            ((session.user.type==='patient'&& session.user.role!=="admin") || (session.user.role==="admin"))?
            <div>
            <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
            <button
              className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-3 py-2 shadow-sm text-white inline"
              name="Edit Appointment"
            >
              Edit Appointment
            </button>
          </Link>
          <button onClick={cancelAppointment} className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Cancel
        </button>
        </div>
        <div className="text-2xl font-medium mt-3 ml-5 text-left">
          Dentist : Doctor {appointmentDetail.data.dentist?.name}
        </div>
        <div className="text-2xl font-medium mt-3 ml-5 text-left">
          Appointment Date :{" "}
          {dayjs(appointmentDetail.data.appDate).format(
            "DD / MM / YYYY - HH:mm"
          )}
        </div>
        <div className="text-right">
          {session.user.type === "patient" ||
          (session.user.type !== "patient" &&
            session.user.type !== "dentist") ? (
            <div>
              <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
                <button
                  className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-3 py-2 shadow-sm text-white inline"
                  name="Edit Appointment"
                >
                  Edit Appointment
                </button>
              </Link>
              <button
                onClick={cancelAppointment}
                className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    `../report/create?userId=${appointmentDetail.data.user}&dentistId=${appointmentDetail.data.dentist._id}&apptId=${appointmentDetail.data._id}`
                  );
                }}
                className="text-base text-blue-500 mt-5 text-right font-medium mr-5"
              >
                Create Report
              </button>
              <button
                onClick={cancelAppointment}
                className="text-base text-blue-500 mt-5 text-right font-medium"
              >
                Finish
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
