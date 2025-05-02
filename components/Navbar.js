"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)

  return (
    <nav className='bg-blue-950 flex flex-wrap flex-col sm:flex-row items-center text-white justify-between h-15 px-4'>
      <Link href={"/"}>
        <div className="logo min-w-0 overflow-hidden font-bold flex justify-center gap-2 items-center whitespace-nowrap text-lg">Chai dila do
          <img src="tea.gif" width={44} alt="" />
        </div>
      </Link>

      <div className='relative flex sm:flex-row flex-row flex-wrap md:items-center md:justify-around gap-2 sm:ml-auto max-w-full'>
        {session && <>
          <button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
            setTimeout(() => {
              setShowdropdown(false)
            }, 300);
          }} id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" >Welcome {session.user.name} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div id="dropdownDivider" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-0 bg-white divide-y divide-gray-100 top-full rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>

            </ul>
            <div className="py-2">
              <Link onClick={() => signOut()} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Out</Link>
            </div>
          </div>
        </>
        }

        {session && <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 w-auto md:w-1/2  text-center me-2 mb-2" onClick={() => signOut({callbackUrl:'/'})}>Logout</button>}

        {!session && <Link href={"/login"}>
          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 sm:px-3 py-1.5 w-full sm:w-auto md:w1/2 text-center me-2 mb-2">Login</button>
        </Link>}

      </div>
    </nav>
  )
}

export default Navbar
