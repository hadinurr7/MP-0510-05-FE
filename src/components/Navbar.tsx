"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const { data } = useSession();
  const user = data?.user;

  const logout = () => {
    signOut();
  };
  return (
    <nav className="bg-gray-900 px-6 py-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold">
          TicketerHH
        </a>
        <div className="flex items-center space-x-4">
          
          {!user?.id ? (
            <Link href="/login">
              <Button className="rounded-full bg-blue-500 px-6 py-2 text-white shadow-md transition-all hover:bg-blue-600">
                Sign in
              </Button>
            </Link>
          ) : (
            <>
              {user?.role === "CUSTOMER" ? (
                <Link
                  href="/profile/transaction-history"
                  className="transition-colors hover:text-purple-600"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-purple-600"
                >
                  Dashboard
                </Link>
              )}
              <p
                onClick={logout}
                className="cursor-pointer text-red-600 transition-colors hover:text-red-800"
              >
                Logout
              </p>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
