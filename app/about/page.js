import React from 'react'

const About = () => {
    return (
        <div>
            <div className="min-h-screen  text-white px-6 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4 text-purple-400">About Us</h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Welcome to our crowdfunding platform! 🚀 We're on a mission to empower individuals to support one another, fund creative ideas, and make dreams a reality.
                    </p>

                    <div className="grid md:grid-cols-2 gap-10 mt-10 text-left">
                        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-semibold text-blue-300 mb-3">🤝 Community First</h2>
                            <p className="text-gray-400">
                                Our platform helps creators, learners, and dreamers get support directly from people who believe in them. Whether it's for passion projects or personal goals, every contribution counts.
                            </p>
                        </div>

                        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-semibold text-blue-300 mb-3">🔒 Secure Payments</h2>
                            <p className="text-gray-400">
                                We use trusted payment gateways like Razorpay to make sure your contributions are safe, seamless, and transparent.
                            </p>
                        </div>

                        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-semibold text-blue-300 mb-3">📈 Transparent Progress</h2>
                            <p className="text-gray-400">
                                Each campaign shows real-time supporter counts and funding progress, so you always know where your support is going.
                            </p>
                        </div>

                        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-semibold text-blue-300 mb-3">💡 Built with Love</h2>
                            <p className="text-gray-400">
                                Built using Next.js and Tailwind CSS, our platform is fast, responsive, and beautifully designed to give you a smooth experience.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16">
                        <p className="text-gray-400">Have questions or ideas? Reach out to us anytime — we're always here to help.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About
export const metadata = {
    title: 'About Us',
    description: ''
}
