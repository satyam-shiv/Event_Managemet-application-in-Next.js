
import Link from "next/link";
import Image from "next/image"

interface Props {
    image:string;
    title:string;
    slug:string;
    location:string;
    date:string;
    time:string;
}

const EventCard = ({title, image , slug , location , date , time}: Props) => {
    return (
        <>
        <Link href={`/events /${slug}`} id="event-card">
         <Image src={image} alt='Poster' width={410} height={300} className="poster" />
        </Link>
        <p className="flex flex-row gap-2"><Image src ="/icons/pin.svg" alt="pin" width={14} height={4}/>{location}</p>
        <p className="title">{title}</p>
        <p className="flex flex-row gap-2"><Image src="/icons/calendar.svg" alt="calendar" width={14} height={4}/>{date} 
         <div className="h-4 w-px bg-gray-500 gap-2" ></div>
         <span className="flex gap-2"><Image src="/icons/clock.svg" alt="calendar" width={14} height={4}/>{time}</span>
        </p>
          
        </>
    ) 
}

 export default EventCard;