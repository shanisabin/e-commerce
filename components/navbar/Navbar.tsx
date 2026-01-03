"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { token, logout, setToken } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access="))
      ?.split("=")[1];
    if (cookieToken) {
      setToken(cookieToken);
    }
  }, [setToken]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isMounted) return null;

  return (
    <nav className="navbar-section bg-[#161616] py-[8px] px-[60px] flex justify-between items-center sticky top-0 z-50">
      <div className="navbar-logo">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="Nike Logo"
            width={52}
            height={52}
            className="brightness-0 invert"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white text-sm text-[15px] hover:opacity-80 transition-opacity capitalize tracking-widest"
          >
            <div className="w-5 h-5 flex items-center justify-center ">
              <Image
                src="/assets/UserCircle.svg"
                alt="Nike Logo"
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </div>
            Log Out
          </button>
        ) : (
          pathname !== "/login" && (
            <Link
              href="/login"
              className="text-white px-8 py-2 text-[15px] font-semibold transition-colors capitalize text-xs tracking-widest"
            >
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
}



