'use client'
import { useReducer } from "react"
import Card from "./Card"
import Link from "next/link"

export default function CardPanel() {

    const ratingReducer = (ratings: Map<string, number | null>, action: {type: string, venueName: string, rating?: number | null}) => {
        switch(action.type) {
            case 'update': {
                return new Map(ratings).set(action.venueName, action.rating ?? 0)
            }
            case 'remove': {
                const newMap = new Map(ratings)
                newMap.delete(action.venueName)
                return newMap
            }
            default: return ratings
        }
    }

    const mockVenueRepo = [
        {vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg"},
        {vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg"},
        {vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg"},
    ]

    const [ratings, dispatch] = useReducer(ratingReducer, new Map([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0],
    ]))

    return (
        <div className="m-5 flex flex-row flex-wrap content-around justify-around">
            {
                mockVenueRepo.map((venueItem) =>
                    <Link key={venueItem.vid} href={`/venue/${venueItem.vid}`}>
                        <Card
                            venueName={venueItem.name}
                            imgSrc={venueItem.image}
                            rating={ratings.get(venueItem.name) ?? 0}
                            onRatingChange={(newValue) => dispatch({type:'update', venueName:venueItem.name, rating:newValue})}
                        />
                    </Link>
                )
            }

            <div className="w-full mt-4">
                <div className="text-xl font-bold">Venue List with Ratings : {ratings.size}</div>
                {
                    Array.from(ratings.entries()).map(([venueName, rating]) => (
                        <div key={venueName} data-testid={venueName}
                            onClick={() => dispatch({type:'remove', venueName:venueName})}
                            className="cursor-pointer hover:text-red-500">
                            {venueName} : {rating}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}