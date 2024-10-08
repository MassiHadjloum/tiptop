"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ user }: SiderbarProps) => {
  console.log(user);
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="The tip top logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">TheTipTop </h1>
        </Link>

        {sidebarLinks?.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
              href={item.route}
              key={item.label}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  fill
                  alt={item.label}
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p className={cn('sidebar-label text-sm',  {
                '!text-white': isActive
              })}>
                 {item.label}
              </p>
             
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Sidebar;
