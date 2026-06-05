
import React from 'react'
import {eventsImage} from "../lib/utils";
import Image from "next/image";
import EventCard from './EventCard';

const Feature = () => {    
  return ( 
    <div className='mt-25'>
      <p>Feature Events</p>

      <ul className='events'>
        {eventsImage.map((item , index) => (
        <li key={index} id='event-card'>
         <EventCard {...item} />
        </li>
     ) )} 
      </ul>
      
    </div>
  )
}

export default Feature
