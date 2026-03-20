import VenueCatalog from "@/components/VenueCatalog"
import getVenues from "@/libs/getVenues"
import { Suspense } from "react"

export default function VenuePage() {
    
    const venues = getVenues()

    return (
        <main>
            <div className="text-2xl font-medium text-center mt-5">
                Select Your Venue Location
            </div>
            
            <Suspense fallback={<p className="text-center mt-5">Loading venues...</p>}>
                <VenueCatalog venuesJson={venues} />
            </Suspense>
        </main>
    )
}