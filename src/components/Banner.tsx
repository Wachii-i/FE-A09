'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {

    const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg", "/img/cover4.jpg"]
    const [currentIndex, setCurrentIndex] = useState(0)
    const router = useRouter()
    const { data: session } = useSession()

    function handleBannerClick() {
        setCurrentIndex((currentIndex + 1) % covers.length)
    }

    return (
        <div className="relative w-screen h-[60vh] overflow-hidden cursor-pointer"
            onClick={handleBannerClick}>

            <Image
                src={covers[currentIndex]}
                alt="cover"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

            <div className="absolute top-[100px] left-0 w-full text-center text-white z-10">
                <div className="text-2xl font-bold [text-shadow:2px_2px_0px_#1a1a1a]">
                    where every event finds its venue
                </div>
                <div className="pt-5 text-base sm:text-lg leading-relaxed [text-shadow:2px_2px_0px_#1a1a1a]">
                    we connect people with the perfect place to create unforgettable experiences.
                </div>
            </div>

            {/* Welcome Message มุมขวาบน */}
            {session && (
                <div className="absolute top-5 right-5 text-white font-semibold text-lg z-10 
                    [text-shadow:2px_2px_0px_#1a1a1a]">
                    Welcome {session.user?.name}
                </div>
            )}

            {/* ปุ่ม Select Venue มุมขวาล่าง */}
            <button
                onClick={(e) => { e.stopPropagation(); router.push('/venue') }}
                className="absolute bottom-5 right-5 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 z-10">
                Select Venue
            </button>

        </div>
    );
}