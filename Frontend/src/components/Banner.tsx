"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

export default function Banner() {
  //   const covers =['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
  //   const [index, setIndex] = useState(0)

  const router = useRouter();

  const { data: session } = useSession();

  const token = session?.user.token;

  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) return null;
      const profile = await getUserProfile(token);
      setMe(profile);
    };
    fetchMe();
  }, []);

  return (
    <div
      className="block p-5 m-0 w-screen h-[80vh] relative flex flex-row items-center justify-center"
      style={{ backgroundColor: "rgb(247, 238, 221)" }}
    >
      <div
        className="text-black text-left rounded-lg px-10 py-10 mx-20 z-20 items-center"
        style={{ backgroundColor: "rgb(250, 250, 250)" }}
      >
        <h1 className="text-8xl font-semibold mt-0 mb-0 ">Dentnutz</h1>
        <h2 className="text-5xl font-normal mt-0 mb-3 text-sky-400">
          Teeth Protector
        </h2>
        {session && me ? (
          <div className="font-semibold text-cyan-800 text-xl mb-2">
            Welcome {me.data.name}
          </div>
        ) : null}
        {/* <button className='bg-orange-400 text-white text-2xl font-semibold py-2 px-2 my-5 rounded-full text-center ml-20 drop-shadow-md hover:bg-orange-300 py-3 px-5'
                onClick={(e)=>{e.stopPropagation(); router.push('/dentist');}}>
                Care Your Teeth Now 
            </button>    */}
      </div>

      <div className="flex-grow">
        <Image
          src="/img/cover1.jpg"
          alt="cover"
          fill={true}
          priority={true}
          className="object-cover w-[100%] h-[100%]"
        />
      </div>
    </div>
  );
}
