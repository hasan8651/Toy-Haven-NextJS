"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";
  const pathname = usePathname() || "/";

  // for NavLink "active" style
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  const navClass = (href) =>
    isActive(href) ? "bg-white text-blue-500" : "text-white";

  const links = (
    <>
      <li>
        <Link href="/" className={navClass("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/toys" className={navClass("/toys")}>
          All Toys
        </Link>
      </li>
      {user?.email && (
        <>
          <li>
            <Link href="/add-toys" className={navClass("/add-toys")}>
              Add Toys
            </Link>
          </li>
          <li>
            <Link href="/manage-toys" className={navClass("/manage-toys")}>
              Manage Toys
            </Link>
          </li>
        </>
      )}
      <li>
        <Link href="/about-us" className={navClass("/about-us")}>
          About Us
        </Link>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-blue-500 text-white shadow-md ">
      <div className="navbar">
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-500 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
         <Link href="/" className="flex flex-nowrap items-center gap-2 px-3 md:px-0  shrink-0">
        <Image width={50} height={50} src="/logo.png" alt="logo" className="w-14 h-14" unoptimized />
        <span className="whitespace-nowrap leading-none text-2xl md:text-3xl font-bold text-white tracking-tight">
          Toy Haven
          </span>
          </Link>
        </div>

        {/* Desktop navbar */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl text-white">{links}</ul>
        </div>

        {/* Right side */}
        <div className="navbar-end space-x-4 gap-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner text-white loading-md"></span>
            </div>
          ) : user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div
                  title={user?.name || user?.email}
                  className="w-10 rounded-full border-2 border-white"
                >
                  <Image width={50} height={50}
                    className="rounded-full"
                    src={
                      user?.image ||
                      "https://img.icons8.com/windows/32/user.png"
                    }
                    alt="user photo" unoptimized
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow dropdown-content bg-blue-500 text-white rounded-box w-52"
              >
                <li className="flex justify-center items-center pb-2">
                  <Image width={50} height={50}
                    src={
                      user?.image ||
                      "https://img.icons8.com/windows/64/user.png"
                    }
                    alt="user photo"
                    className="rounded-full border" unoptimized
                  />
                </li>
                <li className="text-center font-semibold border-b border-gray-200 pb-2">
                  {user?.name || ""}
                </li>
                <li className="text-center text-sm text-white pb-2">
                  {user?.email}
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn btn-sm bg-white text-blue-500 hover:bg-blue-600 hover:text-white w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className=" lg:flex gap-5 items-center">
              <Link
                href="/login"
                className="btn bg-white text-blue-500 font-semibold hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hidden md:flex btn bg-white text-blue-500 font-semibold hover:bg-blue-50"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
