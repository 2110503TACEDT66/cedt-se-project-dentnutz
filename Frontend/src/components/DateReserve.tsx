"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import getDentists from "@/libs/getDentists";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import { DentistItem } from "../../interface";

export default function DateReserve({
  onDateChange,
  onDentistChange,
  onTimeChange,
  currentDate,
  currentDentist,
}: {
  onDateChange: Function;
  onTimeChange: Function;
  currentDentist: string | null;
  currentDate: Dayjs | null;
  onDentistChange: Function;
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(currentDate);
  const [componentDate, setComponentDate] = useState<Dayjs | null>(currentDate);
  const [dentist, setDentist] = useState<any>(currentDentist);
  const [allDentist, setAllDentist] = useState<any>(null);
  const [reserveTime, setReserveTime] = useState(
    currentDate?.get("hour") === 9 ? 1 : currentDate?.get("hour") === 13 ? 2 : 0
  );

  const morning: Dayjs = dayjs().hour(9).minute(0);
  const afternoon: Dayjs = dayjs().hour(13).minute(0);

  const { data: session } = useSession();

  const token = session?.user.token;
  if (!token) return null;

  function setComponentTime(value: Dayjs | null) {
    const timeString =
      reserveDate && value
        ? dayjs(`${reserveDate.format("YYYY-MM-DD")}T${value.format("HH:mm")}`)
        : null;

    setComponentDate(dayjs(timeString));
  }

  useEffect(() => {
    const fetchData = async () => {
      const dentist = await getDentists();
      setAllDentist(dentist);
    };
    fetchData();
  }, []);

  // if (!allDentist) return null;
  if (!allDentist)
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
  else
    return (
      <div className="rounded-lg space-x-5 space-y-2 px-10 py-5 flex flex-col ">
        <div className="flex flex-row items-left space-x-5 ">
          <div className="text-2xl font-medium mt-3 ml-10 mr-11 ">
            <p>Dentist&nbsp;:&nbsp;Doctor</p>
          </div>
          <FormControl fullWidth>
            <InputLabel id="Dentist-select-label">dentist</InputLabel>
            <Select
              name="dentist"
              id="dentist"
              label="Dentist"
              labelId="Dentist-select-label"
              value={dentist}
              className="h2-[2em] min-w-[200px] w-fit mb-10 text-lg font-medium"
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              onChange={(e) => {
                setDentist(e.target.value), onDentistChange(e.target.value);
              }}
            >
              {allDentist.data.map((dentistItem: DentistItem) => {
                return (
                  <MenuItem value={dentistItem._id}>
                    {dentistItem.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="flex flex-row items-left space-x-5">
          <div className="text-2xl font-medium mt-3 ml-5">
            <p>Appointment&nbsp;date&nbsp;:&nbsp;</p>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="text-2xl font-semibold  w-fit"
              value={reserveDate}
              onChange={(value) => {
                setReserveDate(value);
                onDateChange(value);
                setComponentDate(
                  reserveTime != 0
                    ? dayjs(value?.hour(reserveTime === 1 ? 9 : 13))
                    : null
                );
              }}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
          <FormControl className="text-2xl font-semibold min-w-[15%] items-left">
            <InputLabel id="Appointment-date-select-label">Time</InputLabel>
            <Select
              labelId="Appointment-date-select-label"
              id="Appointment-date-select"
              value={reserveTime}
              label="Appointment Time"
              style={{ width: "200px" }}
              onChange={(e) => {
                setReserveTime((e.target.value as number) || 0);
                onTimeChange(
                  e.target.value === 1
                    ? morning
                    : e.target.value === 2
                    ? afternoon
                    : null
                );
                setComponentTime(
                  e.target.value === 1
                    ? morning
                    : e.target.value === 2
                    ? afternoon
                    : null
                );
              }}
            >
              <MenuItem value={1}>09.00</MenuItem>
              <MenuItem value={2}>13.00</MenuItem>
            </Select>
          </FormControl>
          {/* <h1>{dayjs(componentDate).format('YYYY-MM-DD HH:mm:ss Z')}</h1> */}
        </div>
      </div>
    );
}
