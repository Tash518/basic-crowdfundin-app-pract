"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"
import { notFound } from "next/navigation"
export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    //fetching secret and key from db
    let user = await User.findOne({ username: to_username })
    const razorpaysecret = user.razorpaysecret
    const razorpayid = user.razorpayid
    var instance = new Razorpay({ key_id: razorpayid, key_secret: razorpaysecret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",

    }
    //To create a Razorpay order
    //To save a pending payment record in MongoDB database for tracking
    let x = await instance.orders.create(options)
    // console.log(" [initiate] Razorpay order created:", x);

    //creating a pending payment object
    await Payment.create({
        oid: x.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    }
    )
    return x;
}
export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    // Check if user exists
    if (!u) {
         // If user not found, return a 404 page
        return null; // Return null if no user is found
    }
    let user = u.toObject({ flattenObjectIds: true })// Mongoose document into a plain JS object for serialization.
    //flattenObjectIds: true ensures that MongoDB ObjectIds are converted to strings.
    return user
}

export const fetchpayments = async (username) => {
    //all payements reverse sorted by amount 
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 })//.lean()//// .lean() returns plain JS objects instead of Mongoose docs didnt use because the objects wasnt flattened
    // console.log(" [fetchpayments] Payments:", p);
    return p.map(item => item.toObject({ flattenObjectIds: true })) //flattenObjectIds: true ensures that MongoDB ObjectIds are converted to strings worked better than lean idk why
}
export const updateUser = async (data, oldusername) => {
    await connectDB()
    //if username is bein updated check if username is avaulable
    // let nData = Object.fromEntries(data)
    // console.log(" [updateUser] nData:", data);
    if (oldusername !== data.username) {
        let existingUser = await User.findOne({ username: data.username })
        if (existingUser) {
            return { error: "Username already taken" }
        }

        let result = await User.updateOne({ email: data.email }, data)
        // update payments table for the current user 
        await Payment.updateMany({ to_user: oldusername }, { to_user: data.username })
        return { success: true, result: result }
    }
    else{
        let result = await User.updateOne({ email: data.email }, data)
        return { success: true, result: result }
        
    }
}
