import mongoose from "~/mongoose.server";
import { AdminInterface } from "~/types";

const AdminSchema = new mongoose.Schema<AdminInterface>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Admin: mongoose.Model<AdminInterface>;

try {
  Admin = mongoose.model<AdminInterface>("Admin");
} catch {
  Admin = mongoose.model<AdminInterface>("Admin", AdminSchema);
}

export { Admin };
