"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../loadingScreen";
import AdminNav from "./adminNav";
import { Button } from "../ui/button";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";

const AdminDashboard = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/getUserData");
        const data = await res.json();

        if (data.success) {
          setCustomers(data.data);
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

  // 🔍 Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.CustomerId.toString().includes(searchQuery)
  );

  // 📌 Define columns for DataTable
  const columns = [
    {
      accessorKey: "CustomerId",
      header: "Customer ID",
      cell: ({ row }) => <div>{row.getValue("CustomerId")}</div>,
    },
    {
      accessorKey: "Surname",
      header: "Surname",
      cell: ({ row }) => <div>{row.getValue("Surname")}</div>,
    },
    {
      accessorKey: "CreditScore",
      header: "Credit Score",
      cell: ({ row }) => <div>{row.getValue("CreditScore")}</div>,
    },
    {
      accessorKey: "Geography",
      header: "Country",
      cell: ({ row }) => <div>{row.getValue("Geography")}</div>,
    },
    {
      accessorKey: "Gender",
      header: "Gender",
      cell: ({ row }) => <div>{row.getValue("Gender")}</div>,
    },
    {
      accessorKey: "Balance",
      header: "Balance",
      cell: ({ row }) => <div>Rs {row.getValue("Balance")}</div>,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Link href={`/admin/churn/${row.getValue("CustomerId")}`}>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="p-6">
      <AdminNav />
      <div className="p-5" />

      {/* 🔍 Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Customer ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <DataTable columns={columns} data={filteredCustomers} pageSize={10} />
      )}
    </div>
  );
};

export default AdminDashboard;
