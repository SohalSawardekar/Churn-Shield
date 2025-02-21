"use client";

import LoadingScreen from "@/components/loadingScreen";
import LoginPage from "@/components/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  });
};

export default page;
