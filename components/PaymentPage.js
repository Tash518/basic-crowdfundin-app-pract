"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useState } from 'react'
import { fetchuser, fetchpayments } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { notFound } from "next/navigation"


const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({
        amount: '',
        name: '',
        message: ''
    })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('payment successfully made', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            router.push(`/${username}`)
        }
    }, [])


    // const { data: session } = useSession()
    const pay = async (amount) => {
        //get order id
        let a = await initiate(amount, username, paymentform)

        let orderId = a.id
        //fetch key secret and key id from db
        let user = await fetchuser(username)
        const razorpayid = user.razorpayid
        const razorpaysecret = user.razorpaysecret

        // console.log(" [pay] Received Razorpay order:", a);
        // console.log(razorpayid, razorpaysecret);
        // console.log(process.env.NEXT_PUBLIC_URL);

        var options = {
            "key": razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Test Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        // console.log(" [pay] Razorpay options:", options);

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const getData = async (params) => {
        let u = await fetchuser(username)
        if (!u || !u.username) {
            console.warn("[getData] Invalid user. Redirecting to home.");
            router.push('/');
            return;
        }
        // console.log(" [getData] User:", u);
        setCurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        // console.log(" [getData] Payments:", dbpayments);
    }
    //tpo scrol through supporters
    const [supporterPage, setsupporterPage] = useState(0)
    const supportersPerPage = 5
    const startInd = supporterPage * supportersPerPage
    const endInd = startInd + supportersPerPage
    const currentSupporters = payments.slice(startInd, endInd)
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='text-white w-full relative '>
                <img className=' object-fit aspect-[4/1] w-full max-h-[350px]' src={currentUser.coverpic} alt="" />
                <div className='absolute -bottom-20 border-2 border-white rounded-full right-[46%]'>
                    <img className='rounded-full' width={100} height={100} src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="username  flex-col gap-2 flex justify-center items-center my-24 ">
                <div className='font-bold text-lg'>
                    @{username}

                </div>
                <div className='text-slate-400'>
                    support {username} to get gud                </div>
                <div className='text-slate-400'>
                    {payments.length} Supporters . have helped {username} raise ₹{payments.reduce((acc, payment) => acc + payment.amount, 0) / 100}
                </div>
                <div className="payment flex flex-col sm:flex-row gap-3 sm:w-[80%] w-full mt-7">
                    <div className="supporters sm:w-1/2  w-full rounded-lg text-white bg-slate-900 p-10 overflow-y-auto max-h-50">
                        {/* show list of all supporters as a leaderboard */}
                        <h2 className='text-2xl font-bold my-5'>Supporters</h2>
                        <ul className='mx-5'>
                            {currentSupporters.length > 0 && currentSupporters.map((payment, index) => {
                                return <li key={payment._id || index} className='my-2 flex gap-2 items-center' >
                                    <img width={33} src="avatar.gif" alt="user avatar" />
                                    <span>
                                        {payment.name} donated <span className='font-bold'>₹{payment.amount / 100}Rs</span> with a message: "{payment.message}"
                                    </span>
                                </li>
                            })

                            }

                        </ul>
                        <div className="flex gap-5 rounded-lg">
                            <button onClick={() => setsupporterPage(prev => { return Math.max(0, prev - 1) })} disabled={supporterPage === 0} className='bg-purple-950 disabled:opacity-50 p-3 rounded-lg'>Prev</button>
                            <button onClick={() => setsupporterPage(prev => { return (endInd < payments.length ? prev + 1 : prev) })} disabled={endInd >= payments.length} className='bg-purple-950 disabled:opacity-50 p-3 rounded-lg'>Next</button>
                        </div>
                    </div>
                    <div className="makePayment w-full sm:w-1/2 rounded-lg text-white bg-slate-900 p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a payment</h2>
                        <div className='flex flex-col gap-2'>
                            <input onChange={handleChange} name='amount' type="text" placeholder="Amount" className='w-full p-3 rounded-lg bg-slate-800 text-white' />
                            {/* inputs for name and message */}
                            <input onChange={handleChange} name='name' value={paymentform.name} required type="text" placeholder="Name" className='w-full p-3 rounded-lg bg-slate-800 text-white' />
                            <input onChange={handleChange} name='message' value={paymentform.message} type="text" placeholder="Message" className='w-full p-3 rounded-lg bg-slate-800 text-white' />
                            <button onClick={() => {
                                if (!paymentform.amount || !paymentform.name) {
                                    alert("Please fill out the amount and name before proceeding.");
                                    return;
                                }
                                pay((paymentform.amount * 100),)
                            }} value={paymentform.amount} className='text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Pay</button>
                        </div>
                        {/* or choose from these amounts */}
                        <div className='flex gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => {
                                if (!paymentform.name) {
                                    alert("Please fill in your name before making a payment.");
                                    return;
                                }
                                pay(1000,)
                            }}>₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => {
                                if (!paymentform.name) {
                                    alert("Please fill in your name before making a payment.");
                                    return;
                                }
                                pay(2000,)
                            }}>₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => {
                                if (!paymentform.name) {
                                    alert("Please fill in your name before making a payment.");
                                    return;
                                }
                                pay(3000,)
                            }}>₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
