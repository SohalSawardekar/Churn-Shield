import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    CustomerId: Number,
    Surname: String,
    CreditScore: Number,
    Geography: String,
    Gender: String,
    Age: Number,
    Tenure: Number,
    Balance: Number,
    NumOfProducts: Number,
    HasCrCard: Number,
    IsActiveMember: Number,
    EstimatedSalary: Number,
  },
  { collection: "customers" } // ✅ Ensure it uses the correct collection name
);

// ✅ Prevent OverwriteModelError by reusing existing model
const Customer =
  mongoose.models.customers || mongoose.model("customers", customerSchema);

export default Customer;
