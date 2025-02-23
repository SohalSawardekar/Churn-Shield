"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, CreditCard, FileText, Gift, Landmark } from "lucide-react";
import Navbar from "./navbar";
import LoadingScreen from "../loadingScreen";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (status === "authenticated" && session?.user?.username) {
        try {
          const response = await fetch(
            `/api/getUserData/${session?.user?.username}`
          );
          const result = await response.json();
          setData(result.data);
          setIsloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
  }, [session, status]);

  if (status === "loading" || !data) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className=" flex flex-col max-w-[100%]  items-center">
          <div className="p-6 flex flex-col w-[60%] gap-6">
            {/* Available Balance */}
            <div className="w-full flex items-center justify-center">
              <Card className="h-[20rem] w-[100%] flex flex-col items-center justify-center bg-gradient-to-br from-zinc-300 via-gray-300 to-slate-200 border-zinc-400 border-solid">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-slate-600">
                    Available Balance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                  Rs {data.Balance}
                </CardContent>
              </Card>
            </div>

            {/* Two-column Layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Cards Section */}
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  <CardTitle>Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Credit Card: {data.HasCrCard}</p>
                  <p>Debit Card: {data.HasCrCard}</p>
                </CardContent>
              </Card>

              {/* Cheque Status */}
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  <CardTitle>Cheque Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Last Cheque Issued: N/A</p>
                  <p>Pending: N/A</p>
                </CardContent>
              </Card>

              {/* Fixed Deposits */}
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <Landmark className="w-6 h-6" />
                  <CardTitle>Fixed Deposits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Active FDs: 3</p>
                  <p>Total Value: Rs 530000</p>
                </CardContent>
              </Card>

              {/* Loans */}
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <Banknote className="w-6 h-6" />
                  <CardTitle>Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Home Loan: N/A</p>
                  <p>Car Loan: N/A</p>
                </CardContent>
              </Card>

              {/* Discounts & Offers */}
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <Gift className="w-6 h-6" />
                  <CardTitle>Offers & Discounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.offers?.[0]}</p>
                  <p>{data.offers?.[1]}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
