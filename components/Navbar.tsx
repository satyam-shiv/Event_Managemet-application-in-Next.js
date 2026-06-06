'use client';

import Link from "next/link";
import Image from "next/image";

import React from 'react'
import posthog from "posthog-js";

const Navbar = () => {
  const handleNavClick = (label: string, href: string) => {
    posthog.capture('nav_link_clicked', { label, href });
  };

  return (
    <header>
        <nav>
            <Link href='/' className= "logo" onClick={() => handleNavClick('DevEvent', '/')}>
              <Image src="/icons/logo.png" alt="nav" width={24} height={24}/>
              <p>DevEvent</p>
            </Link>

          <ul>
            <li><Link href="/" onClick={() => handleNavClick('Home', '/')}>Home</Link></li>
            <li><Link href="/Events" onClick={() => handleNavClick('Events', '/Events')}>Events</Link></li>
            <li><Link href="/Create Event" onClick={() => handleNavClick('Create Event', '/Create Event')}>Create Event</Link></li>
          </ul>

        </nav>
    </header>
  )
}

export default Navbar
