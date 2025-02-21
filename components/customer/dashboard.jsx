import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Banknote,
  CreditCard,
  FileText,
  Gift,
  Landmark,
  List,
  Receipt,
  Wallet,
} from "lucide-react";
import Navbar from "./navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Main Content */}
      <div className="p-6 grid grid-cols-1 gap-6">
        <div className="w-full flex items-center justify-center">
          <Card className="h-[20rem] w-[40%] bg-gradient-to-br from-zinc-300 via-gray-300 to-slate-200 border-zinc-400 border-solid">
            <CardHeader>
              <CardTitle>Available Balance</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">$12,450.00</CardContent>
          </Card>
        </div>
        {/* Available Balance */}

        <div className="flex flex-row items-center justify-center">
          {/* Credit Card & Debit Card Status */}
          <Card>
            <CardHeader className="flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              <CardTitle>Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Credit Card: Active</p>
              <p>Debit Card: Active</p>
            </CardContent>
          </Card>

          {/* Cheque Status */}
          <Card>
            <CardHeader className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              <CardTitle>Cheque Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Last Cheque Issued: Cleared</p>
              <p>Pending: None</p>
            </CardContent>
          </Card>
        </div>

        {/* Fixed Deposits */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Landmark className="w-6 h-6" />
            <CardTitle>Fixed Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Active FDs: 2</p>
            <p>Total Value: Rs 20,000</p>
          </CardContent>
        </Card>

        {/* Loans */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Banknote className="w-6 h-6" />
            <CardTitle>Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Home Loan: $150,000</p>
            <p>Car Loan: $25,000</p>
          </CardContent>
        </Card>

        {/* Discounts & Offers */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Gift className="w-6 h-6" />
            <CardTitle>Offers & Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p>10% Cashback on Travel</p>
            <p>Exclusive Shopping Deals</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
