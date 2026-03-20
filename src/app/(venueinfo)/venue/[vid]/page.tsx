import Image from "next/image"
import getVenue from "@/libs/getVenue"

export default async function VenueDetailPage({ params }: { params: Promise<{ vid: string }> }) {
    
    const { vid } = await params
    const venueJson = await getVenue(vid)
    const venueDetail = venueJson.data

    return (
        <main className="text-center p-5">
            <h1 className="text-3xl font-bold text-amber-800 mb-6">{venueDetail.name}</h1>
            
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10">
                <Image 
                    src={venueDetail.picture}
                    alt={venueDetail.name} 
                    width={500} 
                    height={400} 
                    className="rounded-lg shadow-md object-cover w-full md:w-[40%]"
                />
                
                <div className="text-left text-lg bg-slate-50 p-6 rounded-lg shadow-sm border border-gray-200 w-full md:w-[40%]">
                    <div className="flex flex-col gap-3">
                        <p><strong>Address:</strong> {venueDetail.address}</p>
                        <p><strong>District:</strong> {venueDetail.district}</p>
                        <p><strong>Province:</strong> {venueDetail.province}</p>
                        <p><strong>Postal Code:</strong> {venueDetail.postalcode}</p>
                        <p><strong>Tel:</strong> {venueDetail.tel}</p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-300">
                        <p className="text-2xl font-semibold text-sky-700">
                            Rate: {venueDetail.dailyrate} THB <span className="text-lg text-gray-500 font-normal">/ day</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}