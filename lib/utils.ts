import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const eventsImage = [
  {
    image: "/images/event1.png",
    title: "Tech Conference 2026",
    slug: "tech-conference-2026",
    location: "New Delhi",
    date: "2026-07-15",
    time: "10:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "AI Summit",
    slug: "ai-summit",
    location: "Bangalore",
    date: "2026-08-20",
    time: "09:30 AM",
  },
  {
    image: "/images/event3.png",
    title: "Startup Meetup",
    slug: "startup-meetup",
    location: "Mumbai",
    date: "2026-09-05",
    time: "04:00 PM",
  },
  {
    image: "/images/event4.png",
    title: "Web Development Workshop",
    slug: "web-development-workshop",
    location: "Hyderabad",
    date: "2026-10-10",
    time: "11:00 AM",
  },
  {
    image: "/images/event5.png",
    title: "Hackathon 2026",
    slug: "hackathon-2026",
    location: "Pune",
    date: "2026-11-12",
    time: "08:00 AM",
  },
  {
    image: "/images/event6.png",
    title: "Developer Connect",
    slug: "developer-connect",
    location: "Gurgaon",
    date: "2026-12-01",
    time: "06:00 PM",
  },
];