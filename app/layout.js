import React from "react";

export const metadata = {
  title: "Churn Shield",
  description: "",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Rootlayout;
