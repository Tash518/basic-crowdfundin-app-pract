"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchuser, updateUser } from '@/actions/useractions'

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setForm] = useState({})

    useEffect(() => {
        if (!session) {
            router.push('/login')
        } else {

            getData()
        }

    }, [router, session])
    const getData = async () => {
        // console.log(" [Dashboard] session.user:", session.user);
        let user = await fetchuser(session.user.name)
        // console.log(" [Dashboard] user:", user);
        setForm(user)
        // console.log("user keys",Object.keys(user));
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (data) => {
        update()

        // console.log(" [Dashboard] data:", Object.fromEntries(data));
        let a = await updateUser(Object.fromEntries(data), session.user.name)
        if (a) {
            alert("Profile updated")
        }else{
            alert("Error updating profile")
        }
    }

    return (
        <div className='container mx-auto py-5 px-6'>
            <h1 className="text-center my-5 text-3xl font-bold">Welcome to your Dashboard</h1>
            <form action={handleSubmit} className="mx-auto max-w-2xl text-black">
                <div className="my-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name="name" id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input for email */}
                <div className="my-2">
                    <label htmlFor="email" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name="email" id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input for username */}
                <div className="my-2">
                    <label htmlFor="username" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name="username" id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input for profile picture of input type text */}
                <div className="my-2">
                    <label htmlFor="profilepic" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                    <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name="profilepic" id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input for cover pic  */}
                <div className="my-2">
                    <label htmlFor="coverpic" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                    <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name="coverpic" id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input razorpay id */}
                <div className="my-2">
                    <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
                    <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input razorpay secret */}
                <div className="my-2">
                    <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                    <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="password" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                {/* Submit Button  */}
                <div className="my-6">
                    <button type="submit" className="block w-full p-2 mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
                </div>

            </form>
        </div >
    )
}

export default Dashboard
