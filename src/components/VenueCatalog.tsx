import Link from "next/link";
import Card from "./Card";
import { VenueItem, VenueJson } from "../../interface";

export default async function VenueCatalog({ venuesJson }: { venuesJson: Promise<VenueJson> }) {
    
    const venueJsonReady = await venuesJson;

    return (
        <>
            <div className="text-center text-lg my-4">
                Explore {venueJsonReady.count} venues in our catalog
            </div>
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", alignContent: "space-around", justifyContent: "space-around", flexWrap: "wrap", padding: "10px" }}>
                {
                    venueJsonReady.data.map((venueItem: VenueItem) => (
                        <Link key={venueItem.id} href={`/venue/${venueItem.id}`}>
                            <Card
                                venueName={venueItem.name}
                                imgSrc={venueItem.picture}
                            />
                        </Link>
                    ))
                }
            </div>
        </>
    );
}