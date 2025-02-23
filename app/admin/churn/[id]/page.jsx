"use client";

import { useEffect, useState } from "react";

const ChurnResult = ({ params }) => {
  const [id, setId] = useState("");
  const [willLeave, setWillLeave] = useState(false);

  useEffect(async () => {
    const _id = (await params).id;
    setId(_id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Churn Prediction</h1>
      <div
        className={`p-6 text-white text-lg font-semibold rounded-lg ${
          willLeave ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {customerName} will {willLeave ? "Leave" : "Stay"} with the Bank
      </div>
    </div>
  );
};

export default ChurnResult;
