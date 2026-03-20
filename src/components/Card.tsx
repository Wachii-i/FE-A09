'use client'
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';

export default function Card({
    venueName, imgSrc, rating, onRatingChange
}: {
    venueName: string,
    imgSrc: string,
    rating?: number | null,           
    onRatingChange?: (newValue: number | null) => void 
}) {
    const ratingName = venueName + " Rating"

    return (
        <InteractiveCard contentName={venueName}>
            <div className='relative w-full h-48'>
                <Image
                    src={imgSrc}
                    alt='Event Venue Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
            <div className='text-amber-800 font-medium text-lg p-2.5 bg-white rounded-b-lg'>
                <div>{venueName}</div>
   
                {onRatingChange && (
                    <Rating
                        id={ratingName}
                        name={ratingName}
                        data-testid={ratingName}
                        value={rating}
                        onChange={(event, newValue) => onRatingChange(newValue)}
                        onClick={(e) => e.stopPropagation()}
                    />
                )}
            </div>
        </InteractiveCard>
    );
}