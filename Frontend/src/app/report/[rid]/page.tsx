"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import getReport from "@/libs/getReport";
import { ReportItem, ReportJson } from "../../../../interface";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

export default function ReportDetailPage({
  params,
}: {
  params: { rid: string };
}) {

    const [reportDetail, setReportDetail] = useState<any>(null);

    const { data: session } = useSession();

    const token = session?.user.token;
    if (!token) return null;

  
    useEffect(() => {
        const fetchReport = async () => {
          if(session.user.role !== "admin"){
            const report = await getReport(params.rid, token);
            setReportDetail(report);
          }
        };
        fetchReport();
        
      }, []);

      if (!reportDetail) return (<div>
        <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">Loading... </p>
        <div className=" mb-20 "><LinearProgress/></div>
      </div>);

    return (
        <main className="grid mt-5 mb-20 justify-items-center ">
            <div className="text-3xl m-5">Report By <span style={{ fontWeight: 'bold' }}>{reportDetail.data.dentistId.name}</span></div>
            <div className="flex flex-row m-10">
                <div className="w-600 h-600">   
                    <Image src="/img/dentist00.png" alt="Description" width={600} height={600} />
                </div>
                <div className="self-center text-2xl space-y-2">
                    <div>Patient Name <span style={{ fontWeight: 'bold' }}>{reportDetail.data.patientId.name}</span></div>
                    <div>Treatment <span style={{ fontWeight: 'bold' }}>{reportDetail.data.treatment}</span></div>
                    <div>Madication <span style={{ fontWeight: 'bold' }}>{reportDetail.data.prescribed_medication}</span></div>
                    <div>Recommend <span style={{ fontWeight: 'bold' }}>{reportDetail.data.recommendations}</span></div>
                    <div>Date <span style={{ fontWeight: 'bold' }}>{dayjs(reportDetail.data.date).format('DD / MM / YYYY - HH:mm')}</span></div>

                    {(session.user.type=="patient" && session.user.role!=="admin")?null:
                        <Link href={`/report/${params.rid}/update`}>
                            <button className=" my-4 px-10 py-2 text-lg text-blue-100 transition-colors duration-300 bg-blue-500 rounded-full shadow-xl hover:bg-blue-600 shadow-blue-400/30 ">Edit</button>
                        </Link>
                    }
                    
                </div>

            </div>
        </main> 
    );
}
