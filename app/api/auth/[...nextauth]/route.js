import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDb'

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),

    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "github") {
               await connectDB()
                //check if user exist in database
                const currentUser = await User.findOne({ email: email })
                if (!currentUser) {
                    //create a new user
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                    await newUser.save()
                    user.name = newUser.username
                }
                return true;
            }
           
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            const dbUser = await User.findOne({email: session.user.email})
            //console.log(dbUser)
            session.user.name = dbUser.username
            return session
        }


    }
})

export { authoptions as GET, authoptions as POST }