import mongoose from "~/mongoose.server";

import { PackageInterface } from "~/types";

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bannerImage: { type: String, required: true },
  description: { type: String, required: true },
  bundles: { type: mongoose.Schema.Types.ObjectId, ref: "bundles" },
  createdAt: { type: Date, default: Date.now },
});

let Package: mongoose.Model<PackageInterface>;

try {
  Package = mongoose.model<PackageInterface>("packages");
} catch {
  Package = mongoose.model<PackageInterface>("packages", PackageSchema);
}

export { Package };
