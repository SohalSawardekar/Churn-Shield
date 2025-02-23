import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfferPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Bank Offers</h1>

      <Card>
        <CardHeader>
          <CardTitle>Exclusive Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Currently, there are no available offers. Please check back later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
