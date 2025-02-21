"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-around p-4 bg-white shadow-md">
        <div className="text-xl font-bold text-slate-600 hover:cursor-default">ChurnShield</div>
        <div className="flex gap-6">
          <Link href="/customer" passHref>
            <Button variant="ghost">Accounts</Button>
          </Link>
          <Link href="/customer/transactions" passHref>
            <Button variant="ghost">Transactions</Button>
          </Link>
          <Link href="/customer/investments" passHref>
            <Button variant="ghost">Investments</Button>
          </Link>
          <Link href="/customer/loans" passHref>
            <Button variant="ghost">Loans</Button>
          </Link>
          <Link href="/customer/offers" passHref>
            <Button variant="ghost">Offers</Button>
          </Link>
          
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
};

export default Navbar;
