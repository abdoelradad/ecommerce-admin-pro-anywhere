import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import links from "../pages/data";
import { FaShoppingCart } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { BiLogOutCircle } from "react-icons/bi";
export default function Nav({ show }) {
  const router = useRouter();
  const pathname = usePathname();
  const editOneItemId = pathname.slice(15, 40);

  async function logout() {
    await router.push("/");
    await signOut();
  }
  return (
    <aside className="flex flex-col items-center">
      {/* logo */}
      <a className="link">
        <div className="w-[40px] h-[40px] bg-pink/30 rounded-full flex items-center justify-center">
          <FaShoppingCart className="text-xl text-pink " />
        </div>
      </a>
      <nav className="flex flex-row md:flex-col gap-y-5">
        {links?.map((link, index) => {
          return (
            <Link
              href={link.path}
              key={index}
              className={`${
                (pathname === link.path ||
                  pathname === link?.pathTwo ||
                  pathname === link?.pathThree + editOneItemId) &&
                "bg-darker text-pink font-semibold"
              } link`}
            >
              <div className="flex items-center gap-2 justify-center text-base font-large">
                <span className="mt-[2px] text-xl">
                  {link.path === pathname || pathname === link?.pathTwo
                    ? link.activeIcon
                    : link.icon}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
        <button
          onClick={logout}
          className="link mt-5"
        >
          <BiLogOutCircle />

        </button>
    </aside>
  );
}
