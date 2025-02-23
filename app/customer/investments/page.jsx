import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function InvestmentPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Investment Portfolio</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investment Type</TableHead>
                <TableHead>Amount (Rs)</TableHead>
                <TableHead>Returns (%)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mutual Funds</TableCell>
                <TableCell>50,000</TableCell>
                <TableCell>12%</TableCell>
                <TableCell>
                  <Button variant="outline">View</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stocks</TableCell>
                <TableCell>75,000</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>
                  <Button variant="outline">View</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fixed Deposit</TableCell>
                <TableCell>1,00,000</TableCell>
                <TableCell>7%</TableCell>
                <TableCell>
                  <Button variant="outline">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
