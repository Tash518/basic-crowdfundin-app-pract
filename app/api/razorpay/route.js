import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)
    // console.log("Received Razorpay body:", body)
    // console.log("KEY_SECRET from env:", process.env.KEY_SECRET)

    //check if razorpayorderid is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "order id not found" })
    }
    //fetch secret from db
    let user = await User.findOne({ username: p.to_user })
    const razorpaysecret  = user.razorpaysecret
    const razorpayid = user.razorpayid
    //verify the payment
    let xx = await validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, razorpaysecret)
    if (xx) {
        //update payment object to success
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })
       // console.log(updatedPayment)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else {
        return NextResponse.json({ success: false, message: "Payment verification failed" })
    }
}   
