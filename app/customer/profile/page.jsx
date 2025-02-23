"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Calendar, Wallet, Banknote, MapPin } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (status === "authenticated" && session?.user?.username) {
        try {
          const response = await fetch(
            `/api/getUserData/${session?.user?.username}`
          );
          const result = await response.json();
          setUserData(result.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
  }, [session, status]);

  if (status === "loading" || !userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton className="w-96 h-40 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-md rounded-lg bg-white p-6">
        <CardHeader className="flex flex-col items-center">
          <User className="w-12 h-12 text-blue-500 mb-2" />
          <CardTitle className="text-xl font-semibold">
            {userData.Surname}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Age: {userData.Age}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">
              Location: {userData.Geography}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">
              Balance: ${userData.Balance.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Banknote className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">
              Credit Score: {userData.CreditScore}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
