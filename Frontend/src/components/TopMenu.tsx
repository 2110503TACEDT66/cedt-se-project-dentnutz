"use client";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

import styles from "./topmenu.module.css";
// import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useSelectedLayoutSegments } from "next/navigation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function TopMenu() {
    const path = useSelectedLayoutSegments().join("/");

    const { data: session } = useSession();
    const navigation: { name: string; href: string; current: boolean }[] = [];
    if (!session) {
        navigation.push(
            { name: "Dentist", href: "/dentist", current: path === "(dentistinfo)/dentist" },
            {
                name: "Booking",
                href: "/makeappointment",
                current: path === "makeappointment",
            },
            {
                name: "Appointment",
                href: "/appointment",
                current: path === "appointment",
            }
        );
    } else {
        if (session.user.type === "patient" && session.user.role!=="admin") {
            navigation.push(
                {
                    name: "Dentist",
                    href: "/dentist",
                    current: path === "(dentistinfo)/dentist",
                },
                {
                    name: "Booking",
                    href: "/makeappointment",
                    current: path === "makeappointment",
                },
                {
                    name: "Appointment",
                    href: "/appointment",
                    current: path === "appointment",
                },
                { name: "Report", href: "/report", current: path === "report" }
            );
        } else if (session.user.type === "dentist") {
            navigation.push(
                {
                    name: "Appointment",
                    href: "/appointment",
                    current: path === "appointment",
                },
                {
                    name: "Schedule",
                    href: "/schedule",
                    current: path === "schedule",
                },
                {
                    name: "Report",
                    href: "/report",
                    current: path === "report",
                }
            );
        } else if (session.user.role === "admin") {
            navigation.push(
                {
                    name: "Dentist",
                    href: "/dentist",
                    current: path === "(dentistinfo)/dentist",
                },
                {
                    name: "Appointment",
                    href: "/appointment",
                    current: path === "appointment",
                },
                {
                    name: "Schedule",
                    href: "/schedule",
                    current: path === "schedule",
                },
               
            );
        } else {
            navigation.push(
                {
                    name: "Dentist",
                    href: "/dentist",
                    current: path === "(dentistinfo)/dentist",
                },
                {
                    name: "Booking",
                    href: "/makeappointment",
                    current: path === "makeappointment",
                },
                {
                    name: "Appointment",
                    href: "/appointment",
                    current: path === "appointment",
                }
            );
        }
    }
    return (
        <div className="fixed top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 bg-slate-700">
            <Disclosure as="nav" className="">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <a href="/">
                                            <img
                                                className="h-8 w-auto"
                                                src="/img/LOGO2.png"
                                                alt="Dentnutz"
                                            />
                                        </a>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-violet-700 text-white"
                                                            : "hover:bg-gray-700 text-slate-300",
                                                        "rounded-md px-3 py-2 text-sm font-medium hover:bg-violet-700"
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? "page"
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <a className="ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/10 rounded-full py-1 px-3 hidden xl:flex items-center hover:bg-sky-400/20">
                                    <strong className="font-semibold">
                                        {!session ? "Not signed-in" : session.user.role === "admin" ? session?.user.role : session?.user.type}
                                    </strong>
                                </a>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0  dark:border-slate-500">
                                    <Menu
                                        as="div"
                                        className="relative lg:border-l lg:border-slate-200 lg:ml-6 lg:pl-6 ml-3"
                                    >
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={
                                                        session
                                                            ? "/img/profilelogo.png"
                                                            : "/img/profilelogo.png"
                                                    }
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 bg mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {session ? (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/myaccount"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ) : null}
                                                {session ? (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Edit Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ) : null}
                                                {!session ? (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/api/auth/register"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Register
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ) : null}
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href={
                                                                session
                                                                    ? "/api/auth/signout"
                                                                    : "/api/auth/signin"
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            {session
                                                                ? "Sign out"
                                                                : "Sign in"}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "block rounded-md px-3 py-2 text-base font-medium"
                                        )}
                                        aria-current={
                                            item.current ? "page" : undefined
                                        }
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
// import Image from 'next/image'
// import TopMenuItem from './TopMenuItem'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import getUserProfile from '@/libs/getUserProfile'
// import Link from 'next/link'
// import { Button } from '@mui/material'

// export default async function TopMenu() {

//   const session = await getServerSession(authOptions)
//   const profile = session ? await getUserProfile(session.user.token) : null

//   function renderTopMenuItem() {
//     if (!session) {
//       return (
//         <div className="flex gap-4 ml-[35%]">
//           <TopMenuItem title='Dentist' pageRef='/dentist'/>
//           <TopMenuItem title='Booking' pageRef='/makeappointment'/>
//           <TopMenuItem title='Appointment' pageRef='/appointment'/>
//         </div>
//       )
//     }
//     else {
//       if (session.user.type === 'patient') {
//         return (
//           <div className="flex gap-4 ml-[32%]">
//             <TopMenuItem title='Dentist' pageRef='/dentist'/>
//             <TopMenuItem title='Booking' pageRef='/makeappointment'/>
//             <TopMenuItem title='Appointment' pageRef='/appointment'/>
//             <TopMenuItem title='Report' pageRef='/report'/>
//           </div>
//         )
//       }
//       else if (session.user.type === 'dentist') {
//         return (
//           <div className="flex gap-4 ml-[37%]">
//             <TopMenuItem title='Schedule' pageRef='/schedule'/>
//             <TopMenuItem title='Report' pageRef='/report'/>
//           </div>
//         )
//       }
//       else {
//         return (
//           <div className="flex gap-4 ml-[35%]">
//             <TopMenuItem title='Dentist' pageRef='/dentist'/>
//             <TopMenuItem title='Schedule' pageRef='/schedule'/>
//             <TopMenuItem title='Appointment' pageRef='/appointment'/>
//           </div>
//         )
//       }
//     }
//   }

//   return (
//     <div

//       className="h-[64px] top-0 left-0 right-0 z-30 px-10 fixed flex flex-row justify-stretch items-center shadow-lg bg-sky-300">
//       <div className='h-[100%] justify-start w-fit'>

//         <Link href="/" className='mr-5'>
//           <Image src={'/img/LOGO.svg'} className="h-[85%] w-auto p-1" alt='logo' width={0} height={0} />
//         </Link>
//       </div>

//       {renderTopMenuItem()}

//             {/* <Link href="/api/auth/signin" className="text-xl text-slate-950 font-medium ml-3 flex items-center gap-2 px-2 py-3.5 rounded-2xl hover:text-primary-default hover:text-slate-700 hover:underline ">
//               Sign In
//             </Link> */}

//       <div className='flex ml-auto items-center gap-4 w-auto'>
//         <div>
//           {
//             session ? <div className='flex flex-row space-x-5'>
//               <Link href="/api/auth/signout" className="text-xl text-white font-medium ml-3 flex items-center gap-2 px-2 py-3.5 hover:text-slate-100 hover:underline">
//                  Sign-Out
//               </Link>
//             </div>

//             : <div className='flex flex-row-reverse '>
//               <Link href="/api/auth/signin" className="text-xl text-white font-medium ml-3 flex items-center gap-2 px-2 py-3.5 hover:text-slate-100 hover:underline">
//                 Sign In
//               </Link>
//               <Link href="/api/auth/register" className="text-xl text-white font-medium ml-3 flex items-center gap-2 px-2 py-3.5 hover:text-slate-100 hover:underline ">
//                 Register
//               </Link>
//             </div>
//           }
//         </div>

//         <div className='h-8 border-r border-default'></div>
//         {/* <Link href="/myaccount">
//           <Button className='group flex items-center gap-2 rounded-2xl hover:text-primary-default hover:bg-cyan-500 py-2 outline-none '>
//               <img
//                 src={'/img/profilelogo.png'}
//                 alt="logoprofile"
//                 className="w-8 h-8 group-hover:border group-hover:border-primary-default group-hover:shadow-primary rounded-full object-cover border-default shadow-default"
//               />
//               {
//                 session ? <p className='text-white text-xl font-medium'>{profile.data.name}</p>
//                 : <p className='text-white text-xl font-medium'>Profile</p>
//               }
//           </Button>
//         </Link> */}

//         <Link href="/myaccount">
//           <div className='group flex items-center gap-2 rounded-2xl'>
//             <img
//                 src={'/img/profilelogo.png'}
//                 alt="logoprofile"
//                 className="w-8 h-8 wl-3 group-hover:border group-hover:border-primary-default group-hover:shadow-primary rounded-full object-cover border-default shadow-default"/>
//               {
//                 session ? <div className='text-xl text-white font-medium ml-1 flex items-center gap-2 px-2 py-3.5 hover:text-slate-100 hover:underline '>{profile.data.name}</div>
//                 : <div className="text-xl text-white font-medium ml-1 flex items-center gap-2 px-2 py-3.5 hover:text-slate-100 hover:underline ">Profile</div>
//               }
//           </div>

//         </Link>
//       </div>
//     </div>
//   )
// }
