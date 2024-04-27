import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";

export default async function MyAccount() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  return (
    <main className="">
      <div className="text-center font-semibold text-4xl mb-10 mt-8">Your Account</div>
      <div className="text-black mx-auto">
        <table className="table-auto border-separate border-spacing-6 mx-auto text-[22px] border-gray-200 border-2 rounded-2xl m-10 ">
          <tbody className="">
            <tr>
              <td className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium mr-10">Name : </td>
              <td className="border-gray-200 border-2 rounded-2xl text-gray-800 text-2xl font-medium text-center px-5 py-2">{profile.data.name}</td>
            </tr>
            <tr>
              <td className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium">Sex : </td>
              <td className="border-gray-200 border-2 rounded-2xl text-gray-800 text-2xl font-medium text-center px-5 py-2">Male</td>
            </tr>
            <tr>
              <td className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium">Blood Type : </td>
              <td className="border-gray-200 border-2 rounded-2xl text-gray-800 text-2xl font-medium text-center px-5 py-2">A</td>
            </tr>
            <tr>
              <td className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium">Nationtal ID : </td>
              <td className="border-gray-200 border-2 rounded-2xl text-gray-800 text-2xl font-medium text-center px-5 py-2">1-1-5426-6784-19-4</td>
            </tr>
            <tr>
              <td className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium">Email : </td>
              <td className="border-gray-200 border-2 rounded-2xl text-gray-800 text-2xl font-medium text-center px-5 py-2">{profile.data.email}</td>
            </tr>
            <tr>
              <td className="font-semibold pl-8 rounded-lg text-left text-2xl font-medium">Tel : </td>
              <td className="border-gray-200 border-2 rounded-2xl text-gray-800 text-2xl font-medium text-center px-5 py-2 ">{profile.data.tel}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
