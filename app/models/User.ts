import mongoose from "~/mongoose.server";
import { UserInterface } from "~/types";

const UserSchema = new mongoose.Schema<UserInterface>(
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
    phoneNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let User: mongoose.Model<UserInterface>;

try {
  User = mongoose.model<UserInterface>("users");
} catch {
  User = mongoose.model<UserInterface>("users", UserSchema);
}

export { User };
