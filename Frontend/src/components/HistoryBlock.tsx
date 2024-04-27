import { DentistItem, PatientItem } from "../../interface";
import dayjs from "dayjs";
import Link from "next/link";



export default function HistoryBlock({Key,UserType,oneT,Doctor,Medication,Treatment,Recommendation,Patient}:{Key:string,UserType:string,oneT:Date,Doctor:DentistItem,Medication:string,Treatment:string,Recommendation:string,Patient:PatientItem}){
    return(
    <Link href={`/report/${Key}`}>
        <div className="bg-white w-[40vw] font-medium rounded-xl m-5 pl-10 pt-3 pb-7 text-black text-center border-2 border-white  hover: border-2 hover:bg-slate-50 relative shadow-lg hover:border-sky-500 hover:scale-105 ">

            {(UserType=="patient")?null:
                <Link href={`/report/${Key}/update`}>
                    <div className="absolute right-3 top-2 text-blue-500 ">Edit</div>
                </Link>
                }

            {(UserType=="patient")?<div className="text-xl text-slate-800 mt-5 text-left">Doctor : {Doctor.name}</div>:
                <div className="text-xl text-slate-800 mt-5 text-left">Patient : {Patient.name}</div> 
                }
            <div className="text-xl text-slate-800 mt-5 text-left font-medium">Date : {dayjs(oneT).format('DD / MM / YYYY - HH:mm')}</div>
           
            {/* <div className="text-xl text-slate-800 mt-5 text-left">Doctor : {Doctor.name}</div>
            <div className="text-xl text-slate-800 mt-5 text-left">Patient : {Patient.name}</div>  */}
            {/* <div className="text-xl text-slate-800 mt-5 text-left">Medication : {Medication}</div> */}
            <div className="text-xl text-slate-800 mt-5 text-left">Treatment : {Treatment}</div>
            {/* <div className="text-xl text-slate-800 mt-5 text-left">Recommendation : {Recommendation}</div> */}
        </div>
    </Link>
    );
}