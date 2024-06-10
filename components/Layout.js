import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <div className="flex flex-col items-center w-full gap-3 text-center">
          <p className=" text-black font-semibold max-w-[350px] mx-auto">
            This is an admin panel for e-commerce store, try to sign in if you
            have an access.
          </p>
          <button onClick={() => signIn("google")} className="btn bg-pink">
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-dark">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          <Nav />
        </div>

        <div className="flex-grow min-h-screen p-4 m-4 bg-darker rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
