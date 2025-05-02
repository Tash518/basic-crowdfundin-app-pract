import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[44vh]">
        <div className="font-bold text-3xl flex gap-2 justify-center items-center">
          Buy me a chai <span><img src="/tea.gif" width={70} alt="" /></span>
        </div>
        <p>
          A crowdfunding platform for creators. Get funded buy your fans and followers. Start now,
        </p>
        <div>
          <Link href={'/login'}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>
          <Link href={'/about'}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pt-32 pb-14">
        <h1 className="text-lg font-bold text-center mb-14">Your fans can buy you a chai</h1>
        <div className="flex gap-5 justify-around md:items-center md:justify-center md:flex-col md:gap-8 ">

          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className=" bg-slate-400 rounded-full p-2" width={88} src="/man.gif" alt="" />
            <p className="font-bold">Fans want to collaborate</p>
            <p className="">Your fans are ready to collaborate with you </p>
          </div>

          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className=" bg-slate-400 rounded-full p-2" width={88} src="/coin.gif" alt="" />
            <p className="font-bold">Fans want to collaborate</p>
            <p className="">Your fans are ready to collaborate with you </p>
          </div>

          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className=" bg-slate-400 rounded-full p-2" width={88} src="/group.gif" alt="" />
            <p className="font-bold">Fans want to collaborate</p>
            <p className="">Your fans are ready to collaborate with you </p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pt-32 pb-14 flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold text-center mb-14">Learn more about us</h1>

      </div>
    </>
  );
}
