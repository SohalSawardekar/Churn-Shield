"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ChurnResult = ({ params: paramsPromise }) => {
  const params = use(paramsPromise); // Unwrap params before using them
  const [willLeave, setWillLeave] = useState(null);
  const [probability, setProbability] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerAndPredict = async () => {
      try {
        const _id = params.id;
        // Fetch customer data from MongoDB
        const customerResponse = await fetch(`/api/getUserData/${_id}`);
        if (!customerResponse.ok) {
          throw new Error("Failed to fetch customer data");
        }

        const customerData = await customerResponse.json();
        setCustomer(customerData);

        const requestData = {
          CreditScore: customerData.data?.CreditScore,
          Geography: customerData.data?.Geography,
          Gender: customerData.data?.Gender,
          Age: customerData.data?.Age,
          Tenure: customerData.data?.Tenure,
          Balance: customerData.data?.Balance,
          NumOfProducts: customerData.data?.NumOfProducts,
          HasCrCard: customerData.data?.HasCrCard,
          IsActiveMember: customerData.data?.IsActiveMember,
          EstimatedSalary: customerData.data?.EstimatedSalary,
        };

        // Send data to prediction API
        const response = await fetch(
          "https://itsprotesilaus-internspirit-hackathon.hf.space/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        const data = await response.json();
        if (data && data.length > 0 && data[0].length === 2) {
          const prob = data[0][0][0]; // Extract probability
          const leave = Boolean(data[0][1][0]); // Convert 0 or 1 to boolean

          console.log("Leave:", leave); // Debugging output

          setProbability(prob);
          setWillLeave(leave); // Fix: Correctly setting state
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
    };

    fetchCustomerAndPredict();
  }, [params.id]); // Dependency on params.id

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold">Customer Churn Prediction</h1>

      {error && <p className="text-red-500 text-lg font-semibold">{error}</p>}

      {/* Customer Details Card */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {customer ? (
            <>
              <p>
                <strong>Name:</strong> {customer.data?.Surname}
              </p>
              <p>
                <strong>Age:</strong> {customer.data?.Age}
              </p>
              <p>
                <strong>Gender:</strong> {customer.data?.Gender}
              </p>
              <p>
                <strong>Geography:</strong> {customer.data?.Geography}
              </p>
              <p>
                <strong>Credit Score:</strong> {customer.data?.CreditScore}
              </p>
              <p>
                <strong>Balance:</strong> ${customer.data?.Balance}
              </p>
              <p>
                <strong>Estimated Salary:</strong> $
                {customer.data?.EstimatedSalary}
              </p>
              <p>
                <strong>Active Member:</strong>{" "}
                <span
                  className={
                    customer.data?.IsActiveMember
                      ? "text-green-500 font-bold"
                      : "text-red-500 font-bold"
                  }
                >
                  {customer.data?.IsActiveMember ? "True" : "False"}
                </span>
              </p>
            </>
          ) : (
            <Skeleton className="h-6 w-full" />
          )}
        </CardContent>
      </Card>

      {/* Prediction Result Card */}
      <Card
        className={`w-full max-w-md ${
          willLeave === null
            ? "bg-gray-200"
            : willLeave
            ? "bg-red-500 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        <CardHeader>
          <CardTitle>Prediction Result</CardTitle>
        </CardHeader>
        <CardContent className="text-lg font-semibold">
          {willLeave === null ? (
            <Skeleton className="h-6 w-full" />
          ) : (
            <>
              <p>
                {customer?.data?.Surname || "Customer"} will{" "}
                <strong>{willLeave ? "Leave" : "Stay"}</strong> with the Bank
              </p>
              <p>Probability: {((1 - probability) * 100).toFixed(2)}%</p>
            </>
          )}
        </CardContent>
      </Card>

      <Link href="/admin">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
};

export default ChurnResult;
