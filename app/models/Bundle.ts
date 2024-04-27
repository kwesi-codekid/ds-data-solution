import mongoose from "~/mongoose.server";

import { BundleInterface } from "~/types";

const BundleSchema = new mongoose.Schema({
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "packages",
    required: true,
  },
  volume: { type: Number, required: true },
  price: { type: Number, required: true },
});

let Bundle: mongoose.Model<BundleInterface>;

try {
  Bundle = mongoose.model<BundleInterface>("bundles");
} catch {
  Bundle = mongoose.model<BundleInterface>("bundles", BundleSchema);
}

export { Bundle };
