
'use client'

import Image from "next/image";

const Explore = () => {
    return (
        <button  type="button" id="explore-btn" className="mt-7 mx-auto" onClick={() => console.log('click')  }>
            <a href="#Explore" >
                Explore Events
                <Image src="/icons/arrow-down.svg" alt="explore" width={24} height={24}/>
            </a>

        </button>
    )
}

export default Explore;