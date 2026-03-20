import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import DateReserve from "@/components/DateReserve";
import TextField from "@mui/material/TextField";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  const profile = session ? await getUserProfile(session.user.token) : null;

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl">New Booking</div>

      {profile && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-fit text-left space-y-1">
          <div><span className="font-medium">Name:</span> {profile.data.name}</div>
          <div><span className="font-medium">Email:</span> {profile.data.email}</div>
          <div><span className="font-medium">Tel:</span> {profile.data.tel}</div>
          <div><span className="font-medium">Member Since:</span> {profile.data.createdAt}</div>
        </div>
      )}

      <div className="w-fit flex flex-col gap-4">
        <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" />
        <TextField variant="standard" name="Contact-Number" label="Contact-Number" />
        <DateReserve />
      </div>
      <button
        name="Book Venue"
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
      >
        Book Venue
      </button>
    </main>
  );
}