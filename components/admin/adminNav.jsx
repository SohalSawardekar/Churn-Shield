import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const adminNav = () => {
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Button
        onClick={() => {
          signOut({ callbackUrl: "/login" });
        }}
      >
        Sign out
      </Button>
    </div>
  );
};

export default adminNav;
