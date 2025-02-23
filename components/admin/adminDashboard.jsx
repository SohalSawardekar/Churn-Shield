"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "../loadingScreen";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";

const AdminDashboard = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/getUserData");
        const data = await res.json();
        console.log("Fetched data:", data);

        if (data.success) {
          setCustomers(data.data);
          console.log(customers);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-6">
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Customer ID</th>
              <th className="border px-4 py-2">Surname</th>
              <th className="border px-4 py-2">Credit Score</th>
              <th className="border px-4 py-2">Country</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Balance</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.CustomerId} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{customer.CustomerId}</td>
                <td className="border px-4 py-2">{customer.Surname}</td>
                <td className="border px-4 py-2">{customer.CreditScore}</td>
                <td className="border px-4 py-2">{customer.Geography}</td>
                <td className="border px-4 py-2">{customer.Gender}</td>
                <td className="border px-4 py-2">${customer.Balance}</td>
                <td className="border px-4 py-2">
                  <Link href={`/customer/${customer.CustomerId}`}>
                    <Button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
