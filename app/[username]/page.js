import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from "next/navigation"
import { fetchuser } from '@/actions/useractions'
const Username = async ({ params }) => {
  const p = await params
  let u = await fetchuser(p.username)
  // Check if user exists
  if (!u) {
    // If user not found, return a 404 page
    notFound(); // Return null if no user is found
  }
  return (<>
    <PaymentPage username={p.username} />
  </>
  )
}

export default Username
export async function generateMetadata({ params }) {
  const p = await params
  return {

    title: `Support Page for ${p.username}`,
    description: `Make a payment to ${p.username}`,
  };
}