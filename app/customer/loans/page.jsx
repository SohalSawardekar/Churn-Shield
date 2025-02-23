import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoanPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Loan Details</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No loan details available.</p>
        </CardContent>
      </Card>
    </div>
  );
}
