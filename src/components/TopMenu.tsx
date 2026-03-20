import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';

export default async function TopMenu() {
  const session = await getServerSession();

  return (
    <div className="h-15 flex items-center justify-between bg-white shadow-md border-b border-amber-300">

      <div className="flex items-center px-8">
        {
          session ? (
            <TopMenuItem title='Sign-Out' pageRef='/api/auth/signout' />
          ) : (
            <TopMenuItem title='Sign-In' pageRef='/api/auth/signin' />
          )
        }
      </div>

      <div className="flex items-center">
        <div className="flex space-x-8 mr-8">
          <TopMenuItem title='Booking' pageRef='/booking' />
        </div>

        <div className="h-20 p-2 flex items-center justify-center bg-amber-100 border-l border-amber-200">
          <div className="p-0.5">
            <Image
              src={'/img/logo.png'}
              alt='logo'
              width={40}
              height={20}
              className="h-auto w-auto"
            />
          </div>
        </div>
      </div>

    </div>
  );
}