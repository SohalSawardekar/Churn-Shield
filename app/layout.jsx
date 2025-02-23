import "@/styles/globals.css";
import React from "react";
import Provider from "@/components/provider";

export const metadata = {
  title: "Churn Shield",
  description: "",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
