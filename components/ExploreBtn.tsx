
'use client'

import Image from "next/image";
import posthog from "posthog-js";

const Explore = () => {
    const handleClick = () => {
        console.log('click');
        posthog.capture('explore_events_clicked');
    };

    return (
        <button  type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleClick}>
            <a href="#Explore" >
                Explore Events
                <Image src="/icons/arrow-down.svg" alt="explore" width={24} height={24}/>
            </a>

        </button>
    )
}

export default Explore;