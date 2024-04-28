import mongoose from "~/mongoose.server";
import { OrderInterface } from "~/types";

const OrderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  beneficiaryNumber: { type: String, required: true },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "packages",
  },
  bundle: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "bundles",
  },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

let Order: mongoose.Model<OrderInterface>;

try {
  Order = mongoose.model<OrderInterface>("orders");
} catch {
  Order = mongoose.model<OrderInterface>("orders", OrderSchema);
}

export { Order };
