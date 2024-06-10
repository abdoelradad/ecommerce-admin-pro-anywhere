/* eslint-disable jsx-a11y/alt-text */
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  console.log(session?.user?.image);
  return (
    <Layout>
      <div className="flex md:flex-row flex-col items-center gap-3 p-5 transition-all duration-300 bg-white cursor-pointer rounded-xl w-full md:w-fit group hover:bg-white/90">
        <div className="p-1 rounded-full shadow-lg">
          {/* <img
            src={session?.user?.image}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          /> */}
          <Image
            src={session?.user?.image}
            width={50}
            height={50}
            alt=""
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-black">
            {session?.user?.name}
          </h2>
          <h2 className="text-sm font-semibold text-black">
            {session?.user?.email}
          </h2>
        </div>
      </div>
    </Layout>
  );
}
